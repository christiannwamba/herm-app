import React from 'react';
import { Box, Flex } from '@chakra-ui/core';

import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';

function Layout({ children, me }) {
  return (
    <Box>
      <Header me={me}></Header>
      <Flex>
        <Sidebar></Sidebar>
        <Main>{children}</Main>
      </Flex>
    </Box>
  );
}

export default Layout;