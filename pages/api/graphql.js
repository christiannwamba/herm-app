import request from 'request';
import util from 'util';
import auth0 from 'lib/auth0';
import config from 'lib/config';

export default auth0.requireAuthentication(async function graphQL(req, res) {
  try {    
    const tokenCache = await auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken({
      scope: ['openid', 'profile']
    });

    console.log(accessToken)

    const headers = {
      // Attach token to header
      Authorization: `Bearer ${accessToken}`,
      // Set content type to JSON
      'Content-Type': 'application/json'
    };
    const asyncReqPost = util.promisify(request.post);
    // Send request
    const graphQLApiResponse = await asyncReqPost({
      url: `${config.baseAPI}/v1/graphql`,
      headers,
      json: req.body,
      timeout: 5000, // give queries more time to run
      gzip: true
    });
    console.log(graphQLApiResponse.body)
    // Set response header
    res.setHeader('Content-Type', 'application/json');
    // Send response
    res.end(JSON.stringify(graphQLApiResponse.body));

  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
})