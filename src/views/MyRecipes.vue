<!--
if (this.recipes.length > 0) {
        this.recipeIndex = 0;
      } else {
        this.resetNewRecipe();
        this.mode = "add";
      }
-->

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
    selectRecipe(index) {
      this.mode = "view";
      this.recipeIndex = index;
    }
  }
};
</script>

<style scoped>
</style>