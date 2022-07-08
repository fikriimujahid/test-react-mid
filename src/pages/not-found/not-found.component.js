import React from 'react';
import { Image, NotFoundContainer } from './not-found.style';

const NotFound = () => (
  <NotFoundContainer><Image src='/Images/404.png' alt='item' /> </NotFoundContainer>
);

export default NotFound;