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
            <ul className="wordlist">
                {words}
            </ul>
        )
    }

    render() {
        return (
            <div>
                {this.renderWordList()}
            </div>
        )
    }
}

export default WordList