import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {CardShape} from '../untap/Card'
import {UntapClientShape} from "../untap/Client"

export class CardPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            errorMessage: ""
        }
    }

    componentDidMount(){
        this.draftSelectedCard()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedCard !== this.props.selectedCard) {
            this.draftSelectedCard()
        }
    }

    draftSelectedCard() {
        if(this.props.selectedCard !== undefined) {
            this.setState({loading: true})

            this.props.untapClient.pickCard(
                this.props.username,
                this.props.selectedCard.id
            ).catch(reason => {
                this.setState({errorMessage: reason.message});
            })
        }
    }

    render() {
        if (this.state.errorMessage.length > 0){
            return <p>{this.state.errorMessage}</p>
        } else if (this.state.loading) {
            return <p>Loading...</p>
        } else {
            return <React.Fragment>{this.props.children}</React.Fragment>
        }
    }
}

CardPicker.propTypes = {
    selectedCard: CardShape,
    untapClient: UntapClientShape.isRequired,
    username: PropTypes.string.isRequired,
}
