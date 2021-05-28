<script lang="ts">
  import { User } from "../api";
  import type { Waifu } from "../api";
  $: user = "";

  export let CompareChars: Waifu[] = [];

  async function LookupUser(user: string) {
    let u = new User();
    CompareChars = await u.pullInventory(user);
  }
</script>

<div class="container">
  <label for="user"> User </label>
  <input type="text" bind:value="{user}" placeholder="206794847581896705" />
  <button on:click="{() => LookupUser(user)}">Search</button>
  {#if user}
    <button
      on:click="{() => {
        CompareChars = [];
        user = '';
      }}">x</button>
  {/if}
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
    width: 100%;
    margin: 0 0.5rem;
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
