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
    import "$lib/css/_layout.css"
    import { variables } from "$lib/variables";
    import { onMount } from "svelte"
    import { onDestroy } from 'svelte';
    onMount(() => {
        const navMenu = document.getElementById("nav-menu"),
                navToggle = document.getElementById("nav-toggle"),
                navClose = document.getElementById("nav-close")

        if (navToggle){
            navToggle.addEventListener('click', () =>{
                navMenu.classList.add("show-menu")
            })
        }
        if (navClose){
            navClose.addEventListener("click", () =>{
                navMenu.classList.remove("show-menu")
            })
        }
        const navLink = document.querySelectorAll('.nav__link')
        function linkAction(){
            navMenu.classList.remove('show-menu')
        }
        navLink.forEach(n => n.addEventListener('click', linkAction))
    });
</script>


<header class="header" id="header">
    <nav class = "nav container">
        <div class="nav__menu" id="nav-menu">
            <ul class = "nav__list grid">
                <li class="nav__item">
                    <a href= "./" class="nav__link">
                        <i class="uil uil-estate nav__icon"></i> Home
                    </a>
                </li>
                <li class="nav__item">
                    <a href= "./about-us" class="nav__link">
                        <i class="uil uil-cloud-info nav__icon"></i> About
                    </a>
                </li>
                <i class="uil uil-times-circle nav__close nav__icon" id="nav-close"></i>
            </ul>
        </div>
        <div class="nav-buttons">
            <div class="nav__toggle" id="nav-toggle">
                <i class="uil uil-apps nav__icon"></i>
            </div>
        </div>

        {#if !user}
            <div class = "login-button"> 
                <a href="{variables.VITE_DISCORD_URL}">Login</a>
            </div>

        {:else}
            <img class="avatar-pic" alt="{user.userName}#{user.discriminator} avatar" src="https://cdn.discordapp.com/avatars/{user.id}/{user.avatar}.png">
        {/if}
    
    </nav>
</header>

<slot />