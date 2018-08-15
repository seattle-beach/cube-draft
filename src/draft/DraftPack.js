import React, {Component} from "react"
import "./Draft.css"
import PropTypes from 'prop-types';
import {UntapClientShape} from "../untap/Client"
import {CardPickerWithCards} from "../pack/CardPicker"
import {DraftedCards} from "../pack/DraftedCards"

export class DraftPack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickedCardsTrigger: false
        }
    }

    render() {
        return (
            <div className="DraftPack">
                <CardPickerWithCards
                    untapClient={this.props.untapClient}
                    username={this.props.username}
                    onPickCompleted={() => this.setState({pickedCardsTrigger: !this.state.pickedCardsTrigger})}
                />

                <DraftedCards
                    untapClient={this.props.untapClient}
                    username={this.props.username}
                    triggerToggle={this.state.pickedCardsTrigger}
                />
            </div>
        )
    }
}

DraftPack.propTypes = {
    untapClient: UntapClientShape.isRequired,
    username: PropTypes.string.isRequired,
};