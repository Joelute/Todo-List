/// <reference types="@sveltejs/kit" />
type Todo = {
    id: string;
    created_at: Date;
    content: string;
    done: boolean;
    uid: string;
}

interface ImportMetaEnv {
    VITE_DISCORD_URL: string;
}