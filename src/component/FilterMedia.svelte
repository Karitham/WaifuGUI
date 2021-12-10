<script lang="ts">
  import type { Node, QueryResponse } from "../anilist";
  import { searchMedia } from "../anilist";
  import type { Waifu } from "../api";

  export let media_chars: Node[];
  export let search_text = "";
  let media: QueryResponse;

  $: media = search_text != "" ? media : null;
  $: media_chars =
    search_text != "" ? (media ? media.data.Media.characters.nodes : []) : [];

  export let filter: (w: Waifu) => boolean;

  $: filter = (w: Waifu) => {
    if (!media) return true;

    return media.data.Media.characters.nodes.find((i) => i.id == w.id) != null;
  };

  async function LookupMedia(search: string) {
    if (search_text.length < 2) return;
    media = await searchMedia(search);
  }
</script>

<form
  action=""
  class="flex justify-center bg-inherit rounded-xl border-2 border-zinc-600 overflow-hidden"
>
  <input
    type="search"
    name="media"
    label="media"
    placeholder="Search media..."
    bind:value={search_text}
    on:keypress={(e) => {
      if (e.key == "Enter") {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        LookupMedia(search_text);
        return false;
      }
    }}
    class="block text-black rounded-md border-0 focus:outline-none focus:ring-0 focus:border-blue-500 flex-grow p-2 bg-inherit placeholder:text-zinc-700"
  />
  <button type="submit" on:click={() => LookupMedia(search_text)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 my-auto m-2"
      style="color: black"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </button>
</form>
