/**
 * Decap CMS <-> GitHub OAuth proxy, for Cloudflare Workers.
 *
 * WHY THIS EXISTS:
 * Decap CMS's "github" backend needs to exchange a GitHub OAuth "code" for
 * an access token. That exchange requires your GitHub OAuth App's Client
 * Secret, which must never be shipped to the browser. Since GitHub Pages
 * only serves static files (no server-side code), this tiny Worker is the
 * one piece that can't be "pure static" — everything else (the site, the
 * CMS UI) stays 100% static on GitHub Pages. This Worker is free to run on
 * Cloudflare's free tier and needs no VPS.
 *
 * SETUP:
 * 1. Create a GitHub OAuth App at https://github.com/settings/developers
 *      Homepage URL:               https://mobinahmadikya80-wq.github.io/auralis/
 *      Authorization callback URL: https://<your-worker-subdomain>.workers.dev/callback
 * 2. Deploy this file as a new Cloudflare Worker (Workers & Pages -> Create -> paste this code).
 * 3. In the Worker's Settings -> Variables, add two SECRET variables:
 *      GITHUB_CLIENT_ID     = (from the GitHub OAuth App)
 *      GITHUB_CLIENT_SECRET = (from the GitHub OAuth App)
 * 4. Copy the Worker's real URL (shown after deploy, e.g.
 *    auralis-decap-oauth.yourname.workers.dev) and put it into
 *    public/admin/config.yml as `base_url`.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth') {
      const redirectUri = `${url.origin}/callback`;
      const authUrl = new URL('https://github.com/login/oauth/authorize');
      authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('scope', 'repo,user');
      authUrl.searchParams.set('state', crypto.randomUUID());
      return Response.redirect(authUrl.toString(), 302);
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) {
        return new Response('Missing "code" parameter from GitHub.', { status: 400 });
      }

      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        return new Response(
          `GitHub OAuth error: ${tokenData.error_description || tokenData.error}`,
          { status: 400 },
        );
      }

      const payload = JSON.stringify({ token: tokenData.access_token, provider: 'github' });

      // This handshake script is what Decap CMS's popup window expects.
      const html = `<!DOCTYPE html><html><body>
<script>
  (function() {
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:success:${payload}',
        e.origin
      );
      window.removeEventListener("message", receiveMessage, false);
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })();
</script>
</body></html>`;

      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }

    return new Response('Not found', { status: 404 });
  },
};
