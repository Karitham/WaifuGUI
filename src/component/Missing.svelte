<script lang="ts">
  import type { Node } from "../anilist";
  import type { Waifu } from "../api";
  import { Inventory } from "../api";
  import Compare from "./Compare.svelte";

  export let missing: Node[] = [];
  let really_missing: Node[] = [];
  export let CompareChars: Waifu[] = [];

  $: really_missing = missing.filter(
    (w) => !$Inventory.waifus.some((x) => x.id == w.id)
  );
</script>

{#if really_missing && really_missing.length > 0}
  <div class="flex flex-col justify-center items-center pb-12 w-full">
    <h3 class="text-3xl text-center py-7 text-orange-300">Non-Acquired</h3>
    <div
      class="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-center"
    >
      {#each really_missing as w}
        <div
          class="shadow-zinc-900 shadow-md w-full bg-zinc-900 rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center"
        >
          <div class="flex-auto">
            <Compare compare={CompareChars.some((x) => x.id === w.id)}>
              <img
                src={w.image.large}
                alt={w.name.full}
                class="object-top object-cover w-full"
              />
            </Compare>
          </div>
          <div class="text-center py-8 sm:py-6">
            <a
              href={"https://anilist.co/character/" + w.id}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p class="text-xl text-gray-200 font-bold mb-2">{w.name.full}</p>
            </a>
            <p class="text-base text-gray-400 font-normal">{w.id}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
