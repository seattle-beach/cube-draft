import React, {Component} from "react"
import {withUntapData} from "../untap/WithUntapData"
import { UntapClient } from "../untap/Client";

export class CardPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {draftCard: false}
    }

    draftSelectedCard() {
        if(this.props.selectedCard) {
            this.setState({draftCard: true})
            this.props.runUntapClientCall({
                username: this.props.username,
                cardId: this.props.selectedCard.id
            })
        }
    }

    maybeSelectedCard() {
        if (this.props.selectedCard && this.state.draftCard) {
            return <p data-cy="drafted-card">{this.props.selectedCard.name}</p>
        }
        return null;
    }

    render() {
        if(this.props.loading) {
            return <div>loading...</div>
        }

        return (
            <div>
                <button data-cy="draft-selected-card" onClick={() => this.draftSelectedCard()}>Draft selected card</button>
                {this.maybeSelectedCard()}
            </div>
        )
    }
}

export const CardPickerWithUntapData = withUntapData(
    CardPicker,
    (untapClient, untapArgs) => untapClient.pickCard(untapArgs.username, untapArgs.cardId)
)