<template>
  <main>
    <h1>Login</h1>
    <section class="loginCard">
      <p class="smallCenteredHeader">Please sign in to access your recipes.</p>
      <form @submit.prevent="login" class="loginForm">
        <label for="username">Username:</label>
        <input v-model="username" type="email" id="username" name="username">

        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" name="password">
        <button type="submit">Login</button>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async login() {
      try {
        this.error = await this.$store.dispatch("user/login", {
          username: this.username,
          password: this.password
        });
        if (this.error === "") this.$router.push("myrecipes");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
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
</style>