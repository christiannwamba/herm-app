import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export const ALL_ACCOUNTS_QUERY = gql`
  query AllAccountsQuery {
    account {
      account_name
    }
  }
`;

const Account = () => {
  const { loading, error, data } = useQuery(ALL_ACCOUNTS_QUERY);

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  if (loading) return <div>Loading</div>;

  if (data.account.length < 1) return <div>Your query was successful but no account was found.</div>;

  return (
    <div>
      {data.account.map(account => (
        <div>{account.account_name}</div>
      ))}
    </div>
  );
};

export default Account;