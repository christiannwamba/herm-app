import auth0 from 'lib/auth0';

export const generateToken = async (req, res) => {
  const tokenCache = await auth0.tokenCache(req, res);
  const { accessToken } = await tokenCache.getAccessToken({
    scope: ['openid', 'profile'],
  });
  return accessToken;
};

export default function createClient(req, res) {
  async function client(query, variables) {
    const accessToken = await generateToken(req, res);
    try {
      const result = await fetch(`${process.env.APP_BASE_API}/v1/graphql`, {
        method: 'POST',
        body: JSON.stringify({
          query: query,
          variables,
        }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await result.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  return client;
}
