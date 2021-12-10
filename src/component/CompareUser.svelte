<script lang="ts">
  import type { Waifu } from "../api";
  import { User } from "../api";
  $: user = "";

  export let CompareChars: Waifu[] = [];

  async function LookupUser(user: string) {
    let u = new User();
    try {
      CompareChars = await u.pullInventory(user);
    } catch (e) {
      console.error(e);
      alert("user not found");
    }
  }
</script>

<form
  action=""
  class="flex justify-center bg-inherit rounded-xl border-2 border-zinc-600 overflow-hidden"
>
  <input
    type="search"
    placeholder="Compare user..."
    bind:value={user}
    on:keypress={(e) => {
      if (e.key == "Enter") {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        LookupUser(user);
        return false;
      }
    }}
    class="block text-black rounded-md border-0 focus:outline-none focus:ring-0 flex-grow p-2 bg-inherit placeholder:text-zinc-700"
  />
  <button type="submit" on:click={() => LookupUser(user)}>
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
