import React from 'react';
import { enGB } from 'date-fns/locale';
import { DatePickerCalendar } from 'react-nice-dates';
import { Flex, Select, Box, Button } from '@chakra-ui/core';

import { generateValues } from 'lib';

const CalendarModal = ({ date, setDate, time, setTime, close }) => {
  const minutes = generateValues(60);
  const hours = generateValues(24);

  return (
    <Box
      position='absolute'
      background='white'
      zIndex='1'
      top='80%'
      right='-2%'
      padding='15px'
      boxShadow=' 0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      minWidth='400px'
      borderRadius='4px'
    >
      <Box marginBottom='15px'>
        <DatePickerCalendar date={date} onDateChange={setDate} locale={enGB} />
      </Box>

      <Flex margin='13px 0' justifyContent='space-between'>
        <Select
          placeholder='Select hour'
          width='49%'
          value={time.hours}
          onChange={(e) => setTime({ ...time, hours: e.target.value })}
        >
          {hours.map((hour) => (
            <option value={hour}>{hour}</option>
          ))}
        </Select>
        <Select
          placeholder='Select Minute'
          width='49%'
          value={time.minutes}
          onChange={(e) => setTime({ ...time, minutes: e.target.value })}
        >
          {minutes.map((minute) => (
            <option value={minute}>{minute}</option>
          ))}
        </Select>
      </Flex>

      <Flex justify='flex-end'>
        <Button variantColor='pink' onClick={() => close(false)}>
          Done
        </Button>
      </Flex>
    </Box>
  );
};

export default CalendarModal;
