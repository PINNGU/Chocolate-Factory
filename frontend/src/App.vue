<template>
  <div class="lele">
    <header>
      <nav class="navbar">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/factories">Factories</RouterLink>
        <div v-if="isLoggedIn" class="user-menu">
          <span class="username" @click="toggleMenu">{{ username }}</span>
          <ul v-if="showMenu" class="dropdown-menu">
            <li @click="logout">Logout</li>
          </ul>
        </div>
        <template v-else>
          <RouterLink to="/login" class="login-link">Login</RouterLink>
        </template>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { computed, ref, onMounted } from 'vue';

const showMenu = ref(false);
const username = ref('');
const router = useRouter();

const isLoggedIn = computed(() => {
  return !!localStorage.getItem('token');
});

const getUsername = () => {
  return localStorage.getItem('username') || '';
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  showMenu.value = false;

  // Redirect to home or login page and reload to ensure state is rese
    window.location.reload();
 
};

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const fetchUsername = () => {
  username.value = getUsername();
};

// Fetch username on component mount
onMounted(() => {
  fetchUsername();
});
</script>

<style scoped>
body, html {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #eea333f1;
  color: white;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
}

.lele {
  width: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
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
  width: 100%;
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

nav .login-link {
  margin-left: auto;
  margin-right: 10px;
}

.user-menu {
  margin-left: auto;
  margin-right: 10px;
  position: relative;
  cursor: pointer;
}

.username {
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #333;
  list-style-type: none;
  padding: 10px;
  margin: 0;
  display: none;
}

.user-menu:hover .dropdown-menu {
  display: block;
}

.dropdown-menu li {
  cursor: pointer;
  color: #fff;
  padding: 5px 0;
}

.dropdown-menu li:hover {
  background-color: #555;
}

main {
  flex: 1;
  padding: 20px;
  background-color: #fffffff1;
  color: black;
  overflow-y: auto;
  width: 100%;
}

.view-container {
  padding: 20px;
  color: black;
  background-color: #fffffff1;
  min-height: calc(100vh - 80px);
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
  color: black;
}
</style>
