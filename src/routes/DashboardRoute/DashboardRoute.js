import React, { Component } from 'react';
import WordList from '../../components/WordList/WordList';

class DashboardRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  startLearning = () => {
    const { history } = this.props
    history.push('learn');
  }

  render() {
    return (
      <section>
        {/* <WordList startLearning={this.startLearning} /> */}
        <WordList />
      </section>
    );
  }
}

export default DashboardRoute
