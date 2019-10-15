import React, { Component } from 'react';
import WordList from '../../components/WordList/WordList';
import LanguageContext from '../../contexts/LanguageContext';
import "./DashboardRoute.css"

class DashboardRoute extends Component {
  static contextType = LanguageContext;



  render() {
    return (
      <section id="section-dashboard">
        <h2>Start Practicing: {this.context.language.name}</h2>
        <h2>Total correct answers: {this.context.language.total_score}</h2>
        <a href='/learn' className='btn'>Start practicing</a>
        <h3>Words to practice</h3>

        <WordList />
      </section>
    );
  }
}

export default DashboardRoute
