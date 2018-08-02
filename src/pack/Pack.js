import React from 'react';
import "./Pack.css"

export const Pack = (props) => {
    return (
        <div className="Pack">
            {props.cards.map(function(card, index) {
                return <img data-cy="card" className="Pack-card" key={index} src={card.image} alt={card.name} />
            })}
        </div>
    )
}