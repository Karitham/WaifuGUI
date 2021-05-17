<script lang="ts">
  import { Inventory } from "../api";
  import type { Waifu } from "../api";
  import Search from "../component/Search.svelte";

  export let params: { user: string };
  let ws: Waifu[];
</script>

<div class="wrapper">
  {#await $Inventory.pullInventory(params.user) then waifus}
    <div class="search-bar">
      <Search waifus="{waifus}" bind:filtered="{ws}" />
    </div>
    {#if ws}
      <div class="container">
        {#each ws.splice(0, 100) as w}
          <div class="waifu-card">
            <h4>{w.Name}</h4>
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

  .search-more {
    padding: 2rem;
  }

  .search-bar {
    position: fixed;
    width: 100%;
    opacity: 98%;
  }

  .wrapper {
    background-color: #212121;
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
