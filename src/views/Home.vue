<template>
  <main class="mainPageContent">
    <h1>Public Recipes</h1>
    <section class="masonry" id="recipeImages">
      <figure v-for="recipe in recipes" v-bind:key="recipe._id">
        <img v-bind:src="recipe.strMealThumb">
        <figcaption>{{ recipe.strMeal }}</figcaption>
      </figure>
    </section>
  </main>
</template>

<script>
export default {
  name: "Home",
  data: function() {
    return {};
  },
  computed: {
    recipes() {
      return this.$store.state.publicRecipes;
    }
  },
  created() {
    this.$store.dispatch("getPublicRecipes");
  },
  methods: {}
};
</script>

<style scoped>
</style>