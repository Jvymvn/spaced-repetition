import React, { Component } from 'react';
import LanguageService from '../../services/language-service';
import LearningContext from '../../contexts/LearningContext';
import GuessFeedback from '../../components/GuessFeedback/GuessFeedback';
import "./LearningRoute.css"

class LearningRoute extends Component {

  static contextType = LearningContext;

  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  handleSubmit(guess) {
    let guessFormat = this.capitalize(guess)
    LanguageService.submitGuess(guessFormat)
      .then(res => {
        this.context.setPrevWord(this.context.nextWord);
        this.context.clearError();
        this.context.setTotalScore(res.totalScore);
        this.context.setWordCorrectCount(res.wordCorrectCount);
        this.context.setWordIncorrectCount(res.wordIncorrectCount);
        this.context.setNextWord(res.nextWord);
        this.context.setAnswer(res.answer);
        this.context.setGuess(guessFormat);
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
          ? <section role="form" >
            <div>
              <h2>Translate the word:</h2><h3>{this.context.nextWord}</h3>
            </div>
            <form onSubmit={e => {
              e.preventDefault();
              this.handleSubmit(e.target.guessInput.value);
            }} id="guessform">
              <div class="row">
                <div class="col-25">
                  <label for="learn-guess-input" >What's the translation for this word?</label><br />
                </div>
                <div class="col-75">
                  <input name="guessInput" type="text" id='learn-guess-input' className='guessInput' required required></input>
                </div>
                <input type="submit" value="Submit your answer"></input>
              </div>
            </form>
          </section>
          : <GuessFeedback />)}
        <div className='DisplayScore'>
          <p className="DisplayScore">Your total score is: {this.context.totalScore}</p>
        </div>
        <p>You have answered this word correctly {this.context.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.context.wordIncorrectCount} times.</p>
      </section>
    );
  }
}

export default LearningRoute
