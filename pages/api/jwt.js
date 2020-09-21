import auth0 from 'lib/auth0';

export default async function me(req, res) {
  try {
    const tokenCache = await auth0.tokenCache(req, res);
    console.log(tokenCache.getAccessToken());
    const sessionData = await auth0.getSession(req);
    res.send(sessionData.accessToken);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).json({ error: 'Something went wrong' });
  }
}
