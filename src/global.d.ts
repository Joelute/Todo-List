/// <reference types="@sveltejs/kit" />
type Todo = {
    created_at: Date;
    content: string;
    done: boolean;
}