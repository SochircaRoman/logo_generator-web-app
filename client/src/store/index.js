import { createStore } from "vuex";
import { auth } from "./auth.module";
import { users } from "./users.module";

const store = createStore({
  modules: {
    auth,
    users
  },
});

export default store;