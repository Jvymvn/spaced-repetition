import React, { Component } from 'react';
import LanguageService from '../../services/language-service';
import LearningContext from '../../contexts/LearningContext';
import GuessFeedback from '../../components/GuessFeedback/GuessFeedback';

class LearningRoute extends Component {

  static contextType = LearningContext;

  handleSubmit(guess) {
    LanguageService.submitGuess(guess)
      .then(res => {
        this.context.setPrevWord(this.context.nextWord);
        this.context.clearError();
        this.context.setTotalScore(res.totalScore);
        this.context.setWordCorrectCount(res.wordCorrectCount);
        this.context.setWordIncorrectCount(res.wordIncorrectCount);
        this.context.setNextWord(res.nextWord);
        this.context.setAnswer(res.answer);
        this.context.setGuess(guess);
        this.context.setIsCorrect(res.isCorrect);
        this.context.setIsResultDisplayed(true);
      })
  }

  componentDidMount() {
    LanguageService.getHead()
      .then(data => {
        if (!data) {
          console.error(data);
          throw new Error('Oh no! Something went wrong with getting the next word.')
        }
        this.context.setNextWord(data.nextWord);
        this.context.setTotalScore(data.totalScore);
        this.context.setWordCorrectCount(data.wordCorrectCount);
        this.context.setWordIncorrectCount(data.wordIncorrectCount)
      })
      .catch(e => console.error(e))
  }

  render() {
    console.log(this.context.isResultDisplayed)
    return (
      <section id="learning-container">
        {(!this.context.isResultDisplayed
          ? <section role="form">
            <div>
              <h2>Translate the word:</h2><span>{this.context.nextWord}</span>
            </div>
            <form onSubmit={e => {
              e.preventDefault();
              this.handleSubmit(e.target.guessInput.value);
            }}>
              <label for="learn-guess-input" >What's the translation for this word?</label>
              <input name="guessInput" type="text" id='learn-guess-input' className='guessInput' required required></input>
              <button type="submit">Submit your answer</button>
            </form>
          </section>
          : <GuessFeedback />)}
        <div>
          <p>Your total score is: {this.context.totalScore}</p>
        </div>
        <p>You have answered this word correctly {this.context.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.context.wordIncorrectCount} times.</p>
      </section>
    );
  }
}

export default LearningRoute
