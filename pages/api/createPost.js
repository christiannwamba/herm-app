import createClient from 'lib/client';
import fetch from 'node-fetch';

export default async function (req, res) {
  try {
    const client = createClient(req, res);
    const result = await createPost(client, req.body);

    schedulePost(client, result.data.insert_scheduled_post_one);
    res.send(result.data);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}

async function createPost(client, body) {
  const CREATE_POST_QUERY = `
        mutation CreatePost($input: scheduled_post_insert_input!) {
          insert_scheduled_post_one(object: $input) {
            id
            text
            schedule_for
            is_pending
            user_id
          }
        }
    `;
  const result = await client(CREATE_POST_QUERY, {
    input: JSON.parse(body),
  });
  return result;
}

const createEventHeaders = async (client, userId) => {
  const query = `
  {
    account_user(where: {user_id: {_eq: ${userId}}}) {
      account {
        access_token
        access_token_secret
      }
    }
  }
  `;
  const res = await makeRequest(`${process.env.APP_BASE_API}/v1/graphql`, {
    query,
  });
  const { account_user } = res.data;
  const {
    account: { access_token, access_token_secret },
  } = account_user[0];

  return [
    { name: 'access_token_key', value: access_token },
    { name: 'access_token_secret', value: access_token_secret },
  ];
};

const schedulePost = async (client, post) => {
  const headers = await createEventHeaders(client, post.user_id);
  const data = {
    type: 'create_scheduled_event',
    args: {
      webhook: 'http://host.docker.internal:7071/api/postTweet',
      schedule_at: post.schedule_for,
      payload: post,
      headers,
    },
  };
  return makeRequest(`${process.env.APP_BASE_API}/v1/query`, data);
};

const makeRequest = async (url, body) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res.json();
};
