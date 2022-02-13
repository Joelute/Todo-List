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
    import { musicList } from "$lib/musicList";
    import { variables } from "$lib/variables";
    import { onMount } from "svelte"
    
    let track_index = 0;
    let isPlaying = false;
    let onLoop = false;
    let isRandom = false;
    let audioElement;
    let musicVolume;
    let seekSlider;
    let updateTimer;
    let curr_time;
    let total_time;
    let navMenu;
    let navToggle;
    let navClose;
    let spotifyMenu;
    let spotifyClose;
    let spotifyToggle;
    let musicMenu;
    let musicClose;

    const openNav = () =>{
        navMenu.classList.add("show-menu")
    }

    const closeNav = () => {
        navMenu.classList.remove("show-menu")
    }

    const openSpotify = () => {
        spotifyMenu.classList.add("show-music")
        spotifyToggle.classList.add("hide__element")
    }

    const closeSpotify = () => {
        spotifyMenu.classList.remove("show-music")
        spotifyToggle.classList.remove("hide__element")
    }

    const openMusic = () => {
        musicMenu.classList.add("show-music")
    }

    const closeMusic = () => {
        musicMenu.classList.remove("show-music")
    }

    const prevTrack = () => {
        if (isRandom) {
            ShuffleMusic();
        } else if (onLoop) {
            //Empty statement and continue on
        } else if (track_index == 0){
            track_index = $musicList.length - 1;
        } else{
            track_index = (track_index - 1)
        }
        audioElement.src = $musicList[track_index].music
        isPlaying = true;
        audioElement.play();
    }

    const nextTrack = () => {
        if (isRandom) {
            ShuffleMusic();
        } else if (onLoop) {
            //Empty statement and continue on
        } else if(track_index == $musicList.length - 1){
            track_index = 0;            
        } else {
            track_index = (track_index + 1)
        }
        audioElement.src = $musicList[track_index].music
        isPlaying = true;
        audioElement.play();
    }

    const setVolume = () => {
        audioElement.volume = musicVolume.value/100;
    }

    const playpauseTrack = () => {
        if (isPlaying) {
            audioElement.pause();
            isPlaying = false;
        }
        else if (!isPlaying) {
            audioElement.play();
            isPlaying = true;
        }
    }

    const seekTo = () => {
        audioElement.currentTime = audioElement.duration * (seekSlider.value/100);
    }

    const setUpdate = () => {
        let seekPosition = 0;
        if(!(audioElement.duration == 0)){
            seekPosition = audioElement.currentTime * (100 / audioElement.duration);
            seekSlider.value = seekPosition;

            let currentMinutes = Math.floor(audioElement.currentTime / 60);
            let currentSeconds = Math.floor(audioElement.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(audioElement.duration / 60);
            let durationSeconds = Math.floor(audioElement.duration - durationMinutes * 60);

            if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
            if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
            if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
            if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

            curr_time.textContent = currentMinutes + ":" + currentSeconds;
            total_time.textContent = durationMinutes + ":" + durationSeconds;
        }
    }

    const toggleShuffleMusic = () => {
        if(isRandom){
            isRandom = false;
        } else {
            isRandom = true;
            onLoop = false;
        } 
    }

    const ShuffleMusic = () => {
        let randomIndex = Math.floor(Math.random()*5);
        console.log(randomIndex)
        if (randomIndex == track_index){
            ShuffleMusic();
        } else {
            track_index = randomIndex;
        }
    }

    const loopMusic = () => {
        if(onLoop){
            onLoop = false;
        } else {
            onLoop = true;
            isRandom = false;
        } 
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


<div class="spotify__player container">
    <div class="spotify__player__menu" id="spotify-player-menu" bind:this={spotifyMenu}>
        <ul class="spotify__list grid">
            <li class="spotify__item">
                <h1 class="spotify__button">
                    <i class="im im-spotify"></i> Spotify
                </h1>
            </li>
            <li class="spotify__item">
                <h1 class="spotify__button">
                    <i class="uil uil-music"></i> Music
                </h1>
            </li>
            <li class="spotify__item">
                <h1 class="spotify__button" id="spotify-close" bind:this={spotifyClose} on:click={closeSpotify}>
                    <i class="uil uil-times-circle"></i> Close
                </h1>
            </li>
        </ul>
        <iframe title="spotify" class="spotify__music__player" src="https://open.spotify.com/embed/playlist/4yo2GyYfzYHT6aUIwsYaKC?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
    </div>
    
    <div class="spotify__toggle" id="spotify-toggle" bind:this={spotifyToggle} on:click={openSpotify}>
        <i class="im im-spotify"></i>
    </div>
</div>

<div class="music container">
    <div class="music__player__menu" id="music-player-menu" bind:this={musicMenu}>
        <ul class="music__list grid">
            <li class="music__item">
                <i class="im im-spotify"></i> Spotify
            </li>
            <li class="music__item">
                <i class="uil uil-music"></i> Music
            </li>
            <li class="music__item" id="music-close" bind:this={musicClose} on:click={closeMusic}>
                <i class="uil uil-times-circle"></i> Close
            </li>
        </ul>
        <div class="music__player">
            <audio src={$musicList[track_index].music} bind:this={audioElement} on:ended={nextTrack} on:timeupdate={setUpdate}></audio>
            <div class="now__playing" id="now-playing">{$musicList[track_index].name}</div>
            <div class="track__art__container" id="track-art">
                <img src={$musicList[track_index].image} alt="Track Art" class="track__art">
            </div>
            <div class="slider__container">
                <div class="current__time" id="current-time" bind:this={curr_time}>00:00</div>
                <input type="range" min="0" max ="100" value="0" class="seek__slider" bind:this={seekSlider} on:change={() => seekTo()}>
                <div class="total__time" id="total-time" bind:this={total_time}>00:00</div>
            </div>

            <div class="volume__container">
                <i class="uil uil-volume-down music__icon"></i>
                <input type="range" min="0" max="100" value="100" class="volume__slider" bind:this={musicVolume} on:change={() => setVolume()}>
                <i class="uil uil-volume-up music__icon"></i>
            </div>

            <div class="button__container">
                <ul class="music__player__list">
                    <li class="music__player__button">
                        <i class={isRandom ? "uil uil-arrow-random active__button" : "uil uil-arrow-random"} id="shuffle-button" on:click={toggleShuffleMusic}></i>
                    </li>
                    <li class="music__player__button">
                        <i class="uil uil-step-backward" id="previous-track" on:click={() => prevTrack()}></i>
                    </li>
                    <li class="music__player__button">
                        {#if isPlaying}
                            <i class="uil uil-pause" id="play-button" on:click={() => playpauseTrack()}></i>
                        {:else}
                            <i class="uil uil-play" id="play-button" on:click={() => playpauseTrack()}></i>
                        {/if}
                    </li>
                    <li class="music__player__button">
                        <i class="uil uil-skip-forward" id="next-track" on:click={() => nextTrack()}></i>
                    </li>
                    <li class="music__player__button">
                        <i class={onLoop ? "uil uil-redo active__button" : "uil uil-redo"} id="loop-button" on:click={() => loopMusic()}></i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="music__toggle" id="music-toggle" on:click={openMusic}>
        <i class="uil uil-music"></i>
    </div>
</div>



<slot />