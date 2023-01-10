import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const refHack = {
  current: (() => {}) as NavigateFunction,
};

const NavigationHack: React.FC = () => {
  const nav = useNavigate();
  refHack.current = nav;
  return null;
};

export default NavigationHack;

export function navigate(to: string) {
  refHack.current(to);
}
