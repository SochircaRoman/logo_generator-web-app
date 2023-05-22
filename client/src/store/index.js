import { createStore } from "vuex";
import { auth } from "./auth.module";
import { users } from "./users.module";
import { logos } from "./logos.module";

const store = createStore({
  modules: {
    auth,
    users,
    logos,
  },
});

export default store;