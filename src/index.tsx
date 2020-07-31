import React from 'react';
import { JSBoxProvider } from './store/context';
import JSBox from './JSBox';

export default function() {
  return (
    <JSBoxProvider>
      <JSBox />
    </JSBoxProvider>
  );
}
