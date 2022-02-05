export async function get(request) {
    console.log("redirected to / with cleared cookies");
    return {
        headers: {
            'set-cookie': [
                `disco_access_token=deleted; Path=/; Max-Age=-1`,
                `disco_refresh_token=deleted; Path=/; Max-Age=-1`,
            ],
            Location: '/'
        },
        status: 302
    }
}