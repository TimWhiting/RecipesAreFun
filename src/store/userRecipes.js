import axios from "axios";

export default {
  namespaced: true,
  state: {
    recipes: []
  },
  mutations: {
    setRecipes(state, recipes) {
      state.recipes = recipes;
    }
  },
  actions: {
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
    }
  }
};
