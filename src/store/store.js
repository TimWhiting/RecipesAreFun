import Vue from "vue";
import Vuex from "vuex";
//import axios from "axios";

//import ingredients from "./ingredients";
import userRecipes from "./userRecipes";
import user from "./user";
import notifications from "./notifications";
import ingredients from "./ingredients";

Vue.use(Vuex);

console.log(userRecipes);

export default new Vuex.Store({
  modules: {
    user,
    userRecipes,
    ingredients,
    notifications
  }
});
