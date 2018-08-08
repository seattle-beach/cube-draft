import React, {Component} from "react"
import PropTypes from 'prop-types';

export const withUntapDataCallback = (WrappedComponent, untapClientCall) => {
    const wrapped = class extends Component {
        constructor(props) {
            super(props)
            this.state = {
                loading: false,
                error: "",
                data: undefined,
            }
        }

        getData(args) {
            this.setState({loading: true})
            untapClientCall(this.props.untapClient, args).then((data) => {
                this.setState({loading: false, data: data})
            }, (error) => {
                this.setState({loading: false, error: error})
            })
        }

        render() {
            return <WrappedComponent
                runUntapClientCall={(args) => {this.getData(args)}} {...this.props}
                loading={this.state.loading}
                error={this.state.error}
                data={this.state.data}
            />
        }
    }

    wrapped.propTypes = {
        
    }

    return wrapped
}
