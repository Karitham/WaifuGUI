<script lang="ts">
  import Router from "svelte-spa-router";
  import Home from "./routes/Home.svelte";
  import List from "./routes/List.svelte";

  export const routes = {
    "/": Home,
    "/list/:user": List,
  };
</script>

<Router routes="{routes}" />
