<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	export const load: Load = async ({session}) => {
    return { 
      props: { user: session.user || false } 
    }
  }
</script>

<script lang="ts">
    export let user;
    import "../app.css";

    import { variables } from "$lib/variables";

</script>

<nav class = "nav-bar">
    <ul class = "nav-links">
        <li>
            <a href= "./">Home</a>
        </li>
        <li>
            <a href= "./about-us">About</a>
        </li>
    </ul>
    {#if !user}
        <div class = "login-button"> 
            <a href="{variables.VITE_DISCORD_URL}">Login</a>
        </div>

    {:else}
        <img alt="{user.userName}#{user.discriminator} avatar" src="https://cdn.discordapp.com/avatars/{user.id}/{user.avatar}.png">
    {/if}
  
</nav>
<slot />