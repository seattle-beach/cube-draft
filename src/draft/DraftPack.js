import React, {Component} from "react"
import "./Draft.css"
import PropTypes from 'prop-types';
import {UntapClientShape} from "../untap/Client"
import {CardPicker} from "../pack/CardPicker"
import {DraftedCards} from "../pack/DraftedCards"

export class DraftPack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickCompleteToggle: false
        }
    }

    render() {
        return (
            <div className="DraftPack">
                <CardPicker
                    untapClient={this.props.untapClient}
                    username={this.props.username}
                    onPickCompleted={() => this.setState({pickCompleteToggle: !this.state.pickCompleteToggle})}
                />

                <DraftedCards
                    untapClient={this.props.untapClient}
                    username={this.props.username}
                    triggerToggle={this.state.pickCompleteToggle}
                />
            </div>
        )
    }
}

DraftPack.propTypes = {
    untapClient: UntapClientShape.isRequired,
    username: PropTypes.string.isRequired,
};