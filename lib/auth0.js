import { initAuth0 } from '@auth0/nextjs-auth0';
import config from './config';

export default initAuth0({
  domain: config.auth0.domain,
  clientId: config.auth0.clientId,
  clientSecret: config.auth0.clientSecret,
  scope: 'openid profile',
  audience: 'https://api.hermauth.com',
  redirectUri: config.auth0.redirectUrl,
  postLogoutRedirectUri: config.baseUrl,
  session: {
    // Use a strong secret to protect your cookie
    cookieSecret: config.auth0.cookieSecret,
    // Set cookie valid life time to one day
    cookieLifetime: 60 * 60 * 24,
    // Make sure requesting domain and cookie domain are the same
    cookieSameSite: 'lax',
    // Store user credentials in session cookie
    storeIdToken: true,
    storeAccessToken: true,
    storeRefreshToken: true
  }
});
