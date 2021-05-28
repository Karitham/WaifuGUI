<script lang="ts">
  export let showDropDown = false;

  $: showDropDown;
</script>

{#if showDropDown}
  <div class="container">
    <slot />
  </div>
{/if}

<style>
  .container {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
</style>
