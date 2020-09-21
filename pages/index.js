import { Box, Text, CircularProgress, Flex } from '@chakra-ui/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import fetch from 'node-fetch';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import ScheduleTweetForm from '../components/SchedulePostForm';

import withApollo from 'lib/apollo';

function Index({ me }) {
  const USER_QUERY = gql`
    {
      user {
        id
        username
        scheduled_posts(order_by: { created_at: desc }) {
          id
          is_pending
          schedule_for
          text
          user_id
        }
      }
    }
  `;
  const { data, loading, refetch } = useQuery(USER_QUERY);
  const [user] = data && data.user ? data.user : [{}];

  return (
    <Layout me={me}>
      <Box width='70%'>
        <Box marginBottom='40px' width='100%'>
          <ScheduleTweetForm me={me} user={user} refetch={refetch} />
        </Box>
        <Box marginBottom='40px' width='100%'>
          <Text
            fontSize='18px'
            color='#1D1D1D'
            fontWeight='bold'
            lineHeight='25px'
          >
            Scheduled Posts
          </Text>
          {loading ? (
            <Flex justifyContent='center' padding='50px 0'>
              <CircularProgress isIndeterminate color='pink'></CircularProgress>
            </Flex>
          ) : (
            <Box marginTop='19px'>
              {user &&
                user.scheduled_posts &&
                user.scheduled_posts.map((post) => (
                  <PostCard me={me} post={post} key={post.id} />
                ))}
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
}

Index.getInitialProps = async function (context) {
  const res = await fetch(`${process.env.BASE_URL}/api/me`, {
    headers: {
      cookie: context.req.headers.cookie,
    },
  });

  const me = await res.json();

  if (me.error) {
    context.res.writeHead(302, {
      Location: '/api/login',
    });
    context.res.end();
    return;
  }

  return { me };
};

export default withApollo(Index);
