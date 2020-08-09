require('dotenv').config()
export default {
  baseUrl: process.env.APP_BASE_URL,
  baseAPI: process.env.APP_BASE_API,
  auth0: {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    cookieSecret: process.env.AUTH0_COOKIE_SECRET,
    redirectUrl: process.env.AUTH0_REDIRECT_URL
  }
};