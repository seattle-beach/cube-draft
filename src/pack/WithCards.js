import React, {Component} from "react"
import {UntapClientShape} from "../untap/Client"
import PropTypes from 'prop-types';

export const withCards = (WrappedComponent) => {
    const wrapped = class extends Component {
        constructor(props) {
            super(props)
            this.state = {
                cards: [],
                loading: true,
                error: false,
            }
        }
        
        componentDidMount() {
            this.props.untapClient.getPack(this.props.username).then((cards) => {
                this.setState({cards: cards, loading: false});
            }, (err) => {
                this.setState({error: true, loading: false})
            })
        }

        render() {
            if (this.state.loading) {
                return <p>Loading...</p>
            } else if (this.state.error) {
                return <p>Unable to load Pack</p>
            } else {
                return <WrappedComponent cards={this.state.cards} {...this.props} />
            }
        }
    }

    wrapped.propTypes = {
        untapClient: UntapClientShape.isRequired,
        username: PropTypes.string.isRequired,
    }

    return wrapped
}
