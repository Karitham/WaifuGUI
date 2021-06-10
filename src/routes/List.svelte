<script lang="ts">
  import type { Node } from "../anilist";
  import type { Waifu } from "../api";
  import { Inventory } from "../api";
  import Compare from "../component/Compare.svelte";
  import CompareUser from "../component/CompareUser.svelte";
  import DropDown from "../component/DropDown.svelte";
  import FilterChar from "../component/FilterChar.svelte";
  import FilterMedia from "../component/FilterMedia.svelte";
  import Missing from "../component/Missing.svelte";
  import Profile from "../component/Profile.svelte";

  export let params: { user: string };

  $: filters = [(_: Waifu) => true, (_: Waifu) => true];
  $: filter_all = (w: Waifu) => {
    return filters.map((f) => f(w)).every((v) => v != false);
  };

  let media_chars: Node[];
  let compare_chars: Waifu[] = [];

  let dropDown = false;
  $: dropDown;
  let show_all = false;
  $: cut = (w: Waifu[]): Waifu[] => (show_all ? w : w.splice(0, 200));
</script>

<svelte:head>
  <meta property="og:type" content="WaifuGUI" />
  <meta
    property="og:url"
    content="{'https://waifugui.kar.moe/#/list/' + params.user}" />
  <meta
    property="og:title"
    content="{`WaifuGUI | Check out ${params.user}'s list`}" />
  <meta
    property="og:description"
    content="{`View ${params.user}'s list online`}" />
  <meta property="og:image" content="https://waifugui.kar.moe/favicon.png" />
</svelte:head>

<main>
  {#await $Inventory.pullInventory(params.user) then i}
    <div class="nav-container small">
      <div class="nav" id="nav">
        <a class="back-btn" href="/">
          <img src="/favicon.png" alt="icon" />
        </a>
        <button class="btn" on:click="{() => (dropDown = !dropDown)}">v</button>
        <DropDown showDropDown="{dropDown}">
          <div class="search-prop-small">
            <FilterChar bind:filter="{filters[0]}" />
          </div>
          <div class="search-prop-small">
            <CompareUser bind:CompareChars="{compare_chars}" />
          </div>
          <div class="search-prop-small">
            <FilterMedia bind:filter="{filters[1]}" bind:media_chars />
          </div>
        </DropDown>
      </div>
    </div>
    <div class="nav-container big">
      <div class="nav" id="nav">
        <a class="back-btn" href="/"><img src="/favicon.png" alt="icon" /></a>
        <div class="search-prop">
          <FilterChar bind:filter="{filters[0]}" />
        </div>
        <div class="search-prop">
          <CompareUser bind:CompareChars="{compare_chars}" />
        </div>
        <div class="search-prop">
          <FilterMedia bind:filter="{filters[1]}" bind:media_chars />
        </div>
      </div>
    </div>
    <div class="container-wrapper">
      <div class="container">
        <div class="first-row">
          <div class="show-all">
            <button
              class="btn show-all-btn"
              on:click="{() => (show_all = !show_all)}">
              Show all
            </button>
          </div>
        </div>
        <div class="left" id="profile">
          <Profile />
        </div>
        {#each cut(i.filter((w) => filter_all(w))) as w}
          <div class="waifu-card">
            <a
              href="{'https://anilist.co/character/' + w.id}"
              title="view on anilist">
              <h4>
                {w.name}
              </h4>
            </a>
            <p>{w.id}</p>
            {#if compare_chars !== undefined}
              <Compare compare="{compare_chars.some((x) => x.id === w.id)}">
                <img src="{w.image}" alt="{w.name}" />
              </Compare>
            {:else}
              <img src="{w.image}" alt="{w.name}" />
            {/if}
          </div>
        {/each}
        <Missing missing="{media_chars}" bind:CompareChars="{compare_chars}" />
        <h4 class="search-more">Search to list more...</h4>
      </div>
    </div>
  {/await}
</main>

<style>
  .container-wrapper {
    padding-top: 3.5rem;
  }

  main {
    color: #eee;
  }

  #profile {
    grid-column: -3 / -1;
    grid-row: 2 / span 3;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #nav {
    z-index: 10;
  }

  h4,
  p {
    margin: 0.5rem;
  }

  a {
    color: #eee;
    width: fit-content;
  }

  .search-prop-small {
    padding: 0.5rem 0;
    padding-bottom: 1rem;
  }

  .search-more {
    padding: 1.5rem;
    text-align: center;
    grid-column: 1 / -1;
  }

  .nav-container {
    top: 0;
    z-index: 10;
    width: 100%;
    opacity: 98%;
    height: auto;
    background-color: hsl(0, 0%, 19%);
    position: fixed;
  }

  .nav {
    padding: 0 0.5rem;
    display: grid;
    grid-template-columns: 0.1fr 1fr 0.7fr 1fr;
    justify-content: center;
    text-align: center;
    align-items: center;
    gap: 0.7rem;
  }

  .btn {
    border: none;
    background-color: #e4634d;
    color: #eee;
    padding: 0.5rem;
  }

  .nav > button {
    padding: 0;
    height: 1.5rem;
    width: 1.5rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .first-row {
    grid-column: 1 / -1;
    background-color: hsl(0, 0%, 20%);
    padding: 0.7rem;
    display: grid;
    justify-content: end;
    border-radius: 5px;
  }

  .container {
    margin: auto;
    padding: 1rem;
    max-width: 70rem;
    display: grid;
    grid-auto-flow: dense;
    grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
    gap: 1rem;
  }

  .waifu-card {
    background-color: hsl(0, 0%, 16%);

    text-align: center;
    border-radius: 3px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
  }

  img {
    width: 100px;
    height: 150px;
    object-fit: cover;
  }

  a > img {
    height: 2.5rem;
    width: 2.5rem;
    object-fit: cover;
    border-radius: 100%;
    padding: 0.5rem;
  }

  a {
    display: flex;
    justify-content: center;
  }

  .big {
    display: block;
  }
  .small {
    display: none;
  }

  @media screen and (max-width: 1150px) {
    .nav {
      grid-template-columns: 1fr;
      gap: 0;
      grid-template-rows: auto auto auto auto;
    }

    .big {
      display: none;
    }

    .small {
      display: block;
    }
  }
</style>
