import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const response = await axios.post(baseUrl, { content, votes: 0 });
  return response.data;
};

const updateVote = async (content) => {
  //console.log("anecdote in updateVote is::", JSON.stringify(content));
  const response = await axios.patch(`${baseUrl}/${content.id}`, content);
  //console.log("response in updateVote is::" + JSON.stringify(response));
  return response.data;
};

export default { getAll, createNew, updateVote };
