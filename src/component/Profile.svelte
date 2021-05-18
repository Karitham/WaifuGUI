<script lang="ts">
  import { Inventory } from "../api";
</script>

{#if $Inventory}
  <div class="content">
    <h3>User {$Inventory.ID}</h3>
    {#if $Inventory.Favorite}
      <h4>Favorite Character</h4>
      <div class="waifu-card">
        <a
          href="{'https://anilist.co/character/' + $Inventory.Favorite.ID}"
          title="view on anilist">
          <h5>
            {$Inventory.Favorite.Name}
          </h5>
        </a>
        <p>{$Inventory.Favorite.ID}</p>
        <img
          src="{$Inventory.Favorite.Image}"
          alt="{$Inventory.Favorite.Name}" />
      </div>
    {/if}
    <div class="description">
      <p>
        {$Inventory.Quote}
      </p>
    </div>
  </div>
{/if}

<style>
  .content {
    margin: 0.7rem;
    position: sticky;
    border-radius: 5px;
    background-color: #353535;
    max-width: max-content;
    padding: 1.7rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: min-content;
  }

  .description {
    word-wrap: break-word;
    text-align: center;
  }
  a {
    color: #eee;
  }
</style>
