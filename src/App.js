import React, { Component } from 'react';
import { Section } from './Components/Section';
import { FeedbackOptions } from './Components/FeedbackOptions';
import { Statistics } from './Components/Statistics';
import { Notification } from './Components/Notification';

class App extends Component {
  static defaultProps = {};
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };
  countPositiveFeedbackPercentage = () => {
    return Math.round((this.state.good / this.countTotalFeedback()) * 100);
  };
  onLeaveFeedback = event => {
    const nameButton = event.currentTarget.textContent;
    this.setState(prevState => ({
      [nameButton]: (prevState[nameButton] += 1),
    }));
  };

  render() {
    const { good, bad, neutral } = this.state;
    const total = this.countTotalFeedback();
    const keys = Object.keys(this.state);

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={keys}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>
        {total !== 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={this.countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </>
    );
  }
}

export default App;
