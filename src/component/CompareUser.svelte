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
  <button
    disabled="{user !== undefined}"
    on:click="{() => {
      CompareChars = [];
      user = '';
    }}">x</button>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 0.2fr 1fr 0.2fr 0.1fr;
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
