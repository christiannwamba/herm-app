import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import withApollo from 'next-with-apollo';

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      link: new HttpLink({
        uri: `${process.env.BASE_URL}/api/graphql`,
        credentials: 'same-origin'
      }),
      cache: new InMemoryCache().restore(initialState || {})
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);