<script lang="ts">
  import { push } from "svelte-spa-router";
  import { Inventory } from "../api";
  import type { Waifu } from "../api";
  import Search from "../component/Search.svelte";
  import SearchByAnime from "./SearchByMedia.svelte";

  export let params: { user: string };
  let ws: Waifu[];
  let ws2: Waifu[];
</script>

<div class="wrapper">
  {#await $Inventory.pullInventory(params.user) then waifus}
    <div class="nav">
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
    {#if ws}
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
    {/if}
  {/await}
</div>

<style>
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
    background-color: #202020;
    width: 100%;
    text-align: center;
    color: #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container {
    width: 100%;
    max-width: 65rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    padding-top: 6rem;
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
