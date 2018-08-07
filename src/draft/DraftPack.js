import React, {Component} from "react"
import "./Draft.css"
import {withCards} from "../pack/WithCards"
import {Pack} from "../pack/Pack"
import PropTypes from 'prop-types';
import {CardShape} from '../untap/Card'
import {UntapClientShape} from "../untap/Client"

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
            this.props.untapClient.pickCard(
                this.props.username,
                this.state.selectedCard.id
            )
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
            <div>
                <Pack
                    onCardClick={(card) => this.setState({selectedCard: card})}
                    cards={this.props.cards}
                />
                
                <button data-cy="draft-selected-card" onClick={() => this.draftSelectedCard()}>Draft selected card</button>
                {this.maybeSelectedCard()}
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