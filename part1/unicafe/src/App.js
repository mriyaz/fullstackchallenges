import { useState } from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const StatisticLine = (props) => {

  return (
    <tr>
      <td>{props.text} </td><td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  let sum = good + neutral + bad;
  if (sum === 0)
    return (
      <>
        <h2>statistics</h2>
        <p>
          No feedback given
        </p>
      </>
    )
  else
    return (
      <>
        <h2>statistics</h2>

        <table><tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={sum} />
          <StatisticLine text="average" value={(good * 1 + neutral * 0 + bad * -1) / sum} />
          <StatisticLine text="positive" value={good * 100 / sum + ' %'} />
        </tbody>
        </table>

      </>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0);

  return (
    <div>
      <>
        <h2>give feedback</h2>
        <Button onClick={() => setGood(good + 1)} text='good' />&nbsp;
        <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />&nbsp;
        <Button onClick={() => setBad(bad + 1)} text='bad' />
      </>

      <>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </>
    </div>
  )
}

export default App