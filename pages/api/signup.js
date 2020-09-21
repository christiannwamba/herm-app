import auth0 from 'lib/auth0';
import createClient from 'lib/client';

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
