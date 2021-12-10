<script>
  import { marked } from "marked";
  import { Inventory } from "../api";
</script>

{#if $Inventory}
  <div class="overflow-hidden flex flex-col justify-center items-center mb-12 ">
    <h3 class="text-3xl text-orange-200 py-2">User {$Inventory.id}</h3>
    {#if $Inventory.favorite}
      <h4 class="text-xl text-orange-100">Favorite Character</h4>
      <div class="text-center py-8 sm:py-6">
        <img
          src={$Inventory.favorite.image}
          alt={$Inventory.favorite.name}
          class="object-top object-cover rounded-lg w-full shadow-md shadow-neutral-900"
        />
        <div class="text-center py-8 sm:py-6">
          <a
            href={"https://anilist.co/character/" + $Inventory.favorite.id}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p class="text-xl text-gray-200 font-bold mb-2">
              {$Inventory.favorite.name}
            </p>
          </a>
          <p class="text-base text-gray-400 font-normal">
            {$Inventory.favorite.id}
          </p>
        </div>
      </div>
    {/if}
    <div>
      <p class="text-md text-center ">
        {@html marked.parse($Inventory.quote.replaceAll("\n", "\n\n"))}
      </p>
    </div>
  </div>
{/if}
