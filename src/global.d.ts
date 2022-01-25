/// <reference types="@sveltejs/kit" />
type Todo = {
    id: string;
    created_at: Date;
    content: string;
    done: boolean;
    uid: string;
}