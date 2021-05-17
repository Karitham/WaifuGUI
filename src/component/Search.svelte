<script lang="ts">
  import type { Waifu } from "../api";

  export let waifus: Waifu[] = [];
  export let search_text = "";
  export let filtered: Waifu[] = [];

  $: filtered = waifus.filter((w) => filter_text(w, search_text));

  function filter_text(row: Waifu, text: string): boolean {
    if (text.length < 3) return true;

    let reg = new RegExp(text, "i");
    return (
      Object.values(row).filter((v) => reg.exec(v.toString()) != null).length >
      0
    );
  }
</script>

<label>
  Name
  <input
    type="text"
    placeholder="name to search..."
    bind:value="{search_text}" />
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
</style>
