<script lang="ts">
  import { push } from "svelte-spa-router";
  import { Inventory } from "../api";
  import type { Waifu } from "../api";
  import Search from "../component/Search.svelte";
  import SearchByAnime from "../component/SearchByMedia.svelte";
  import Profile from "../component/Profile.svelte";
  export let params: { user: string };

  $: filters = [(_: Waifu) => true, (_: Waifu) => true];
  $: filter_all = (w: Waifu) => {
    return filters.map((f) => f(w)).every((v) => v != false);
  };
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
    <div class="nav" id="nav">
      <div class="back-btn pl">
        <button
          class="search-prop"
          on:click="{() => {
            push('/');
          }}">Back</button>
      </div>
      <div class="search pl">
        <div class="search-prop">
          <Search bind:filter="{filters[0]}" />
        </div>
        <div class="search-prop">
          <SearchByAnime bind:filter="{filters[1]}" />
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
            <img src="{w.Image}" alt="{w.Name}" />
          </div>
        {/each}
        <h4 class="search-more">Search to list more...</h4>
      </div>
    </div>
  {/await}
</main>

<style>
  main {
    color: #eee;
  }

  .container-wrapper {
    margin: auto;
  }

  #profile {
    grid-column: -3 / -1;
    grid-row: span 2;
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

  .pl {
    padding: 0 1rem;
  }

  .search-more {
    padding: 1.5rem;
    text-align: center;
    grid-column: 1 / -1;
  }

  button {
    border: none;
    background-color: #e4634d;
    padding: 0.5rem;
    color: #eee;
  }

  .nav {
    top: 0;
    width: 100%;
    opacity: 98%;
    background-color: hsl(0, 0%, 19%);

    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: safe;
    align-items: center;
  }

  .search {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .container {
    margin: auto;
    padding-top: 6rem;
    max-width: 70rem;
    display: grid;
    grid-auto-flow: dense;
    grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(3rem, 1fr));
    gap: 1rem;
  }

  .waifu-card {
    background-color: hsl(0, 0%, 14%);

    text-align: center;
    border-radius: 3px;

    display: flex;
    flex-direction: column;
    justify-content: center; /* align horizontal */
    align-items: center; /* align vertical */
  }

  img {
    width: 100px;
    height: 150px;
    object-fit: cover;
    margin: 0.5rem;
  }
</style>
