import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/login",  credentials ).then(res => res.data.data),
    signup: user =>
      axios.post("/api/users", { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post("/api/auth/confirmation", { token })
        .then(res => res.data.user),
  },
  sensors: {
    fetchAll: (useId) => axios.get(`/api/sensor?sensorId=&userId=${useId}`).then(res => res.data.data.sensor),
    create: sensor =>
      axios.post("/api/sensor", { sensor }).then(res => res.data.book)
  }
};
