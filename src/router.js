import Vue from "vue";
import Router from "vue-router";
import MyRecipes from "./views/MyRecipes.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: MyRecipes
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/myrecipes",
      name: "MyRecipes",
      component: MyRecipes
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    }
  ]
});
