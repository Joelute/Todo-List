import type { RequestHandler } from "@sveltejs/kit";
import { api } from "./_api"


export const get: RequestHandler = (request) => {
    return api(request, {
            uid: request.headers.user
        });
}

export const post: RequestHandler<{}, FormData> = (request) => {
    
    return api(request, {
        content: request.body.get("diary"),
        date: new Date(request.body.get("date")),
        uid: request.body.get("user")
    });
}
