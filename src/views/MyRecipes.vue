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
            <img src="@/assets/plus.png">
          </button>
          <button v-if="mode == 'view'" @click="handleEditRecipe">
            <img src="@/assets/pencil.png">
          </button>
          <button v-if="mode == 'view'" @click="handleDeleteRecipe">
            <img src="@/assets/trash.png">
          </button>
        </div>
      </section>
      <add-recipe v-if="showAdd" class="adding myRecipe" @saved="mode = 'view'"></add-recipe>
      <edit-recipe
        class="myRecipe"
        v-bind:newRecipe="currentRecipe"
        v-else-if="mode=='edit'"
        @updated="mode = 'view'"
      ></edit-recipe>
      <recipe class="myRecipe" v-bind:currentRecipe="currentRecipe" v-else></recipe>
    </section>
  </main>
</template>

<script>
import EditRecipe from "@/components/EditRecipe.vue";
import Recipe from "@/components/Recipe.vue";
import AddRecipe from "@/components/AddRecipe.vue";
export default {
  name: "MyRecipes",
  components: {
    EditRecipe,
    Recipe,
    AddRecipe
  },
  data: function() {
    return {
      recipeIndex: 0,
      mode: "view",
      error: ""
    };
  },
  computed: {
    showAdd() {
      return this.mode == "add" || this.recipes.length < 1;
    },
    recipes() {
      return this.$store.state.recipes;
    },
    currentRecipe() {
      if (this.recipeIndex < this.recipes.length) {
        return this.recipes[this.recipeIndex];
      } else {
        return null;
      }
    }
  },
  async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getAllRecipes");
    if (!this.$store.state.user) {
      this.$router.push("login");
    }
  },
  methods: {
    handleEditRecipe() {
      this.mode = "edit";
    },
    handleDeleteRecipe() {
      this.$store.dispatch("handleDeleteRecipe", this.currentRecipe);
      this.recipeIndex = 0;
    },
    handleAddRecipe() {
      this.mode = "add";
    },
    selectRecipe(index) {
      this.mode = "view";
      this.recipeIndex = index;
    }
  }
};
//Deleting fails to refresh page
//Adding a recipe, the ingredients and probably instructions aren't an array
//Images don't show up
</script>

<style scoped>
</style>