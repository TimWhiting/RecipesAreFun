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
          <button v-if="mode != 'add'" @click="handleAddRecipe">+</button>
          <button v-if="mode == 'view'" @click="handleEditRecipe">~</button>
          <button v-if="mode == 'view'" @click="handleDeleteRecipe">x</button>
        </div>
      </section>
      <add-edit-recipe
        :mode="mode"
        v-if="showAdd"
        :newRecipe="{ingredients: [], instructions: [], title: ''}"
        class="adding myRecipe"
        @saved="mode = 'view'"
      ></add-edit-recipe>
      <add-edit-recipe
        :mode="mode"
        v-else-if="mode=='edit'"
        :newRecipe="currentRecipe"
        class="myRecipe"
        @saved="mode = 'view'"
      ></add-edit-recipe>
      <recipe class="myRecipe" v-bind:currentRecipe="currentRecipe" v-else></recipe>
    </section>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Recipe from "@/components/Recipe.vue";
import AddEditRecipe from "@/components/AddEditRecipe.vue";
export default {
  name: "MyRecipes",
  components: {
    Recipe,
    AddEditRecipe
  },
  data: function() {
    return {
      recipeIndex: 0,
      mode: "view",
      error: ""
    };
  },
  computed: {
    ...mapState("userRecipes", ["recipes"]),
    showAdd() {
      return (
        this.mode == "add" || this.mode == "edit" || this.recipes.length < 1
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
  methods: {
    ...mapActions("user", ["getUser"]),
    ...mapActions("userRecipes", ["getAllRecipes"]),
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
  },
  async created() {
    await this.$store.dispatch("user/getUser");
    if (!this.$store.state.user) {
      this.$router.push("login");
    }
    await this.$store.dispatch("userRecipes/getAllRecipes");
  }
};
//Deleting fails to refresh page
</script>

<style scoped>
/* MY RECIPES PAGE -----------------------------------------------------------------------------------------------------*/
.myRecipeContent {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0px;
  align-self: flex-start;
  width: 100%;
}

.myRecipeContent h1 {
  margin-top: 1em;
}

.myRecipeList {
  padding-top: 2em;
  margin-left: 0em;
  background-color: rgb(42, 167, 158);
  align-self: stretch;
  min-width: 225px;
}

.selected {
  background-color: rgb(46, 185, 176);
  font-weight: bold;
}

.myRecipeList ul {
  padding-inline-start: 0em;
  margin-block-start: 0em;
}

.myRecipeList li {
  padding: 5px 2em;
  font-style: italic;
}

.myRecipeList li:hover {
  background-color: rgb(84, 195, 188);
}

.myRecipeList ul {
  list-style: none;
}

.menu {
  display: flex;
  justify-content: space-between;
  margin: 0px 35px;
}

.controls {
  display: flex;
  flex-direction: row;
}
.largeSelector {
  padding: 5px;
  align-self: center;
  margin-bottom: 0px;
}

.myRecipe {
  margin: 35px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2em 1em;
  box-shadow: 0.2em 0.2em 0.2em 0.2em rgb(131, 126, 109);
  background-color: rgb(235, 221, 188);
}

.myRecipe figure {
  display: flex;
  flex-direction: column;
  order: 1;
  max-width: 40%;
}

#spiceFigure {
  min-width: 50%;
  max-width: 60%;
}

.myRecipeSection {
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  width: 100%;
  height: 100%;
}

.myRecipe img {
  align-self: center;
}

.recipeCard {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.error {
  color: red;
  font-size: 25px;
}

@media (max-width: 1000px) {
  .myRecipe {
    flex-direction: column;
  }

  .myRecipe figure {
    max-width: 70%;
  }
}
</style>