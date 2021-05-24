<script lang="ts">
  export let compare: boolean;
</script>

<div class:border="{compare}">
  <slot />
</div>

<style>
  .border {
    width: 100px;
    height: 150px;
    border: none;
    border-style: solid;
    border-width: 3px;
    border-color: #e4634d;
  }
</style>
