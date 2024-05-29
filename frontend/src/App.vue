<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/factories">Factories</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #333;
  padding: 10px;
  text-align: center;
  color: white;
}

nav {
  margin-top: 10px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: white;
}

nav a.router-link-exact-active {
  font-weight: bold;
}

main {
  flex: 1;
  padding: 20px;
  background-color: #222;
  color: white;
  overflow-y: auto;
  min-height: 80vh; /* Set a minimum height to ensure constant size */
}

.view-container {
  padding: 20px;
  color: white;
  background-color: #222;
  min-height: calc(100vh - 80px); /* Adjust based on your header height */
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: black;
}

th, td {
  padding: 10px;
  border: 1px solid #dee2e6;
}

th {
  background-color: #555;
  color: #ffcc00;
}

tbody tr:nth-child(even) {
  background-color: #333;
}

tbody tr:nth-child(odd) {
  background-color: #444;
}

tbody tr {
  color: white;
}
</style>
