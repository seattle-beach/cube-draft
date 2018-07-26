import React from "react"
import "./Draft.css"

export const Draft = (props) => {
    const paramsFromRoutePath = props.match.params
    return (
        <div className="Draft">
            <p className="Draft-greeting">
                Hello {paramsFromRoutePath.username}
            </p>
            waiting for draft to start
        </div>
    )
}