import React from 'react';
import "./Pack.css"
import PropTypes from 'prop-types';

export const Pack = (props) => {
    return (
        <div className="Pack">
            {props.cards.map(function(card, index) {
                return <img data-cy="card" className="Pack-card" key={index} src={card.image} alt={card.name} />
            })}
        </div>
    )
}

Pack.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired
};