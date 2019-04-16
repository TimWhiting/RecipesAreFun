<template>
  <div>
    <figure v-if="mode == 'edit'">
      <img v-bind:src="newRecipe.imagePath">
    </figure>
    <figure v-else id="spiceFigure">
      <img src="/images/spice.jpg">
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
      <input v-if="mode == 'add'" type="file" name="photo" @change="changeImage">
      <p v-if="mode == 'add'">Large images will take a long time to upload and give you an error</p>
      <button v-if="mode == 'edit'" @click="updateRecipe">Update Recipe</button>
      <button v-else @click="saveRecipe">Save Recipe</button>
      <br>
    </section>
  </div>
</template>

<script>
export default {
  name: "EditRecipe",
  data: () => {
    return {
      newRecipe: { ingredients: [], title: "", instructions: [] },
      newImage: null,
      newIngredient: "",
      newInstruction: ""
    };
  },
  methods: {
    saveRecipe() {
      this.$store.dispatch("saveRecipe", {
        newRecipe: this.newRecipe,
        newImage: this.newImage
      });
    }
  }
};
</script>

<style scoped>
</style>