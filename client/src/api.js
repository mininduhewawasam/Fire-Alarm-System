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
  books: {
    fetchAll: () => axios.get("/api/books").then(res => res.data.books),
    create: book =>
      axios.post("/api/books", { book }).then(res => res.data.book)
  }
};
