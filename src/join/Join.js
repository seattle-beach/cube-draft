import React, {Component} from "react"
import {Redirect} from 'react-router-dom'

export class Join extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            submitted: false
        }
    }

    joinClick() {
        this.setState({submitted: true})
    }

    updateUsername(username) {
        this.setState({username: username})
    }

    render() {
        if (!this.state.submitted) {
            return (
                <div>
                    <label htmlFor="username">Enter username:</label>
                    <input name="username" onChange={
                        (event) => this.updateUsername(event.target.value)
                    }/>
                    <button onClick={() => this.joinClick()}>Join</button>
                </div>
            )
        } else {
            return (
                <Redirect
                    to={{
                        pathname: "/draft/" + this.state.username,
                    }}
                />
            )
        }
    }
}