<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";

    export const load:Load = async ({ fetch , session }) => {
        if (session.user.id){
            const response = await fetch("/api/diary.json", {
                method: "GET",
                headers: 
                    { user: session.user.id }
            });

            if (response.ok) {
                const diaries = await response.json();
                
                return {
                    props: {diaries, user: session.user || false}
                }
            }

            const { message } = await response.json()
                return{
                    error: new Error(message)
                }
        }
    } 

</script>

<script lang="ts">
    import "../app.css"
    import "$lib/css/diary.css"
    export let user:any;
    export let diaries: Diaries[];
    import DatePicker from "$lib/DatePicker.svelte";

    let currentDate = new Date();
    let currentDiary;

    currentDiary = diaries.filter(diary => {
        console.log(new Date(diary.date).getTime())
        console.log(currentDate.getTime())
        return(diary.date == currentDate)
    }) 
    
    console.log(currentDiary)

    const onDateChange = d => {
        currentDate = d.detail;
    };
    
</script>

{#if user}
    <div class=diary__container>
        <DatePicker 
            on:datechange={onDateChange}
            selected={currentDate}
        />
        <form action="/api/diary.json" method = "post">
            <textarea class="diary__textarea" name="diary" placeholder="What did you do today?">{currentDiary[0]?currentDiary[0].content:""}</textarea>
            <input type=hidden name="date" value={currentDate.toLocaleDateString()} />
            <input type=hidden name="user" value={user.id}/>
            <button type=submit>Save</button>
        </form>
    </div>
{/if}
