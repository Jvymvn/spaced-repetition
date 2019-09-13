import React, { Component } from 'react';
import LearningContext from '../../contexts/LearningContext';

export default class GuessFeedback extends Component {
    static contextType = LearningContext;

    handleClick = () => {
        this.context.setIsResultDisplayed(false);
    }

    renderFeedback = () => {
        if (this.context.isCorrect) {
            return <h2>You were correct!</h2>
        } else {
            return <h2>Good try, but incorrect.</h2>
        }
    }

    render() {
        return (
            <section id="feedback">
                <div className="GuessFeedback">
                    {this.renderFeedback()}
                    <p>The correct translation for <span en="fr">{this.context.prevWord}</span> was {this.context.answer} and you chose{this.context.guess}</p>
                    <button onClick={this.handleClick}>Next word</button>
                </div>
            </section>
        )
    }
}