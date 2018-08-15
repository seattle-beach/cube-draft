import React, {Component} from "react"
import {UntapClientShape} from "../untap/Client"
import PropTypes from 'prop-types';

export class DraftedCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickedCards: [],
            loading: true,
            error: false,
        }
    }

    componentDidMount() {
        this.loadPickedCards();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.triggerToggle !== this.props.triggerToggle) {
            this.loadPickedCards();
        }
    }

    loadPickedCards() {
        this.props.untapClient.pickedCards(this.props.username).then((cards) => {
            this.setState({pickedCards: cards, loading: false});
        }, () => {
            this.setState({error: true, loading: false});
        })
    }

    render() {
        if (this.state.loading) {
            return <p>Loading picked cards...</p>
        } else if (this.state.error === true) {
            return <p>Unable to load picked cards</p>
        } else {
            return (
                <ul>
                    {this.state.pickedCards.map((card, i) =>
                        <li key={i} data-cy="drafted-card">{card.name}</li>)
                    }
                </ul>
            )
        }
    }
}

DraftedCards.propTypes = {
    untapClient: UntapClientShape.isRequired,
    username: PropTypes.string.isRequired,
    triggerToggle: PropTypes.bool.isRequired
};
