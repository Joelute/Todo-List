const DISCORD_URL = import.meta.env.VITE_DISCORD_URL;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */

export async function get() {
	return {
        headers: { Location: DISCORD_URL },
        status: 302
  }
}