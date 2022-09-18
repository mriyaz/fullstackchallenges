import { connect } from "react-redux";

import { createAnecdotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const anecdotes = props.anecdotes; //useSelector((state) => state);

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";

    props.createAnecdotes(anecdote);

    props.setNotification(`you added ${anecdote}`, 5000);
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
  };
};

const mapDispatchToProps = {
  createAnecdotes,
  setNotification,
};

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm);
export default ConnectedAnecdoteForm;
