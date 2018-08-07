import React, {Component} from 'react';
import "./Pack.css"
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {CardShape} from '../untap/Card'

export class Pack extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedCard: {name: "", image: ""}
        }
    }

    cardClick(card) {
        this.setState({selectedCard: card})

        if (this.props.onCardClick) {
            this.props.onCardClick(card)
        }
    }

    render() {
        return (
            <div className="Pack">
                {this.props.cards.map((card, index) => {
                    return <img
                        data-cy="card"
                        className={classNames(
                            "Pack-card",
                            {"Pack-card-selected": this.state.selectedCard.name === card.name}
                        )}
                        onClick={() => this.cardClick(card)}
                        key={index}
                        src={card.image}
                        alt={card.name}
                    />
                })}
            </div>
        )
    }
}

Pack.propTypes = {
    cards: PropTypes.arrayOf(CardShape).isRequired,
    onCardClick: PropTypes.func
};