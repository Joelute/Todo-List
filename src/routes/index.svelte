<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";
    import { enhance } from "$lib/actions/form";

    export const load: Load = async ({ fetch , session}) => {
        if (session.user.id){
            const response = await fetch("/api/todo.json", {
                method: "GET",
                headers: { user: session.user.id }
                }
            );

            if (response.ok) {
                const todos = await response.json();
                return{
                    props : { todos , user: session.user || false}
                } 
            }

            const { message } = await response.json();
                return{
                    error: new Error(message)
                }
            }

        else {
            return {
                status:303,
                headers: {
                    location: "/login"
                }
            }
        }
    };

</script>



<script lang="ts">
    import TodoItem from "$lib/todo-item.svelte";
    export let user:any;
    export let todos:Todo[];
    import { setContext } from 'svelte';
    setContext(user, user);
    const title = "To Do"
    
    const processNewTodoResult = async (response: Response, form: HTMLFormElement) => {
        const newTodo = await response.json();
        todos = [...todos, newTodo];
        form.reset();
    }

    const ProcessUpdatedTodoResult = async (response: Response) => {
        const updatedTodo = await response.json();
        todos = todos.map(t => {
            if (t.id === updatedTodo.id) return updatedTodo; return t;
        })
    }

</script>

<style>
    .todos {
        width: 100%;
        max-width: 42rem;
        padding: var(--mb-1);
        margin: 8.5rem auto 0 auto;
        border-radius: 1.5rem;
        background-color: var(--body-color);
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, .15);
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

{#if user}
    <div class = "todos">
        <h1>{title}</h1>
        <form action = "/api/todo.json" method = "post" class="new" use:enhance={{result: processNewTodoResult}}>
            <input type = "text" name = "text" aria-label="Add a todo" placeholder="+ type to add a note" />
            <input type = "hidden" name = "user" value = {user.id} />
        </form>
        {#each todos as todo}
            <TodoItem
                {todo}
                ProcessDeletedTodoResult={() => {
                    todos = todos.filter(t => t.id !== todo.id);}}
                {ProcessUpdatedTodoResult}/>
        {/each}
    </div>
{/if}