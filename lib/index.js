import { formatRelative } from 'date-fns';

export const generateValues = (start) =>
  Array.from(Array(start).keys()).map((val) => (val < 10 ? `0${val}` : val));

export const getCurrentTime = () => {
  const time = new Date();
  const minutes =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  const hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();

  return { minutes, hours };
};

export const formatDate = (date) => {
  const today = new Date();
  const scheduleDate = new Date(date);
  return formatRelative(scheduleDate, today);
};
