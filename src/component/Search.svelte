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

<div class="wrapper">
  <label>
    Search
    <input type="text" placeholder="name" bind:value="{search_text}" />
  </label>
</div>

<style>
  .wrapper {
    width: 100%;

    background-color: hsl(0, 0%, 19%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  label {
    color: #eee;
    font-weight: 600;
  }

  input {
    padding: 0.4rem;
    width: 60ch;
    color: #eee;
    margin: 1rem;
    border-style: none;
    background-color: #494949;
  }
</style>
