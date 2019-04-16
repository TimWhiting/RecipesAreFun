<template>
  <main>
    <h1>Login</h1>

    <section class="loginCard">
      <p class="smallCenteredHeader">Please sign in to access your recipes.</p>
      <form class="loginForm">
        <label for="username">Username:</label>
        <input type="email" id="username" name="username">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password">
      </form>
    </section>
  </main>
</template>

<script>
export default {
  name: "Login",
  data: () => {
    return {};
  }
};
</script>

<style scoped>
</style>