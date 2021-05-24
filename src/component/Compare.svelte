<script lang="ts">
  export let compare: boolean;
</script>

<div class:border="{compare}">
  <slot />
</div>

<style>
  .border {
    border: none;
    border-style: solid;
    border-width: 2px;
    border-color: #e4634d;
  }
</style>
