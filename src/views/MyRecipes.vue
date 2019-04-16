<template>
  <main class="myRecipeContent">
    <aside class="myRecipeList">
      <h3>Your Recipes</h3>
      <ul>
        <li
          v-for="(recipe, index) in recipes"
          v-bind:key="recipe._id"
          @click="selectRecipe(index)"
          v-bind:class="{selected: index == recipeIndex}"
        >{{ recipe.title }}</li>
      </ul>
    </aside>
    <section class="myRecipeSection">
      <h1>My Recipes</h1>
      <section class="menu">
        <div class="controls">
          <button v-if="mode != 'add'" @click="handleAddRecipe">
            <img src="/images/plus.png">
          </button>
          <button v-if="mode == 'view'" @click="handleEditRecipe">
            <img src="/images/pencil.png">
          </button>
          <button v-if="mode == 'view'" @click="handleDeleteRecipe">
            <img src="/images/trash.png">
          </button>
        </div>
      </section>
      <edit-recipe v-bind:class="{myRecipe:true, adding: mode=='add'} " v-if="showEditForm"></edit-recipe>
      <recipe class="myRecipe" v-else></recipe>
    </section>
  </main>
</template>

<script>
import EditRecipe from "@/components/EditRecipe.vue";
import Recipe from "@/components/Recipe.vue";
export default {
  name: "MyRecipes",
  components: {
    EditRecipe,
    Recipe
  },
  data: function() {
    return {
      recipes: [],
      recipeIndex: 0,
      mode: "view",
      error: ""
    };
  },
  computed: {
    showEditForm() {
      return (
        this.mode == "edit" || this.mode == "add" || this.recipes.length < 1
      );
    },
    currentRecipe() {
      if (this.recipeIndex < this.recipes.length) {
        return this.recipes[this.recipeIndex];
      } else {
        return null;
      }
    }
  },
  created() {
    this.getAllRecipes();
  },
  methods: {
    resetNewRecipe() {
      this.newRecipe = { ingredients: [], title: "", instructions: [] };
      this.newIngredient = "";
      this.newInstruction = "";
      this.error = "";
      this.newImage = null;
    },
    addIngredient() {
      this.newRecipe.ingredients.push(this.newIngredient);
      this.newIngredient = "";
    },
    addInstruction() {
      this.newRecipe.instructions.push(this.newInstruction);
      this.newInstruction = "";
    },
    changeImage(event) {
      this.newImage = event.target.files[0];
    },
    checkData() {
      if (this.allUsers.includes(this.currentUser)) {
        if (
          this.mode == "edit" ||
          (this.newImage != null && this.newImage.name != "")
        ) {
          if (this.newRecipe.title != "") {
            if (this.newRecipe.ingredients.length >= 1) {
              if (this.newRecipe.instructions.length >= 1) {
                return true;
              } else {
                this.error = "You need to specify at least one instruction!";
                return false;
              }
            } else {
              this.error = "You need to specify at least one ingredient!";
              return false;
            }
          } else {
            this.error = "You need to specify a title!";
            return false;
          }
        } else {
          this.error = "You need to choose a file to upload!";
          return false;
        }
      } else {
        this.error = "You need to specify a user!";
        return false;
      }
    },
    selectRecipe(index) {
      this.mode = "view";
      this.recipeIndex = index;
    },
    handleAddRecipe() {
      this.resetNewRecipe();
      this.mode = "add";
    },
    handleEditRecipe() {
      this.mode = "edit";
      //placeholders
      this.newRecipe = this.currentRecipe;
    },
    removeIngredient(index) {
      this.newRecipe.ingredients.splice(index, 1);
    },
    removeInstruction(index) {
      this.newRecipe.instructions.splice(index, 1);
    }
  }
};
</script>

<style scoped>
</style>