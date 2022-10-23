import axios from "axios";

const getSkills = async () => {
  const response = await axios.get("/api/skills/all/");
  return response.data;
};

const skillsService = { getSkills };
export default skillsService;
