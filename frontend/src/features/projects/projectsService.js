import axios from "axios";

const createProject = async (data) => {
  const { token } = data;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("/api/project/create/", data, config);
  return response.data;
};

const fetchProjects = async (query = "") => {
  const response = await axios.get(`/api/projects/${query}`);
  return response.data;
};

const updateProject = async (data) => {
  const { slug, token } = data;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `/api/project/${slug}/update/`,
    data,
    config
  );
  return response.data;
};

const deleteProject = async (data) => {
  const { slug, token } = data;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`/api/project/${slug}/delete/`, config);
  return response.data;
};

const vote = async (data) => {
  const { slug, token } = data;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`/api/vote/${slug}/`, data, config);
  return response.data;
};

const addComment = async (data) => {
  const { slug, token } = data;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`/api/comment/${slug}/`, data, config);
  return response.data;
};

const fetchProjectComments = async (slug) => {
  const response = await axios.get(`/api/comments/fetch/${slug}/`);
  return response.data;
};

const projectsService = {
  createProject,
  fetchProjects,
  updateProject,
  deleteProject,
  vote,
  addComment,
  fetchProjectComments,
};

export default projectsService;
