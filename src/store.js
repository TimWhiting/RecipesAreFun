import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const getRandomMealURL = "https://www.themealdb.com/api/json/v1/1/random.php";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    recipes: [],
    currentRecipe: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setRecipes(state, recipes) {
      state.recipes = recipes;
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
    async getAllRecipes() {
      let response = await axios.get("/api/recipes");
      this.recipes = response.data;
      if (this.recipes.length > 0) {
        this.recipeIndex = 0;
      } else {
        this.resetNewRecipe();
        this.mode = "add";
      }
    },
    async saveRecipe(context, data) {
      let newImage = data.newImage;
      let newRecipe = data.newRecipe;
      try {
        if (this.checkData()) {
          const formData = new FormData();
          formData.append("photo", newImage, newImage.name);
          let photoResponse = await axios.post("/api/photos", formData);

          newRecipe.user = context.state.user;
          newRecipe.imagePath = photoResponse.data.path;

          await axios.post("/api/recipes", newRecipe);
          this.resetNewRecipe();
          this.mode = "view";
          this.getAllRecipes();
        }
      } catch (error) {
        this.error =
          "Error saving recipe, look in the console if you dare (probably your image is too big)";
        console.log(error);
      }
    },
    async updateRecipe() {
      try {
        if (this.checkData()) {
          await axios.put("/api/recipes/" + this.newRecipe._id, this.newRecipe);
          this.resetNewRecipe();
          this.mode = "view";
          this.getAllRecipes();
        }
      } catch (error) {
        this.error = "Error updated recipe, look in the console if you dare";
        console.log(error);
      }
    },
    async handleDeleteRecipe() {
      try {
        await axios.delete("/api/recipes/" + this.currentRecipe._id);
        this.getAllRecipes();
      } catch (error) {
        this.error = "Error deleting recipe, look in the console if you dare";
        console.log(error);
      }
    },
    async getPublicRecipes() {
      //get a random recipe
      //format it
      //add it to the container
      let numImages = 15;
      for (let i = 0; i < numImages; i++) {
        console.log(getRandomMealURL);
        let recipe = await axios.get(getRandomMealURL);
        //console.log(recipe);
        this.recipes.push(recipe.data.meals[0]);
      }
    }
  }
});
