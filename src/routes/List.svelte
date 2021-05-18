<script lang="ts">
  import { push } from "svelte-spa-router";
  import { Inventory } from "../api";
  import type { Waifu } from "../api";
  import Search from "../component/Search.svelte";
  import SearchByAnime from "../component/SearchByMedia.svelte";
  import Profile from "../component/Profile.svelte";

  export let params: { user: string };
  let ws: Waifu[];
  let ws2: Waifu[];
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
  <div class="wrapper">
    {#await $Inventory.pullInventory(params.user) then waifus}
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
            <Search waifus="{ws}" bind:filtered="{ws2}" />
          </div>
          <div class="search-prop">
            <SearchByAnime waifus="{waifus}" bind:filtered="{ws}" />
          </div>
        </div>
      </div>
      <div class="left" id="profile">
        <Profile />
      </div>
      {#if ws}
        <div id="list">
          <div class="container">
            {#each ws2.splice(0, 105) as w}
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
          </div>
          {#if ws.length > 100}
            <h4 class="search-more">Search to list more...</h4>
          {/if}
        </div>
      {/if}
    {/await}
  </div>
</main>

<style>
  main {
    top: 0;
    padding: 0;
    margin: 0;
  }

  .wrapper {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-columns: auto auto;
  }

  #profile {
    padding-top: 6rem;
    grid-column: 2;
    grid-row: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #list {
    padding-top: 6rem;

    grid-row: 2;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #nav {
    z-index: 10;
    grid-column: 1 / span 2;
    grid-row: 1;
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
    padding: 2rem;
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
    justify-content: space-between;
    align-items: center;
  }

  .search {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }

  .wrapper {
    top: 0;

    width: 100%;
    text-align: center;
    color: #eee;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 65rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
  }

  @media screen and (max-width: 860px) {
    .container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (min-width: 1300px) {
    .container {
      grid-template-columns: repeat(7, 1fr);
    }
  }

  .waifu-card {
    background-color: hsl(0, 0%, 14%);
    border-radius: 3px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  img {
    width: 6rem;
    margin: 0.5rem;
  }
</style>
