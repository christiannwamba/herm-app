import React from 'react';
import { Box, Flex, Icon, Avatar, Text, Link } from '@chakra-ui/core';

function Header({ me }) {
  return (
    <Box backgroundColor='#fafafb' padding="10px 50px">
      <Flex alignItems='center' justifyContent='space-between' height='50px'>
        <Box bg='gray.200' rounded='full'>
          <Icon
            name='logo'
            color='brand.500'
            width='40px'
            height='40px'
            viewBox='0 0 40 40'
          ></Icon>
        </Box>
        <Flex alignItems='center' justifyContent='space-between'>
          <User
            username={me.name}
            // sub="Scheduled for 16th December at 09:30 AM"
          ></User>
          <Link href='/api/logout' ml='15px'>
            Logout
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

function User({ avatar, sub, username }) {
  return (
    <Flex alignItems='center'>
      <Box>
        <Avatar size='sm' name={username} src={avatar} />
      </Box>
      {username && (
        <Box marginLeft='12px'>
          <Text fontWeight='bold'>{username}</Text>
          {sub && <Text fontSize='12px'>{sub}</Text>}
        </Box>
      )}
    </Flex>
  );
}

export default Header;
