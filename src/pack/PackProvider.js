import React, {Component} from "react"
import { Pack } from "./Pack"
import PropTypes from 'prop-types';

export class PackProvider extends Component {
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
        console.log('RENDER PACK PROVIDER')
        if (this.state.loading) {
            return <p>Loading...</p>
        } else if (this.state.error === true) {
            return <p>Unable to load Pack</p>
        } else {
            return <Pack
                onCardClick={this.props.onCardClick}
                cards={this.state.cards}
            />
        }
    }
}

PackProvider.propTypes = {
    username: PropTypes.string.isRequired,
    untapClient: PropTypes.object.isRequired,
    onCardClick: PropTypes.func,
};
