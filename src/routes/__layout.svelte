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
            <a href="https://discord.com/api/oauth2/authorize?client_id=930626088135196742&redirect_uri=https%3A%2F%2F3000-peach-coyote-w3aqp3gu.ws-us27.gitpod.io%2Fapi%2Fcallback&response_type=code&scope=identify">Login</a>
        </div>

    {:else}
        <img alt="{user.userName}#{user.discriminator} avatar" src="https://cdn.discordapp.com/avatars/{user.id}/{user.avatar}.png">
    {/if}
  
</nav>
<slot />