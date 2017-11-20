import React from 'react';
import App from './App'
import About from './pages/About'

export default [
  {
    ...App,
    path: '/',
    exact: true
  },
  {
    ...About,
    path: '/about'
  }
];

