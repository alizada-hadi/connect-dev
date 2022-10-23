import axios from "axios";

const fetchParticipants = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/conversations/", config);
  return response.data;
};

const participantsService = {
  fetchParticipants,
};

export default participantsService;
