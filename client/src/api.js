import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/login",  credentials ).then(res => res.data.data),
  },
  sensors: {
    fetchAll: (useId) => axios.get(`/api/sensor?sensorId=&userId=${useId}`).then(res => res.data.data.sensor),
  }
};
