import React, {Component} from "react"
import "./Draft.css"
import {withCards} from "../pack/WithCards"
import {Pack} from "../pack/Pack"
import PropTypes from 'prop-types';
import {CardShape} from '../untap/Card'
import {UntapClientShape} from "../untap/Client"
import {CardPickerWithUntapData} from "./CardPicker"

export class DraftPack extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedCard: undefined,
            draftCard: false
        }
    }

    render() {
        return (
            <div>
                <Pack
                    onCardClick={(card) => this.setState({selectedCard: card})}
                    cards={this.props.cards}
                />
                
                <CardPickerWithUntapData
                    selectedCard={this.state.selectedCard}
                    username={this.props.username}





                    
                    untapClient={this.props.untapClient}
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