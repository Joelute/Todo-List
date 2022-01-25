const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_SECRET = import.meta.env.VITE_DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI;
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */

export async function get({query}) {
    const returnCode = query.get('code');
    console.log('returnCode =>', returnCode);

    const dataObject = {
        client_id: DISCORD_CLIENT_ID as string,
        client_secret: DISCORD_SECRET as string,
        grant_type: 'authorization_code',
        redirect_uri: DISCORD_REDIRECT_URI as string,
        code: returnCode,
        scope: 'identify email guilds'
    };

    const request = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams(dataObject),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' 
        }
    });

    const response = await request.json();

    if (response.error) {
        console.log('redirect to / due error');
        return {
        headers: { Location: '/' },
        status: 302
        }
    }

    const access_token_expires_in = new Date(Date.now() + response.expires_in);
    const refresh_token_expires_in = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    return {
        headers: {
            'set-cookie': [
                `disco_access_token=${response.access_token}; Path=/; HttpOnly; SameSite=Strict; Expires=${access_token_expires_in}}`,
                `disco_refresh_token=${response.refresh_token}; Path=/; HttpOnly; SameSite=Strict; Expires=${refresh_token_expires_in}`,
            ],
            Location: '/'
        },
        status: 302
    }
}

