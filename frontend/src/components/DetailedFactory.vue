<template>
  <div class="factory-details">
    <h1>Factory Details</h1>
    <div v-if="factory">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title">{{ factory.name }}</h2>
          <p class="card-text"><strong>Location:</strong> {{ location.address }}</p>
          <p class="card-text"><strong>Working Hours:</strong> {{ factory.workingHours }}</p>
          <p class="card-text"><strong>Status:</strong> {{ factory.status }}</p>
          <p class="card-text"><strong>Rating:</strong> {{ factory.rating }}</p>
          <p class="card-text"><strong>Chocolates:</strong></p>
          <div class="chocolates-container">
            <div class="chocolate-card" v-for="chocolate in chocolates" :key="chocolate.id">
              <img :src="chocolate.image" alt="Chocolate Image" class="chocolate-image">
              <div class="chocolate-info">
                <h3>{{ chocolate.name }}</h3>
                <p>{{ chocolate.type }}, {{ chocolate.kind }}</p>
                <p>{{ chocolate.price }}$</p>
                <p>Quantity: {{ chocolate.quantity }}</p>
                <div class="chocolate-actions">
                  <button class="remove-button" @click="removeChocolate(chocolate.id)">Remove</button>
                  <router-link :to="`/chocolate/${chocolate.id}/update`" class="update-button">Update</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="actions">
        <router-link :to="`/factory/${factory.id}/add-chocolate`" class="add-button">Add Chocolate</router-link>
        <router-link :to="`/factory/${factory.id}/update`" class="update-factory-button">Update Factory</router-link>
        <router-link :to="`/factory/${factory.id}/comments`" class="comments-button">Comments</router-link>
      </div>
    </div>
    <div v-else>
      <p>Loading factory details...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      factory: null,
      chocolates: [],
      location: null
    };
  },
  mounted() {
    this.fetchFactoryDetails();
  },
  methods: {
    async fetchFactoryDetails() {
      const factoryId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:3000/api/factories/${factoryId}`);
        this.factory = response.data;
        await this.fetchChocolates(this.factory.chocolates);
        await this.fetchLocation(this.factory.locationId);
      } catch (error) {
        console.error('Error fetching factory details:', error);
      }
    },
    async fetchChocolates(chocolateIds) {
      this.chocolates = [];
      try {
        for (const chocolateId of chocolateIds) {
          const response = await axios.get(`http://localhost:3000/api/chocolates/${chocolateId}`);
          this.chocolates.push(response.data);
        }
      } catch (error) {
        console.error('Error fetching chocolates:', error);
      }
    },
    async fetchLocation(locationId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/locations/${locationId}`);
        this.location = response.data;
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    },
    async removeChocolate(chocolateId) {
      try {
        this.factory.chocolates = this.factory.chocolates.filter(id => id !== chocolateId);
        this.chocolates = this.chocolates.filter(chocolate => chocolate.id !== chocolateId);
        await axios.put(`http://localhost:3000/api/factories/${this.factory.id}`, this.factory);
      } catch (error) {
        console.error('Error removing chocolate:', error);
        alert('There was an error removing the chocolate. Please try again.');
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  margin: 0;
  padding: 0;
}

.factory-details {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card {
  background-color: #f0f0f0;
  border: none;
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0;
}

.card-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 15px;
}

.card-text {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #555;
}

.chocolates-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.chocolate-card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  width: calc(50% - 20px);
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.chocolate-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.chocolate-image {
  width: 120px;
  height: 120px;
  border-radius: 5px;
  margin-right: 20px;
  object-fit: cover;
}

.chocolate-info {
  flex-grow: 1;
}

.chocolate-info h3 {
  font-size: 1.5rem;
  margin-bottom: 5px;
  color: #333;
}

.chocolate-info p {
  font-size: 1rem;
  margin: 0;
  color: #555;
}

.chocolate-actions {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.remove-button, .update-button, .comments-button{
  display: inline-block;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  background-color: #444;
  border: none;
  color: #fff;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.update-button, .comments-button {
  background-color: #007bff;
}

.remove-button:hover, .update-button:hover, .comments-button:hover {
  opacity: 0.8;
}

.add-button, .update-factory-button, .comments-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}

.add-button:hover, .update-factory-button:hover {
  opacity: 0.8;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
