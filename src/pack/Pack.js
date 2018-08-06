import React, {Component} from 'react';
import "./Pack.css"
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Pack extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: -1
        }
    }

    cardClick(index) {
        this.setState({selectedIndex: index})
    }

    render() {
        return (
            <div className="Pack">
                {this.props.cards.map((card, index) => {
                    return <img
                        data-cy="card"
                        className={classNames(
                            "Pack-card",
                            {"Pack-card-selected": this.state.selectedIndex === index}
                        )}
                        onClick={() => this.cardClick(index)}
                        key={index}
                        src={card.image}
                        alt={card.name}
                    />
                })}
            </div>
        )
    }
}

Pack.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired
};