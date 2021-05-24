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
    background-color: #2e2e2e;
    height: 100%;
    width: 100%;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  a {
    color: #eee;
  }

  a,
  p,
  h5,
  h4,
  h3 {
    margin: 0.4rem;
  }

  .description {
    word-wrap: break-word;
    text-align: center;
  }

  .waifu-card {
    justify-items: auto;
  }

  img {
    width: 175px;
    height: 300px;
    object-fit: cover;
  }
</style>
