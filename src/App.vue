<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">Recipes are Fun</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-item nav-link active" to="/">
            Home
            <span class="sr-only">(current)</span>
          </router-link>
          <router-link class="nav-item nav-link" to="/myrecipes">My Recipes</router-link>
          <!--  <router-link class="nav-item nav-link" to="/mealPlan"
              >Meal Plan</router-link
          >-->
          <div class="fillThisSpaceInTheMiddle"></div>
          <router-link v-if="!user" class="nav-item nav-link login" to="/register">Register</router-link>
          <router-link v-if="!user" class="nav-item nav-link login" to="/login">Login</router-link>
          <button v-if="user" v-on:click="logout" class="nav-item nav-link login logout">Logout</button>
        </div>
      </div>
    </nav>
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
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  async created() {
    await this.$store.dispatch("getUser");
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>

<style>
body {
  display: flex;
  flex-direction: column;
  background-color: rgba(250, 243, 221, 1);
  min-height: 100vh;
  font-family: Georgia;
}

main {
  flex-grow: 1;
  margin: 2.5em;
}

#app {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

nav {
  flex-shrink: 0;
  flex-grow: 0;
}

p {
  margin: 0.4em;
}

h1 {
  text-align: center;
  margin-bottom: 35px;
  font-family: "Verdana", sans-serif;
  margin-left: 0px;
  margin-right: 0px;
  width: 100%;
}

footer {
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  background-color: rgb(87, 89, 104);
  color: white;
  padding: 7px;
  font-size: 1.2em;
}

footer a {
  color: rgb(147, 151, 175);
}

footer a:hover {
  color: rgb(42, 167, 158);
  text-decoration: none;
}

figcaption {
  text-align: center;
  margin: 7px;
  font-weight: bold;
  font-size: 1.25em;
}

img {
  width: 100%;
}

button img {
  max-height: 20px;
  max-width: 20px;
}

/* HOME PAGE -----------------------------------------------------------------------------------------------------*/
.mainPageContent {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.masonry {
  /* Masonry container */
  column-count: 4;
  column-gap: 1em;
}
.masonry figure {
  /* Masonry bricks or child elements */
  background-color: rgb(42, 167, 158);
  display: inline-block;
  margin: 0 0 1em;
  width: 100%;
  box-shadow: 0.2em 0.2em 0.2em 0.2em rgb(175, 170, 153);
  height: auto;
}

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
/*
.myRecipe img {
  max-height: 60vh;
}*/

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

/* MEAL PLAN PAGE -----------------------------------------------------------------------------------------------------*/
h3 {
  text-align: center;
}

input {
  max-width: 200px;
  margin-bottom: 15px;
}

label {
  font-size: 18px;
  font-style: italic;
}

.weekdays {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.weekday {
  display: flex;
  flex-direction: column;
  margin: 30px;
  padding: 15px;
  background-color: rgb(42, 167, 158);
  box-shadow: 0.2em 0.2em 0.2em 0.2em rgb(175, 170, 153);
}

/* LOGIN PAGE -----------------------------------------------------------------------------------------------------*/

.loginCard {
  display: flex;
  flex-direction: column;
  margin: 30px;
  padding: 20px;
  background-color: rgb(42, 167, 158);
  box-shadow: 0.2em 0.2em 0.2em 0.2em rgb(175, 170, 153);
}

.loginForm {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.smallCenteredHeader {
  text-align: center;
  font-weight: bold;
  font-size: 1.4em;
}

/* NAV BAR -----------------------------------------------------------------------------------------------------*/
.bg-dark {
  background-color: rgb(64, 66, 77) !important;
}

.navbar-dark .navbar-brand {
  color: white;
  font-size: 1.5em;
}

.navbar-nav {
  flex-grow: 1;
  display: flex;
}

.navbar-dark .navbar-nav .nav-link {
  color: rgba(143, 192, 169, 1);
  font-size: 1.2em;
}

.navbar-dark .navbar-nav .active > .nav-link,
.navbar-dark .navbar-nav .nav-link.active,
.navbar-dark .navbar-nav .nav-link.show,
.navbar-dark .navbar-nav .show > .nav-link {
  color: rgb(42, 167, 158);
}

.navbar-dark .navbar-nav .nav-link:focus,
.navbar-dark .navbar-nav .nav-link:hover {
  color: rgba(200, 213, 185, 1);
}

.fillThisSpaceInTheMiddle {
  flex-grow: 1;
}

.login {
  text-align: right;
  /*background-color: rgb(106, 108, 124) !important;*/
  /*border-left: 1px solid rgb(107, 110, 126); */
}

.logout {
  background-color: transparent;
  border-style: none;
}

.logout:focus {
  border-style: none;
  outline: 0px;
}

/* Mobile Styles */

@media (max-width: 1000px) {
  .login {
    text-align: left;
  }

  .myRecipe {
    flex-direction: column;
  }

  .myRecipe figure {
    max-width: 70%;
  }

  .masonry {
    /* Masonry container */
    column-count: 2;
  }
}
</style>
