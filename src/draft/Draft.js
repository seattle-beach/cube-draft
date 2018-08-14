import React, {Component} from "react"
import PropTypes from "prop-types"
import "./Draft.css"
import { DraftPack } from "./DraftPack";

export class Draft extends Component {

    render() {
        const paramsFromRoutePath = this.props.match.params
        return (
            <div className="Draft">
                <p className="Draft-greeting">
                    Hello {paramsFromRoutePath.username}
                </p>    
                waiting for draft to start

                <DraftPack
                    username={paramsFromRoutePath.username}
                    untapClient={this.props.untapClient}
                />
            </div>
        )
    }
}

Draft.propTypes = {
    untapClient: PropTypes.object.isRequired,
};