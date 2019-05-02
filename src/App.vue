<template>
  <div id="app">
    <div :class="{'custom-wrapper':true, 'pure-g':true, 'open': menuOpen}">
      <div class="pure-u-1 pure-u-md-1-3">
        <div class="pure-menu">
          <router-link class="pure-menu-heading custom-brand" to="/">Recipes</router-link>
          <a
            href="#"
            :class="{'custom-toggle': true, 'x': showOverflowMenu }"
            @click.prevent="toggleMenu"
          >
            <s class="bar"></s>
            <s class="bar"></s>
          </a>
        </div>
      </div>
      <div class="pure-u-1 pure-u-md-1-3">
        <div :class="{'pure-menu':true, 'pure-menu-horizontal':horizontal}">
          <ul class="pure-menu-list">
            <li class="pure-menu-item">
              <router-link class="pure-menu-link" to="/">Home</router-link>
            </li>
            <li class="pure-menu-item">
              <router-link class="pure-menu-link" to="/myrecipes">My Recipes</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="pure-u-1 pure-u-md-1-3">
        <div :class="{'pure-menu':true, 'pure-menu-horizontal':horizontal, 'custom-menu-3':true}">
          <ul class="pure-menu-list">
            <li class="pure-menu-item">
              <router-link v-if="!user" class="pure-menu-link" to="/register">Register</router-link>
            </li>
            <li class="pure-menu-item">
              <router-link v-if="!user" class="pure-menu-link" to="/login">Login</router-link>
            </li>
            <li class="pure-menu-item">
              <a v-if="user" v-on:click.prevent="logout" class="pure-menu-link">Logout</a>
            </li>
          </ul>
        </div>
      </div>
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
export default {
  data: () => {
    return {
      menuOpen: false,
      horizontal: true,
      showOverflowMenu: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  async created() {
    await this.$store.dispatch("user/getUser");
  },
  ready: function() {
    window.addEventListener("resize", this.closeMenu);
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.closeMenu);
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.push("/");
    },
    toggleHorizontal() {
      this.horizontal = !this.horizontal;
    },
    toggleMenu() {
      if (this.menuOpen) {
        setTimeout(() => {
          this.toggleHorizontal();
        }, 500);
      } else {
        this.toggleHorizontal();
      }
      this.menuOpen = !this.menuOpen;
      this.showOverflowMenu = !this.showOverflowMenu;
    },
    closeMenu() {
      if (this.menuOpen) {
        this.toggleMenu();
      }
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

/* NAV BAR -----------------------------------------------------------------------------------------------------*/
.custom-wrapper {
  background-color: #ffd390;
  -webkit-font-smoothing: antialiased;
  height: 2.1em;
  padding: 0.5em;
  overflow: hidden;
  -webkit-transition: height 0.5s;
  -moz-transition: height 0.5s;
  -ms-transition: height 0.5s;
  transition: height 0.5s;
  background-color: rgb(87, 89, 104);
}
.pure-menu-link {
  color: white;
}
.custom-brand {
  color: white;
}
.custom-wrapper.open {
  height: 14em;
}

.custom-menu-3 {
  text-align: right;
}

.custom-toggle {
  width: 34px;
  height: 34px;
  position: absolute;
  top: 0;
  right: 0;
  display: none;
}

.custom-toggle .bar {
  background-color: #777;
  display: block;
  width: 20px;
  height: 2px;
  border-radius: 100px;
  position: absolute;
  top: 18px;
  right: 7px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  transition: all 0.5s;
}

.custom-toggle .bar:first-child {
  -webkit-transform: translateY(-6px);
  -moz-transform: translateY(-6px);
  -ms-transform: translateY(-6px);
  transform: translateY(-6px);
}

.custom-toggle.x .bar {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.custom-toggle.x .bar:first-child {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

@media (max-width: 47.999em) {
  .custom-menu-3 {
    text-align: left;
  }

  .custom-toggle {
    display: block;
  }
}
</style>
