/// <reference types="@sveltejs/kit" />
type Todo = {
    id: string;
    created_at: Date;
    content: string;
    done: boolean;
    uid: string;
}

type Diaries = {
    id: string;
    content: string;
    date: Date;
    uid: string;
} 

interface ImportMetaEnv {
    VITE_DISCORD_URL: string;
}