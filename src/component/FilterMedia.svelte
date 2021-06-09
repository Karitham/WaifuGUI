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

<div class="container">
  <label for="media">Media</label>
  <input
    type="text"
    placeholder="media to search..."
    bind:value="{search_text}"
    on:keyup="{(e) => {
      if (e.key == 'Enter') LookupMedia(search_text);
    }}" />
  <button on:click="{() => LookupMedia(search_text)}">Search</button>

  <button
    disabled="{media !== undefined}"
    on:click="{() => {
      media = null;
      search_text = '';
    }}">x</button>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 7ch 1fr 7ch 3ch;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
  }

  label {
    color: #e4634d;
    font-weight: 600;
    font-size: 18px;
  }

  input {
    padding: 0.4rem;
    color: #eee;
    border-style: none;
    background-color: #494949;
  }

  button {
    border: none;
    background-color: #e4634d;
    padding: 0.5rem;
    color: #eee;
  }

  button:disabled {
    background-color: hsl(9, 74%, 75%);
  }
</style>
