import React, {Component} from "react"
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';

export class Join extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            submitted: false,
            error: false
        }
    }

    join() {
        this.props.untapClient.createDrafter(this.state.username)
            .then(() => {
                this.setState({submitted: true})
            }, (err) => {
                this.setState({error: true})
            }
        )
    }

    joinIfEnter(key){
        if (key === "Enter") {
            this.join()
        }
    }

    updateUsername(username) {
        this.setState({username: username})
    }

    render() {
        if (this.state.error) {
            return <div>Draft registration failed</div>
        } else if (!this.state.submitted) {
            return (
                <div>
                    <label htmlFor="username">Enter username:</label>
                    <input
                        name="username"
                        onChange={(event) => this.updateUsername(event.target.value)}
                        onKeyPress={(event) => this.joinIfEnter(event.key)}
                    />
                    <button onClick={() => this.join()}>Join</button>
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

Join.propTypes = {
    untapClient: PropTypes.object.isRequired
};