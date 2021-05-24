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

<label>
  User
  <input type="text" bind:value="{user}" placeholder="206794847581896705" />
  <button on:click="{() => LookupUser(user)}">Search</button>
  {#if user}
    <button
      on:click="{() => {
        CompareChars = [];
        user = '';
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
