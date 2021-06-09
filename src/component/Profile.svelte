<script lang="ts">
  import { Inventory } from "../api";
</script>

{#if $Inventory}
  <div class="content">
    <h3>User {$Inventory.id}</h3>
    {#if $Inventory.favorite}
      <h4>Favorite Character</h4>
      <div class="waifu-card">
        <a
          href="{'https://anilist.co/character/' + $Inventory.favorite.id}"
          title="view on anilist">
          <h5>
            {$Inventory.favorite.name}
          </h5>
        </a>
        <p>{$Inventory.favorite.id}</p>
        <img
          src="{$Inventory.favorite.image}"
          alt="{$Inventory.favorite.name}" />
      </div>
    {/if}
    <div class="description">
      <p>
        {$Inventory.quote}
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
    justify-content: center;
    text-align: center;
  }

  a {
    color: #eee;
  }

  .content > * {
    margin: 0.5rem;
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
