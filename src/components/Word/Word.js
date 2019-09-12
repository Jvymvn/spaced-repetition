import React, { Component } from 'react'

export default class Word extends Component {
    render() {
        return (
            <div>
                <h4>{this.props.word.original}</h4>
                <p>correct answer count: {this.props.word.correct_count}</p>
                <p>incorrect answer count: {this.props.word.incorrect_count}</p>
            </div>
        )
    }
}
