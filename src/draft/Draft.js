import React from "react"

export const Draft = (props) => {
    const paramsFromRoutePath = props.match.params
    return <p>Hello {paramsFromRoutePath.username}</p>
}