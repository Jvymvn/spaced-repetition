import React, { Component } from 'react';
import LearningContext from '../../contexts/LearningContext';
import Button from '../Button/Button'

export default class GuessFeedback extends Component {
    static contextType = LearningContext;

    handleClick = () => {
        this.context.setIsResultDisplayed(false);
    }

    renderFeedback = () => {
        if (this.context.isCorrect) {
            return <h2>You were correct! :D</h2>
        } else {
            return <h2>Good try, but not quite right :(</h2>
        }
    }

    render() {
        return (
            <section id="feedback">
                <div className="GuessFeedback">
                    {this.renderFeedback()}
                    {/* The correct translation for Testnextword was test-answer-from-correct-guess and you chose test-guess-incorrect! */}
                    <div className="DisplayFeedback">
                        <p>The correct translation for {this.context.prevWord} was {this.context.answer} and you chose {this.context.guess}!</p>
                    </div>
                    <input type="submit" id="trynext" onClick={this.handleClick} value="Try another word!"></input>
                </div>
            </section>
        )
    }
}