import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Box, Heading } from 'rebass'

const PlayMat = () => (
  <Droppable droppableId="playmat">
    {(provided) => (
      <Box
        ref={provided.innerRef}
        {...provided.droppableProps}
        sx={{
          background: 'brown',
          width: '100%',
          height: '100%',
          border: '2px solid #000',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Heading as="h2" color="white">Virtual Play Mat</Heading>
        {provided.placeholder}
      </Box>
    )}
  </Droppable>
)

export default PlayMat
