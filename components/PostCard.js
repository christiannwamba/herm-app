import React from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/core';
import { FaTrash, FaShare } from 'react-icons/fa';
import { formatDate } from 'lib';

const ButtonSubText = ({ children }) => (
  <Text marginLeft='10px' color='#364067' letterSpacing='0.1px' fontSize='14px'>
    {children}
  </Text>
);

const PostCard = ({ me, post }) => {
  return (
    <Box
      width='100%'
      paddingTop='20px'
      paddingBottom='20px'
      paddingLeft='20px'
      paddingRight='20px'
      borderColor='#E2E2EA'
      borderWidth='0.5px'
      borderRadius='10px'
      borderStyle='solid'
      marginBottom='15px'
    >
      <Flex>
        <Box marginRight='5px'>
          <img
            style={{ width: '90%', display: 'block', borderRadius: '50%' }}
            src={me.picture}
            alt={me.name}
          />{' '}
        </Box>
        <Box>
          <Text fontWeight='bold' fontSize='15px' marginBottom='4px'>
            {me.name}
          </Text>
          <Text fontSize='13px' color='#364067'>
            Scheduled for {formatDate(post.schedule_for)}
          </Text>
        </Box>
      </Flex>

      <Box marginTop='20px'>
        <Text fontSize='16px' color='#858ba2'>
          {post.text}
        </Text>
      </Box>

      <Flex justifyContent='flex-end' width='100%' marginTop='10px'>
        <Box marginRight='20px'>
          <Button>
            <Flex alignItems='center' justifyContent='space-between'>
              <FaShare size='22px' color='#92929D' />{' '}
              <ButtonSubText>Share Post</ButtonSubText>
            </Flex>
          </Button>
        </Box>

        <Button>
          <Flex alignItems='center' justifyContent='space-between'>
            <FaTrash size='22px' color='#92929D' />{' '}
            <ButtonSubText>Delete</ButtonSubText>
          </Flex>
        </Button>
      </Flex>
    </Box>
  );
};

export default PostCard;
