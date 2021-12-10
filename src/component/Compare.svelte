<script lang="ts">
  export let compare: boolean;
</script>

<div class:border-orange-200={compare}>
  <slot />
</div>
