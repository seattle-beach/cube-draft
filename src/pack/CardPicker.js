import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {UntapClientShape} from "../untap/Client"
import {PackWithCards} from "../pack/Pack"

export class CardPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errorMessage: "",
            selectedCard: undefined,
            draftCard: false
        }
    }

    componentDidMount() {
        this.draftSelectedCard()
    }

    componentDidUpdate() {
        if (this.state.draftCard) {
            this.draftSelectedCard()
        }
    }

    draftSelectedCard() {
        if (this.state.selectedCard !== undefined && this.state.draftCard) {
            this.setState({loading: true, draftCard: false});

            this.props.untapClient.pickCard(
                this.props.username,
                this.state.selectedCard.id
            ).then(() => {
                this.setState({loading: false, selectedCard: undefined});

                if (this.props.onPickCompleted) {
                    this.props.onPickCompleted()
                }

            }, (error) => {
                this.setState({errorMessage: error.message});
            })
        }
    }

    render() {
        if (this.state.errorMessage.length > 0) {
            return <p>{this.state.errorMessage}</p>
        } else if (this.state.loading) {
            return <p>Loading...</p>
        } else {
            return (
                <React.Fragment>
                    <PackWithCards
                        untapClient={this.props.untapClient}
                        username={this.props.username}
                        onCardClick={(card) => this.setState({selectedCard: card})}
                    />

                    <button
                        data-cy="draft-selected-card"
                        disabled={this.state.selectedCard === undefined}
                        onClick={() => this.setState({draftCard: true})}
                    >
                        Draft selected card
                    </button>
                </React.Fragment>
            )
        }
    }
}

CardPicker.propTypes = {
    untapClient: UntapClientShape.isRequired,
    username: PropTypes.string.isRequired,
    onPickCompleted: PropTypes.func
};