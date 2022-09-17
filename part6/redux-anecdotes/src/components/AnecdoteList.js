import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  addNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  //console.log(filter.content);
  const anecdotes = useSelector((state) =>
    filter.content != undefined
      ? state.anecdotes.filter((anecdote) =>
          anecdote.content.includes(filter.content)
        )
      : state.anecdotes
  );
  const dispatch = useDispatch();

  const handleClick = (anecdote) => {
    //console.log("vote", anecdote.id);
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`you voted ${anecdote.content}`, 5000));
    //setTimeout(() => dispatch(removeNotification("")), 5000);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleClick(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
