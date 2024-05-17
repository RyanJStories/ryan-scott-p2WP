import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import Card from './card'

const CardList = ({ cards, onCardClick }) => {
  const handleClick = (card) => {
    if (onCardClick) {
      onCardClick(card);
    }
  }

  return (
    <Droppable droppableId="cards">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} style={{ height: '70vh', overflowY: 'auto' }}>
          {cards.map((card, index) => (
            <Draggable key={card.id} draggableId={card.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Card
                    nameOfCard={card.nameOfCard}
                    imageForCard={card.imageForCard?.file?.url}
                    cardDescription={card.cardDescription?.childMarkdownRemark?.html}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default CardList
