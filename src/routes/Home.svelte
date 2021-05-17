<script lang="ts">
  import { push } from "svelte-spa-router";
  $: user = "";
</script>

<main>
  <div class="content">
    <h1>Welcome to WaifuGUI</h1>
    <img src="./favicon.png" alt="icon" />
    <span> Enter a discord user ID to view the user's list </span>
    <input type="text" bind:value="{user}" placeholder="206794847581896705" />
    <button
      on:click="{() => {
        if (user.length < 15) {
          console.log(user.length);
          alert('invalid user ID');
          return;
        }
        push('/list/' + user);
      }}">Search</button>
  </div>
</main>

<style>
  main {
    width: 100%;
    height: 100%;
  }
  .content {
    background-color: #202020;
    color: #eee;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
  }
  span {
    padding: 1rem;
  }
  h1 {
    text-align: center;
    font-size: 7ch;
    color: #e4634d;
  }
  input {
    padding: 0.5rem;
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
