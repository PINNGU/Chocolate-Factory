<template>
  <form @submit.prevent="login">
    <label for="username">Username:</label>
    <input type="text" id="username" v-model="username" required>
    <label for="password">Password:</label>
    <input type="password" id="password" v-model="password" required>
    <button type="submit">Login</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const login = async () => {
  try {
    const usernameValue = username.value;
    const passwordValue = password.value;

    const response = await axios.post('http://localhost:3000/api/auth/login', {
      username: usernameValue,
      password: passwordValue
    });

    // Store the token and username securely
    const token = response.data.token;
    const user = response.data.username;
    localStorage.setItem('token', token);
    localStorage.setItem('username', user);

    // Redirect to a protected route or update application state
    router.push('/factories').then(() => {
    window.location.reload()
  });

    

  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      errorMessage.value = error.response.data.message || 'Failed to login';
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      errorMessage.value = 'Network error. Please try again later.';
    } else {
      // Something else happened in making the request
      console.error('Error during request:', error.message);
      errorMessage.value = 'Failed to login. Please try again later.';
    }
  }
};
</script>


<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
}

label, input, button {
  margin: 10px 0;
}

.error {
  color: red;
  font-size: 14px;
}
</style>
