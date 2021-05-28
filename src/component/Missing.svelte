<script lang="ts">
  import type { Node } from "../anilist";
  import { Inventory } from "../api";
  import type { Waifu } from "../api";
  import Compare from "./Compare.svelte";

  export let missing: Node[] = [];
  let really_missing: Node[] = [];
  export let CompareChars: Waifu[] = [];

  $: really_missing = missing.filter(
    (w) => !$Inventory.Waifus.some((x) => x.ID == w.id)
  );
</script>

{#if really_missing}
  {#each really_missing as w}
    <div class="waifu-card">
      <a
        href="{'https://anilist.co/character/' + w.id}"
        title="view on anilist">
        <h4>
          {w.name.full}
        </h4>
      </a>
      <p>{w.id}</p>
      {#if CompareChars}
        <Compare compare="{CompareChars.some((x) => x.ID === w.id)}">
          <div class="overlay-wrapper">
            <div class="img-overlay"></div>
            <img src="{w.image.large}" alt="{w.name.full}" />
          </div>
        </Compare>
      {:else}
        <div class="overlay-wrapper">
          <div class="img-overlay"></div>
          <img src="{w.image.large}" alt="{w.name.full}" />
        </div>
      {/if}
    </div>
  {/each}
{/if}

<style>
  h4,
  p {
    margin: 0.5rem;
  }

  a {
    color: #ddd;
  }

  .waifu-card {
    background-color: hsl(0, 0%, 14%);
    text-align: center;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
  }

  img {
    object-fit: cover;
    width: 100px;
    height: 150px;
  }

  .img-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(56, 56, 56, 0.6);
  }

  .overlay-wrapper {
    position: relative;
    width: 100px;
    height: 150px;
  }
</style>
