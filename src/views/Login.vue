<template>
  <main>
    <h1>Login</h1>
    <section class="loginCard">
      <p class="smallCenteredHeader">Please sign in to access your recipes.</p>
      <form class="loginForm">
        <label for="username">Username:</label>
        <input v-model="username" type="email" id="username" name="username">

        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" name="password">
        <button @click="login">Login</button>
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
        this.error = await this.$store.dispatch("login", {
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
</style>