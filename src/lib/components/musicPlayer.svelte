<script>
    export let musicList;
    let audioElement;
    let musicVolume;
    let seekSlider;
    let curr_time;
    let total_time;
    let track_index = 0;
    let isPlaying = false;
    let onLoop = false;
    let isRandom = false;

    import "$lib/css/_layout.css"
    import "../../app.css";

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