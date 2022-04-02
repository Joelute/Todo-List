import type { RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";


export const get: RequestHandler = (request) => {
    return api(request, {
        uid: request.headers.user
    });
}

export const post: RequestHandler<{}, FormData> = (request) => {
    return api(request, {
        created_at: new Date(),
        content: request.body.get("text"),
        done: false,
        uid: request.body.get("user")
    });
}