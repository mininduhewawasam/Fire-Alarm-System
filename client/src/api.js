import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/login",  credentials ).then(res => res.data.data),
  },
  sensors: {
    fetchAll: (useId) => axios.get(`/api/sensor`).then(res => res.data.data.sensor)
  }
};
