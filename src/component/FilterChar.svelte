<script lang="ts">
  import type { Waifu } from "../api";

  $: search_text = "";

  export let filter: (w: Waifu) => boolean;
  $: filter = (w: Waifu) => {
    if (search_text.length < 3) return true;

    let reg = new RegExp(search_text, "i");

    return (
      Object.values(w).filter((prop) => {
        return reg.exec(prop.toString()) != null;
      }).length > 0
    );
  };
</script>

<div class="container">
  <label for="name"> Name </label>
  <input
    type="text"
    placeholder="name to search..."
    bind:value="{search_text}" />
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0 1rem;
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
    margin: 0 0.5rem;
    width: 100%;
    background-color: #494949;
  }
</style>
