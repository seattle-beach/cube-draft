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
            draftCard: false,
            isLoading: false,
            errorMessage: ""
        }
    }

    draftSelectedCard() {
        if(this.state.selectedCard) {
            this.setState({draftCard: true, isLoading: true})
            this.props.untapClient.pickCard(
                this.props.username,
                this.state.selectedCard.id
            ).catch(reason => {
                this.setState({errorMessage: reason.message});
            })
        }
    }

    maybeSelectedCard() {
        if (this.state.selectedCard && this.state.draftCard) {
            return <p data-cy="drafted-card">{this.state.selectedCard.name}</p>
        }
        return null;
    }

    maybePack(){
        if (this.state.errorMessage.length > 0){
            return <p>{this.state.errorMessage}</p>
        } else if (this.state.isLoading) {
            return <p>Loading...</p>
        } else {
            return <Pack
                onCardClick={(card) => this.setState({selectedCard: card})}
                cards={this.props.cards}
            />
        }
    }

    render() {
        return (
            <div className="DraftPack">
                {this.maybePack()}
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