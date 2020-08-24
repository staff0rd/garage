import React from 'react';
import ReactCountdown, { CountdownRenderProps } from 'react-countdown';

type CountdownProps = {
  date: number;
};

export const Countdown = (props: CountdownProps) => {
  const {
      date
  } = props;
  const countdownRenderer = ({ minutes, seconds }: CountdownRenderProps) => (
    <span>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
  );

  return (
    <ReactCountdown date={date} renderer={countdownRenderer} />
  );
};

