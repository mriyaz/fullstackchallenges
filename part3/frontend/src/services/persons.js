import axios from 'axios';
//let baseUrl = 'http://localhost:3001/api/persons';
let baseUrl = '/api/persons';

const getAll = () => axios.get(baseUrl).then(resp => resp.data);

const create = (personObject) => axios.post(baseUrl, personObject).then(resp => resp.data);

const deleteEntry = (id) => axios.delete(`${baseUrl}/${id}`, id).then(resp => resp);

const update = (id, personObject) => axios.put(`${baseUrl}/${id}`, personObject).then(resp => resp.data);

export default { getAll, create, deleteEntry, update }