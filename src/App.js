import { useState } from 'react';
import { Section } from './Components/Section';
import { FeedbackOptions } from './Components/FeedbackOptions';
import { Statistics } from './Components/Statistics';
import { Notification } from './Components/Notification';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const keys = ['good', 'neutral', 'bad'];

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / total) * 100);
  };

  const onLeaveFeedback = event => {
    switch (event.target.textContent) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions options={keys} onLeaveFeedback={onLeaveFeedback} />
      </Section>
      {total !== 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
    </>
  );
}

export default App;
