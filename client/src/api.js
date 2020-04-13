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
    fetchAll: () => axios.get("/api/sensors").then(res => res.data.books),
    create: sensor =>
      axios.post("/api/sensor", { sensor }).then(res => res.data.book)
  }
};
