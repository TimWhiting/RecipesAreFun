<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/myrecipes">MyRecipes</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/login">Login</router-link>
    </div>
    <router-view/>
    <footer>
      <p>
        Here is our
        <a href="https://github.com/TimWhiting/RecipesAreFun.git">repository</a>
      </p>
    </footer>
  </div>
</template>

<script>
</script>

<style>
</style>
