import React from 'react';
import { Box, Icon, Text } from '@chakra-ui/core';

function EmptyState() {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <Icon />
      <Text color='#858ba2'>
        You haven't scheduled any posts yet. <br />
        Schedule one to get started with Herm
      </Text>
    </Box>
  );
}

export default EmptyState;
