import { createStore } from 'vuex';

import user from './modules/user';
import app from './modules/app';

export default createStore({
  modules: {
    user,
    app,
  },
});
