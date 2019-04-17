<template>
  <div>
    <figure>
      <img v-bind:src="currentRecipe.imagePath">
    </figure>
    <section class="recipeCard">
      <h2 class="recipeTitle">{{ currentRecipe.title }}</h2>
      <h4>Created by {{ currentRecipe.user.name }}</h4>
      <section class="ingredientSection">
        <ul class="ingredients">
          <li
            v-for="ingredient in currentRecipe.ingredients"
            v-bind:key="ingredient"
          >{{ ingredient }}</li>
        </ul>
      </section>
      <section class="instructionSection">
        <ol class>
          <li
            v-for="instruction in currentRecipe.instructions"
            v-bind:key="instruction"
          >{{ instruction }}</li>
        </ol>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: "Recipe",
  props: {
    currentRecipe: Object
  }
};
</script>

<style lang="scss" scoped>
</style>