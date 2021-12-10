<script lang="ts">
  import { push } from "svelte-spa-router";
  import type { Node } from "../anilist";
  import type { Waifu } from "../api";
  import { Inventory } from "../api";
  import Compare from "../component/Compare.svelte";
  import CompareUser from "../component/CompareUser.svelte";
  import FilterChar from "../component/FilterChar.svelte";
  import FilterMedia from "../component/FilterMedia.svelte";
  import Missing from "../component/Missing.svelte";
  import Profile from "../component/Profile.svelte";
  import { DateAsc, DateDesc, IDAsc, IDDesc } from "../sort";

  export let params: { user: string };

  $: filters = [(_: Waifu) => true, (_: Waifu) => true];
  $: filter_all = (w: Waifu) => {
    return filters.map((f) => f(w)).every((v) => v != false);
  };

  let media_chars: Node[];
  let compare_chars: Waifu[] = [];

  $: dropDown = window.innerWidth > 768;
  let show_all = false;
  $: cut = (w: Waifu[]): Waifu[] => (show_all ? w : w.splice(0, 200));

  let sorters: {
    id: number;
    text: string;
    fn: (a: Waifu, b: Waifu) => number;
  }[] = [
    { id: 0, text: "DATE", fn: DateAsc },
    { id: 1, text: "DATE DESC", fn: DateDesc },
    { id: 2, text: "ID", fn: IDAsc },
    { id: 3, text: "ID DESC", fn: IDDesc },
  ];
  let sorter: (a: Waifu, b: Waifu) => number;
  let sortSelected = 0;
  $: sorter = sorters[sortSelected].fn;
</script>

<svelte:head>
  <meta property="og:type" content="WaifuGUI" />
  <meta
    property="og:url"
    content={"https://waifugui.kar.moe/#/list/" + params.user}
  />
  <meta
    property="og:title"
    content={`WaifuGUI | Check out ${params.user}'s list`}
  />
  <meta
    property="og:description"
    content={`View ${params.user}'s list online`}
  />
  <meta property="og:image" content="https://waifugui.kar.moe/favicon.png" />
</svelte:head>

<main class="bg-neutral-800 max-h-full h-full min-h-screen text-orange-50">
  {#await $Inventory.pullInventory(params.user) then i}
    <!-- nav -->
    <div
      class="bg-orange-300 text-black py-2 flex flex-row flex-grow content-center fixed w-full z-10 shadow-sm shadow-neutral-900"
    >
      <a class="block w-12 justify-center content-center mx-3" href="/">
        <img src="/favicon.png" alt="icon" class="w-10 p-1 rounded-full" />
      </a>
      {#if dropDown}
        <div class="grid grid-flow-col gap-3 justify-center w-full">
          <FilterChar bind:filter={filters[0]} />
          <FilterMedia bind:filter={filters[1]} bind:media_chars />
          <CompareUser bind:CompareChars={compare_chars} />
          <select
            name="filtering"
            bind:value={sortSelected}
            class=" justify-center bg-inherit rounded-xl border-2 border-zinc-600 overflow-hidden block text-black focus:outline-none focus:ring-0 flex-grow p-2"
          >
            {#each sorters as s}
              <option
                value={s.id}
                class="bg-orange-300 text-black focus:bg-orange-500 focus:outline-none rounded-md"
                >{s.text}</option
              >
            {/each}
          </select>
        </div>
        <input
          type="button"
          class="p-2 mx-3 rounded-md border-2 border-gray-700 hover:border-orange-500 focus:border-orange-500 text-black"
          on:click={() => (show_all = !show_all)}
          value={show_all ? "Show Less" : "Show All"}
        />
      {/if}
    </div>

    <!-- body -->
    <div class="pt-20 justify-center items-center">
      <!-- profile -->
      <div class="block mx-auto max-w-lg" id="profile">
        <Profile />
      </div>
      <!-- characters -->
      <div
        class="mx-auto flex flex-col justify-center items-center pb-12 w-full max-w-7xl"
      >
        <h3 class="text-3xl text-center py-7 text-orange-200">
          Acquired characters
        </h3>
        <div
          class="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-center"
        >
          {#each cut(i.filter((w) => filter_all(w)).sort(sorter)) as w}
            <div
              class="shadow-zinc-900 shadow-md w-full bg-zinc-900 rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center"
            >
              <div class="flex-auto">
                <Compare compare={compare_chars.some((x) => x.id === w.id)}>
                  <img
                    src={w.image}
                    alt={w.name}
                    class="object-top object-cover w-full"
                  />
                </Compare>
              </div>
              <div class="text-center py-8 sm:py-6 px-3">
                <a
                  href={"https://anilist.co/character/" + w.id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p class="text-xl text-gray-200 font-bold mb-2">{w.name}</p>
                </a>
                <p class="text-base text-gray-400 font-normal">{w.id}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
      <Missing missing={media_chars} bind:CompareChars={compare_chars} />
    </div>
  {:catch e}
    {alert(e)}
    {push("/")}
  {/await}
</main>
