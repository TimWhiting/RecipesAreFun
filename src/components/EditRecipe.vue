
<template>
  <div>
    <figure>
      <img v-bind:src="newRecipe.imagePath">
    </figure>
    <section class="recipeCard">
      <p class="error">{{this.error}}</p>
      <input type="text" v-model="newRecipe.title" placeholder="Recipe Title">
      <section class="ingredientSection">
        <h3>Ingredients</h3>
        <ul class="ingredients">
          <li v-for="(ingredient,index) in newRecipe.ingredients" v-bind:key="ingredient">
            <input type="text" v-model="newRecipe.ingredients[index]">
            <button @click="removeIngredient(index)">x</button>
          </li>
          <li>
            <input type="text" v-model="newIngredient" placeholder="Add ingredient">
            <button @click="addIngredient">+</button>
          </li>
        </ul>
      </section>
      <section class="instructionSection">
        <h3>Instructions</h3>
        <ol class="ingredients">
          <li v-for="(instruction, index) in newRecipe.instructions" v-bind:key="instruction">
            <input type="text" v-model="newRecipe.instructions[index]">
            <button @click="removeInstruction(index)">x</button>
          </li>
          <li>
            <input type="text" v-model="newInstruction" placeholder="Add instruction">
            <button @click="addInstruction">+</button>
          </li>
        </ol>
      </section>
      <button @click="updateRecipe">Update Recipe</button>
      <br>
    </section>
  </div>
</template>

<script>
export default {
  name: "EditRecipe",
  props: {
    newRecipe: Object
  },
  data: () => {
    return {
      newIngredient: "",
      newInstruction: "",
      error: ""
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    async updateRecipe() {
      if (this.checkData()) {
        await this.$store.dispatch("updateRecipe", this.newRecipe);
        this.$emit("updated");
      }
    },

    removeIngredient(index) {
      this.newRecipe.ingredients.splice(index, 1);
    },
    removeInstruction(index) {
      this.newRecipe.instructions.splice(index, 1);
    },
    addIngredient() {
      this.newRecipe.ingredients.push(this.newIngredient);
      this.newIngredient = "";
    },
    addInstruction() {
      this.newRecipe.instructions.push(this.newInstruction);
      this.newInstruction = "";
    },
    checkData() {
      if (this.user != null) {
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
        this.error = "You need to register or login!";
        return false;
      }
    }
  }
};
</script>

<style scoped>
</style>