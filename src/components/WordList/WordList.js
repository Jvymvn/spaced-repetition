import React, { Component } from 'react';
import LanguageService from '../../services/language-service';
import Word from '../Word/Word';
import LanguageContext from '../../contexts/LanguageContext';

class WordList extends Component {
    static contextType = LanguageContext;

    componentDidMount() {
        LanguageService.getWords()
            .then(res => {
                this.context.setLanguage(res.language);
                this.context.setWords(res.words);
            });
    }

    renderWordList() {
        const words = this.context.words.map((word, i) => <li key={i}><Word word={word} /></li>)
        return (
            <ul>
                {words}
            </ul>
        )
    }

    render() {
        return (
            <div className="wordlist">
                <h2>Start Practicing {this.context.language.name}</h2>
                <h2>Total correct answers: {this.context.language.total_score}</h2>
                <a href='/learn'>Start practicing</a>
                <h3>Words to practice</h3>
                {this.renderWordList()}
            </div>
        )
    }
}

export default WordList