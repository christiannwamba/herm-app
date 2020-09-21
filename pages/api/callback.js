import auth0 from 'lib/auth0';

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, { redirectTo: '/api/signup' });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).json({ error: 'Something went wrong' });
  }
}
