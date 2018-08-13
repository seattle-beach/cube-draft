import React, {Component} from "react"
import "./Draft.css"
import {withCards} from "../pack/WithCards"
import {Pack} from "../pack/Pack"
import PropTypes from 'prop-types';
import {CardShape} from '../untap/Card'
import {UntapClientShape} from "../untap/Client"
import {CardPicker} from "../pack/CardPicker"
import {DraftedCards} from "../pack/DraftedCards"

export class DraftPack extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedCard: undefined,
            draftCard: false
        }
    }

    draftSelectedCard() {
        if(this.state.selectedCard) {
            this.setState({draftCard: true})
        }
    }

    maybeSelectedCard() {
        if (this.state.selectedCard && this.state.draftCard) {
            return <p data-cy="drafted-card">{this.state.selectedCard.name}</p>
        }
        return null;
    }

    render() {
        return (
            <div className="DraftPack">
                <CardPicker
                    untapClient={this.props.untapClient}
                    username={this.props.username}
                    selectedCard={this.state.draftCard ? this.state.selectedCard : undefined}
                >
                    <Pack
                        onCardClick={(card) => this.setState({selectedCard: card})}
                        cards={this.props.cards}
                    />
                </CardPicker>

                <button
                    data-cy="draft-selected-card"
                    disabled={this.state.selectedCard === undefined}
                    onClick={() => this.draftSelectedCard()}
                >
                    Draft selected card
                </button>

                {this.maybeSelectedCard()}

                <DraftedCards
                    untapClient={this.props.untapClient}
                    username={this.props.username}
                />
            </div>
        )
    }
}

DraftPack.propTypes = {
    cards: PropTypes.arrayOf(CardShape).isRequired,
    untapClient: UntapClientShape.isRequired,
    username: PropTypes.string.isRequired,
}

export const DraftPackWithCards = withCards(DraftPack)