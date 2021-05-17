<script lang="ts">
  import WaifuList from "../component/WaifuList.svelte";

  export let params: { user: string };
</script>

<main>
  <WaifuList params="{params}" />
</main>

<style>
  main {
    background-color: #212121;
    height: 100%;
  }
</style>
