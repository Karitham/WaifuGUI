<script lang="ts">
  import { SearchMedia } from "../anilist";
  import type { Waifu } from "../api";
  import type { Node, QueryResponse } from "../anilist";

  export let anime_waifus: Node[];
  export let search_text = "";
  let media: QueryResponse;

  $: media = search_text != "" ? media : null;
  $: anime_waifus =
    search_text != "" ? (media ? media.data.Media.characters.nodes : []) : [];

  export let filter: (w: Waifu) => boolean;

  $: filter = (w: Waifu) => {
    if (!media) return true;

    return media.data.Media.characters.nodes.find((i) => i.id == w.ID) != null;
  };

  async function LookupMedia(search: string) {
    if (search_text.length < 2) return;
    media = await SearchMedia(search);
  }
</script>

<label>
  {!media ? "Media" : media.data.Media.title.romaji}
  <input
    type="text"
    placeholder="media to search..."
    bind:value="{search_text}"
    on:keyup="{(e) => {
      if (e.key == 'Enter') LookupMedia(search_text);
    }}" />
  <button on:click="{() => LookupMedia(search_text)}">Search</button>
  {#if media}
    <button
      on:click="{() => {
        media = null;
        search_text = '';
      }}">x</button>
  {/if}
</label>

<style>
  label {
    color: #e4634d;
    font-weight: 600;
    font-size: 18px;
  }

  input {
    padding: 0.4rem;
    color: #eee;
    margin: 1rem;
    border-style: none;
    background-color: #494949;
  }
  button {
    border: none;
    background-color: #e4634d;
    padding: 0.5rem;
    color: #eee;
  }
</style>
