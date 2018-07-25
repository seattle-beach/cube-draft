import React from 'react';

export const Pack = (props) => {
    console.log("PACK PROPS")
    console.log(props)
    return (
        <div>
            {props.cards.map(function(card, index) {
                return <img key={index} src={card.image} alt={card.name} />
            })}
        </div>
    )
}