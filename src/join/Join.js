import React from "react"

export const Join = () => (
    <form action="/draft" type="GET">
        <label htmlFor="username">Enter username:</label>
        <input name="username" />
        <button type="submit">Join</button>
    </form>
)