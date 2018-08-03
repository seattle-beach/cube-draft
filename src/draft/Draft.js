import React from "react"
import "./Draft.css"
import {PackProvider} from "../pack/PackProvider"
import PropTypes from 'prop-types';

export const Draft = (props) => {
    const paramsFromRoutePath = props.match.params
    return (
        <div className="Draft">
            <p className="Draft-greeting">
                Hello {paramsFromRoutePath.username}
            </p>
            waiting for draft to start


            <PackProvider
                username={paramsFromRoutePath.username}
                untapClient={props.untapClient}
            />
        </div>
    )
}

Draft.propTypes = {
    untapClient: PropTypes.object.isRequired,
};