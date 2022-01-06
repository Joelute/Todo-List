<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";

    export const load: Load = async ({ fetch }) => {
        const response = await fetch("/api.json");

        if (response.ok) {
            const todos = await response.json();
            return{
                props : { todos }
            } 
        }

        const { message } = await response.json();
        return{
            error: new Error(message)
        }
    };

</script>

<script lang="ts">
    import TodoItem from "$lib/todo-item.svelte";

    export let todos:Todo[];
    const title = "To Do"
</script>

<style>
    .todos {
        width: 100%;
        max-width: 42rem;
        margin: 4rem auto 0 auto;
    }

    .new {
        margin: 0 0 0.5rem 0;
    }
    .new input {
        font-size: 28px;
        width: 100%;
        padding: 0.5em 1em 0.3em 1em;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        text-align: center;
    }
    .todos :global(input) {
        border: 1px solid transparent;
    }
    .todos :global(input:focus-visible){
        box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
        outline: none;
    }
</style>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class = "todos">
    <h1>{title}</h1>
    <form action = "/api.json" method = "post" class="new">
        <input type = "text" name = "text" aria-label="Add a todo" placeholder="+ type to add a todo" />
    </form>
    {#each todos as todo}
        <TodoItem {todo}/>
    {/each}
</div>