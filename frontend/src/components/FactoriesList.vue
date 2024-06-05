<template>
  <div class="factory-list">
    <h1 class="text-center mb-4 factory-header">Factory List</h1>

    <!-- Open Factories -->
    <div v-if="openedFactories.length > 0" class="mb-4">
      <h3 class="text-center mb-3 section-header">Open Factories</h3>
      <div class="row justify-content-center">
        <div v-for="(factory, index) in openedFactories" :key="factory.id" class="col-lg-3 col-md-4 mb-4">
          <div class="card factory-card">
            <img :src="factory.logo" alt="Factory Image" class="factory-image">
            <div class="card-body">
              <h4 class="card-title">{{ factory.name }}</h4>
              <p class="card-text"><strong>Working Hours:</strong> {{ factory.workingHours }}</p>
              <p class="card-text"><strong>Status:</strong> {{ factory.status }}</p>
              <p class="card-text"><strong>Rating:</strong> {{ factory.rating }}</p>
              <router-link :to="`/factory/${factory.id}`" class="btn btn-light btn-lg">View Details</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Closed Factories -->
    <div v-if="closedFactories.length > 0" class="mb-4">
      <h3 class="text-center mb-3 section-header">Closed Factories</h3>
      <div class="row justify-content-center">
        <div v-for="(factory, index) in closedFactories" :key="factory.id" class="col-lg-3 col-md-4 mb-4">
          <div class="card factory-card">
            <img :src="factory.logo" alt="Factory Image" class="factory-image">
            <div class="card-body">
              <h4 class="card-title">{{ factory.name }}</h4>
              <p class="card-text"><strong>Working Hours:</strong> {{ factory.workingHours }}</p>
              <p class="card-text"><strong>Status:</strong> {{ factory.status }}</p>
              <p class="card-text"><strong>Rating:</strong> {{ factory.rating }}</p>
              <router-link :to="`/factory/${factory.id}`" class="btn btn-light btn-lg">View Details</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Factories Message -->
    <div v-if="factories.length === 0" class="text-center mt-5">
      <p style="font-size: 2rem; color: #333;">No factories found.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      factories: []
    };
  },
  computed: {
    openedFactories() {
      return this.factories.filter(factory => factory.status === 'Open');
    },
    closedFactories() {
      return this.factories.filter(factory => factory.status === 'Closed');
    }
  },
  mounted() {
    this.fetchFactories();
  },
  methods: {
    async fetchFactories() {
      try {
        const response = await axios.get('http://localhost:3000/api/factories');
        this.factories = response.data;
      } catch (error) {
        console.error('Error fetching factories:', error);
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
}

.factory-list {
  padding: 20px;
  background-color: #ffffff;
}

.factory-header {
  font-size: 3rem;
  color: #fff;
  background: linear-gradient(to right, #7F00FF, #E100FF);
  padding: 20px;
  border-radius: 12px;
}

.section-header {
  font-size: 2.5rem;
  color: #333;
}

.factory-card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 20px;
}

.factory-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.factory-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.card-body {
  padding: 10px;
  text-align: left;
}

.card-title {
  font-size: 1.5rem;
  color: #333;
}

.card-text {
  font-size: 1rem;
  margin-bottom: 10px;
  color: #555;
}

.btn-light {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.btn-light:hover {
  background-color: #0056b3;
}
</style>
