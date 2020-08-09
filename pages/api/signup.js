import auth0 from 'lib/auth0';

export default auth0.requireAuthentication(async function signup(req, res) {
  try {
    const client = createClient(req, res);

    await checkAndRegisterUser(client);

    res.writeHead(302, { Location: '/' });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
});

async function checkAndRegisterUser(client) {
  const CHECK_USER_QUERY = `
      mutation CheckAndRegisterUser {
        checkAndRegisterUser {
          affected_rows
        }
      }
    `;

  const result = await client(CHECK_USER_QUERY, {});
  console.log(result);
  return result;
}

function createClient(req, res) {
  async function client(query, variables) {
    const tokenCache = await auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken({
      scope: ['openid', 'profile'],
    });
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
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
  return client;
}
