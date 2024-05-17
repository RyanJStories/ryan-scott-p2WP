import React from 'react';
import { Box, Image, Text, Heading } from 'rebass';

const Card = ({ nameOfCard, imageForCard, stats, cardDescription }) => {
  return (
    <Box p={3} bg='lightgray' borderRadius={8}>
      <Heading>{nameOfCard}</Heading>
      <Image src={imageForCard} alt={nameOfCard} />
      <Text>{stats}</Text>
      <Text>{cardDescription}</Text>
    </Box>
  );
};

export default Card;