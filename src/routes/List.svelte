<script lang="ts">
  import type { Node } from "../anilist";
  import { push } from "svelte-spa-router";
  import { Inventory, User } from "../api";
  import type { Waifu } from "../api";
  import FilterChar from "../component/FilterChar.svelte";
  import FilterMedia from "../component/FilterMedia.svelte";
  import Profile from "../component/Profile.svelte";
  import Missing from "../component/Missing.svelte";
  import Compare from "../component/Compare.svelte";
  import CompareUser from "../component/CompareUser.svelte";

  export let params: { user: string };

  $: filters = [(_: Waifu) => true, (_: Waifu) => true];
  $: filter_all = (w: Waifu) => {
    return filters.map((f) => f(w)).every((v) => v != false);
  };

  let media_chars: Node[];
  let compare_chars: Waifu[] = [];
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
    <div class="nav-container">
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
        <div class="left" id="profile">
          <Profile />
        </div>
        {#each i.filter((w) => filter_all(w)).splice(0, 200) as w}
          <div class="waifu-card">
            <a
              href="{'https://anilist.co/character/' + w.ID}"
              title="view on anilist">
              <h4>
                {w.Name}
              </h4>
            </a>
            <p>{w.ID}</p>
            {#if compare_chars !== undefined}
              <Compare compare="{compare_chars.some((x) => x.ID === w.ID)}">
                <img src="{w.Image}" alt="{w.Name}" />
              </Compare>
            {:else}
              <img src="{w.Image}" alt="{w.Name}" />
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
  main {
    color: #eee;
  }

  #profile {
    grid-column: -3 / -1;
    grid-row: span 3;
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
  }

  .search-more {
    padding: 1.5rem;
    text-align: center;
    grid-column: 1 / -1;
  }

  .nav-container {
    top: 0;
    width: 100%;
    opacity: 98%;
    height: auto;
    background-color: hsl(0, 0%, 19%);
    position: fixed;
  }

  .nav {
    padding: 0 0.5rem;
    display: grid;
    grid-template-columns: 0.3fr 1fr 0.7fr 1fr;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .container {
    margin: auto;
    padding: 1rem;
    padding-top: 6rem;
    max-width: 70rem;
    display: grid;
    grid-auto-flow: dense;
    grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(3rem, 1fr));
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

  @media screen and (max-width: 1050px) {
    .nav {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto auto;
      padding: 1rem;
    }

    .container {
      padding-top: 13.5rem;
    }
  }
</style>
