import React, {Component} from "react"
import "./Draft.css"
import {PackProvider} from "../pack/PackProvider"
import PropTypes from 'prop-types';

export class Draft extends Component {
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
        const paramsFromRoutePath = this.props.match.params
        return (
            <div className="Draft">
                <p className="Draft-greeting">
                    Hello {paramsFromRoutePath.username}
                </p>
                waiting for draft to start

                <PackProvider
                    username={paramsFromRoutePath.username}
                    untapClient={this.props.untapClient}
                    onCardClick={(card) => this.setState({selectedCard: card})}
                />

                <button data-cy="draft-selected-card" onClick={() => this.draftSelectedCard()}>Draft selected card</button>
                {this.maybeSelectedCard()}
            </div>
        )
    }
}

Draft.propTypes = {
    untapClient: PropTypes.object.isRequired,
};