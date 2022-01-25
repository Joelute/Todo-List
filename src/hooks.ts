//No problems in this file

import type { Handle } from "@sveltejs/kit";
import type { GetSession } from "@sveltejs/kit";
import cookie from 'cookie';
const DISCORD_API = import.meta.env.VITE_DISCORD_API;
const HOST = import.meta.env.VITE_HOST

export const handle: Handle = async ({request, resolve}) => {
    if (request.query.has("_method")) {
        request.method = request.query.get("_method").toUpperCase();
    }

    const response =  await resolve(request);
    return response;
    
};

export const getSession: GetSession = async (request) => {
    const cookies = cookie.parse(request.headers.cookie || "");

    if (cookies.disco_refresh_token && !cookies.disco_access_token) {
        const discord_request = await fetch(`${HOST}/api/refresh?code=${cookies.disco_refresh_token}`);

        const discord_response = await discord_request.json();
        
        if (discord_response.disco_access_token) {
            console.log('setting discord user via refresh token..')
            const request = await fetch(`${DISCORD_API}/users/@me`, {
                headers: { 'Authorization': `Bearer ${discord_response.disco_access_token}` }
            });
            const response = await request.json();

            if (response.id){
                return{
                    user: {
                        ...response
                    }
                }
            }
        }
    }

    if (cookies.disco_access_token) {
        console.log('setting discord user via access token...')
        const request = await fetch(`${DISCORD_API}/users/@me`, {
            headers: { 'Authorization': `Bearer ${cookies.disco_access_token}` }
        });
        const response = await request.json();

        if (response.id){
            return{
                user: {
                    ...response
                }
            }
        }
    }

    return {
        user: false
    }
}