<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/factories">Factories</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
body, html {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #eea333f1;
  color: white;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

header {
  background-color: #eea333f1;
  padding: 10px;
  text-align: center;
  color: white;
}

nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}

nav a {
  color: #ffcc00;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #fff;
}

nav a.router-link-exact-active {
  color: #fff;
  border-bottom: 2px solid #ffcc00;
}

main {
  flex: 1;
  padding: 20px;
  background-color: #fffffff1;
  color: white;
  overflow-y: auto;
  min-width: 1200px; /* Maintains your specified width */
}

.view-container {
  padding: 20px;
  color: white;
  background-color: #fffffff1;
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
  background-color: #fffffff1;
}

tbody tr:nth-child(odd) {
  background-color: #fffffff1;
}

tbody tr {
  color: white;
}
</style>
