<script lang="ts">
  import { push } from "svelte-spa-router";

  $: user = "";
  function pushToSearch() {
    if (user.length < 15) {
      console.log(user.length);
      alert("invalid user ID");
      return;
    }
    push("/list/" + user);
  }
</script>

<main class="bg-zinc-800 h-screen w-screen selection:bg-zinc-700">
  <div class="h-fullcontainer place-content-center text-white">
    <div>
      <h1 class="text-5xl p-8 text-center text-orange-400">WaifuGUI</h1>
    </div>
    <div>
      <img
        src="./favicon.png"
        alt="icon"
        class="m-auto rounded-md shadow-md shadow-gray-900"
      />
    </div>
    <div class="p-8 flex columns-2 justify-center items-center">
      <input
        class="bg-inherit border-2 border-gray-600 rounded-md p-2 w-64"
        type="text"
        name="user-input"
        alt="user-input"
        label="Enter a discord user ID to view the user's list"
        bind:value={user}
        placeholder="206794847581896705"
      />
      <input
        type="button"
        value="Search"
        on:click={pushToSearch}
        class="ml-2 p-2 rounded-md bg-orange-600 hover:bg-orange-500 text-white w-20"
      />
    </div>
  </div>
</main>
