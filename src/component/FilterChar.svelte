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

<form
  action=""
  class="flex justify-center bg-inherit rounded-xl border-2 border-zinc-600 overflow-hidden"
>
  <input
    type="search"
    label="Character"
    placeholder="Filter characters..."
    bind:value={search_text}
    on:keypress={(e) => {
      if (e.key == "Enter") {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    }}
    class="block text-black rounded-md border-0 focus:outline-none focus:ring-0 focus:border-blue-500 flex-grow p-2 bg-inherit placeholder:text-zinc-700"
  />
</form>
