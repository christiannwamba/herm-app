import React, { useState } from 'react';
import fetch from 'node-fetch';
import { Box, Text, Flex, Textarea, Button } from '@chakra-ui/core';
import { FaCalendar } from 'react-icons/fa';
import CalendarModal from './CalendarModal';
import { getCurrentTime } from 'lib';

const ScheduleTweetForm = ({ me, user, refetch }) => {
  const { minutes, hours } = getCurrentTime();
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState({ minutes, hours });
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setText('');
    setDate(new Date());
    setTime({ minutes, hours });
    setLoading(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const scheduleTime = new Date(
      new Date(date).setHours(time.hours, time.minutes, 0)
    );
    const data = {
      text,
      schedule_for: scheduleTime,
      user_id: user.id,
    };

    const result = await fetch(`${process.env.BASE_URL}/api/createPost`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    refetch();
    reset();
  };

  return (
    <Box
      borderColor='#E2E2EA'
      borderWidth='0.5px'
      borderRadius='10px'
      borderStyle='solid'
      paddingTop='10px'
      paddingBottom='10px'
      paddingLeft='20px'
      paddingRight='20px'
    >
      <Box
        borderBottom='0.5px solid #E2E2EA'
        paddingBottom='10px'
        marginBottom='11px'
      >
        <Text
          fontSize='15px'
          color='#1D1D1D'
          letterSpacing='0.1px'
          fontWeight='bold'
        >
          Schedule Tweet
        </Text>
      </Box>

      <Box padding='10px 0' position='relative'>
        <form onSubmit={onSubmit}>
          <Flex justifyContent='space-between'>
            <Box width='5%'>
              <img
                style={{ width: '90%', display: 'block', borderRadius: '50%' }}
                src={me.picture}
                alt={me.name}
              />
            </Box>

            <Textarea
              width='89.7%'
              type='text'
              value={text}
              border='none'
              placeholder='What would you like schedule?'
              onChange={(e) => setText(e.target.value)}
            />
            {showCalendar && (
              <CalendarModal
                date={date}
                time={time}
                setTime={setTime}
                setDate={setDate}
                close={setShowCalendar}
              />
            )}
            <Box width='5%' alignSelf='flex-end'>
              <Button
                type='button'
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <FaCalendar size='23px' color='#92929D' />
              </Button>
            </Box>
          </Flex>
          <Flex marginTop='16px' marginLeft='5%'>
            <Button
              isLoading={loading}
              loadingText='Submitting'
              type='submit'
              variantColor='pink'
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default ScheduleTweetForm;
