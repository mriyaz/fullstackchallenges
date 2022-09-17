import { useSelector, useDispatch } from "react-redux";
import { createAnecdotes } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";
import {
  setNotification,
  addNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(createAnecdotes(anecdote));

    dispatch(setNotification(`you added ${anecdote}`, 5000));
  };

  return (
    <div>
      <h2>Create new anecdotes</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
