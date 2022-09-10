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
    import MusicPlayer from "$lib/components/musicPlayer.svelte";
    import { musicList } from "$lib/musicList";
    import { variables } from "$lib/variables";


    let navMenu;
    let navToggle;
    let navClose;
    let spotifyMenu;
    let spotifyClose;
    let spotifyToggle;
    let musicMenu;
    let musicClose;
    let musicToggle;

    const openNav = () =>{
        navMenu.classList.add("show-menu")
    }

    const closeNav = () => {
        navMenu.classList.remove("show-menu")
    }

    const openSpotify = () => {
        spotifyMenu.classList.add("show-music")
        spotifyToggle.classList.add("hide__element")
        musicToggle.classList.add('hide__element')
    }

    const closeSpotify = () => {
        spotifyMenu.classList.remove("show-music")
        spotifyToggle.classList.remove("hide__element")
        musicToggle.classList.remove('hide__element')
    }

    const openMusic = () => {
        musicMenu.classList.add("show-music")
        musicToggle.classList.add('hide__element')
    }

    const closeMusic = () => {
        musicMenu.classList.remove("show-music")
        musicToggle.classList.remove('hide__element')
    }


</script>

<header class="header" id="header">
    <nav class = "nav container">
        <div class="nav__menu" id="nav-menu" bind:this={navMenu}>
            <ul class = "nav__list grid">
                <li class="nav__item">
                    <a href= "./" class="nav__link" on:click={closeNav}>
                        <i class="uil uil-estate nav__icon"></i> Home
                    </a>
                </li>
                <li class="nav__item">
                    <a href= "./diary" class="nav__link" on:click = {closeNav}>
                        <i class="uil uil-diary-alt nav__icon"></i> Diary
                    </a>
                </li>
                <li class="nav__item">
                    <a href= "./about-us" class="nav__link" on:click={closeNav}>
                        <i class="uil uil-cloud-info nav__icon"></i> About
                    </a>
                </li>
                <i class="uil uil-times-circle nav__close nav__icon" id="nav-close" bind:this={navClose} on:click={closeNav}></i>
            </ul>
        </div>
        <div class="nav-buttons">
            <div class="nav__toggle" id="nav-toggle" bind:this={navToggle} on:click={openNav}>
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


<div class="musicPlayer__container container">
    <div class="musicPlayer__div" bind:this={spotifyMenu}>
        <ul class="musicPlayer__list grid">
            <li class="musicPlayer__item">
                <i class="im im-spotify"></i> Spotify
            </li>
            <li class="musicPlayer__item">
                <i class="uil uil-music"></i> Music
            </li>
            <li class="musicPlayer__item" id="spotify-close" bind:this={spotifyClose} on:click={closeSpotify}>
                <i class="uil uil-times-circle"></i> Close             
            </li>
        </ul>
        <iframe title="spotify" class="spotify__music__player" src="https://open.spotify.com/embed/playlist/4yo2GyYfzYHT6aUIwsYaKC?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
    </div>
    
    <div class="spotify__toggle" bind:this={spotifyToggle} on:click={openSpotify}>
        <i class="im im-spotify"></i>
    </div>
</div>

<div class="musicPlayer__container container">
    <div class="musicPlayer__div" bind:this={musicMenu}>
        <ul class="musicPlayer__list grid">
            <li class="musicPlayer__item">
                <i class="im im-spotify"></i> Spotify
            </li>
            <li class="musicPlayer__item">
                <i class="uil uil-music"></i> Music
            </li>
            <li class="musicPlayer__item" bind:this={musicClose} on:click={closeMusic}>
                <i class="uil uil-times-circle"></i> Close
            </li>
        </ul>
        <MusicPlayer 
            musicList = {musicList}
        />
    </div>
    <div class="music__toggle" bind:this={musicToggle} on:click={openMusic}>
        <i class="uil uil-music"></i>
    </div>
</div>

<slot />