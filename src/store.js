import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const getRandomMealURL = "https://www.themealdb.com/api/json/v1/1/random.php";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    recipes: [],
    publicRecipes: [],
    currentRecipe: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setRecipes(state, recipes) {
      state.recipes = recipes;
    },
    setPublicRecipes(state, recipes) {
      state.publicRecipes = recipes;
    },
    setCurrentRecipe(state, currentRecipe) {
      state.currentRecipe = currentRecipe;
    }
  },
  actions: {
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit("setUser", response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit("setUser", response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit("setUser", null);
        context.commit("setRecipes", []);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit("setUser", response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getAllRecipes(context) {
      try {
        let response = await axios.get("/api/recipes");
        context.commit("setRecipes", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async saveRecipe(context, newInfo) {
      let newImage = newInfo.newImage;
      let newRecipe = newInfo.newRecipe;
      try {
        const formData = new FormData();
        formData.append("photo", newImage, newImage.name);
        let photoResponse = await axios.post("/api/recipes/photos", formData);
        newRecipe.imagePath = photoResponse.data.path;
        await axios.post("/api/recipes", newRecipe);
        context.dispatch("getAllRecipes");
      } catch (error) {
        // this.error =
        //   "Error saving recipe, look in the console if you dare (probably your image is too big)";
        console.error(error);
      }
    },
    async updateRecipe(context, newRecipe) {
      try {
        await axios.put("/api/recipes/" + newRecipe._id, newRecipe);
        context.dispatch("getAllRecipes");
      } catch (error) {
        //this.error = "Error updated recipe, look in the console if you dare";
        console.error(error);
      }
    },
    async handleDeleteRecipe(context, recipe) {
      try {
        await axios.delete("/api/recipes/" + recipe._id);
        context.dispatch("getAllRecipes");
      } catch (error) {
        //this.error = "Error deleting recipe, look in the console if you dare";
        console.error(error);
      }
    },
    async getPublicRecipes(context) {
      //get a random recipe
      //format it
      //add it to the container
      let randomRecipes = [];
      let numImages = 16;
      for (let i = 0; i < numImages; i++) {
        let recipe = await axios.get(getRandomMealURL);
        //console.log(recipe);
        randomRecipes.push(recipe.data.meals[0]);
      }
      context.commit("setPublicRecipes", randomRecipes);
    }
  }
});
