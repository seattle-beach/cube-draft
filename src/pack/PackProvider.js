import React, {Component} from "react"
import { Pack } from "./Pack"

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
        this.props.untapClient.getPack().then((cards) => {
            this.setState({cards: cards, loading: false});
        }, (err) => {
            this.setState({error: true, loading: false})
        })
    }

    render() {
        console.log(this.state)
        if (this.state.loading) {
            return <p>Loading...</p>
        } else if (this.state.error === true) {
            return <p>Unable to load Pack</p>
        } else {
            return <Pack cards={this.state.cards} />
        }
    }
  }