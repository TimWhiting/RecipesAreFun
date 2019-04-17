<template>
  <main>
    <h1>Register</h1>
    <section class="loginCard">
      <p class="smallCenteredHeader">Please register to create new recipes.</p>
      <form @submit.prevent="register" class="loginForm">
        <label for="name">Name:</label>
        <input v-model="name" type="text" id="name" name="name">

        <label for="username">Username:</label>
        <input v-model="username" type="email" id="username" name="username">

        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" name="password">

        <button type="submit">Register</button>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      name: "",
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async register() {
      try {
        this.error = await this.$store.dispatch("register", {
          name: this.name,
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