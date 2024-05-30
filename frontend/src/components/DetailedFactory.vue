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
            <p class="card-text" style="font-size: 30px;color: salmon;"><strong>Chocolates:</strong></p>
            <div class="chocolates-container">
              <div class="chocolate-card" v-for="chocolate in chocolates" :key="chocolate.id">
                <img :src="chocolate.image" alt="Chocolate Image" class="chocolate-image">
                <div class="chocolate-info">
                  <h3>{{ chocolate.name }}</h3>
                  <p>{{ chocolate.type }}, {{ chocolate.kind }}</p>
                  <p>{{ chocolate.price }}$</p>
                  <p>Quantity: {{ chocolate.quantity }}</p>
                  <Button class="remove-button" @click="removeChocolate(chocolate.id)">Remove</Button>
                </div>
              </div>
              

            </div>

          </div>

        </div>
        <router-link :to="`/factory/${factory.id}/add-chocolate`" class="add-button">Add chocolate</router-link>

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

  .remove-button{
        justify-content: left;
        width: fit-content;
        display: flex;
        font-size: 15px;
        font-weight: bold;
        background-color: #444;
        border: none;
        color: #f74856;
  }

    .add-button{
        justify-content: center;
        display: flex;
        font-size: 30px;
        font-weight: bold;
        color: pink;
  border-color: #f2f2f2;
  border-radius: 4px;
    }

    .remove-button:hover{
      cursor: pointer;
  border-color: #f2f2f2;
  background-color: #4d89e3;
  border-radius: 5px;

    }
    
    .add-button:hover{
        background-color: #4d89e3;
  border-color: #f2f2f2;

    }

  .factory-details {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: linear-gradient(45deg, #6a1b9a, #8e24aa);
    color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .card {
    background-color: #2e2e2e;
    border: none;
    border-radius: 10px;
    padding: 20px;
    margin: 2px 0;
  }
  
  .card-title {
    font-size: 2rem;
    color:pink;

    margin-bottom: 15px;
  }
  
  .card-text {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  
  .chocolates-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .chocolate-card {
    background-color: #444;
    border-radius: 10px;
    padding: 10px;
    width: calc(50% - 20px); /* Adjust to fit two cards per row with gap */
    display: flex;
    align-items: center;
  }
  
  .chocolate-image {
    width: 120px;
    height: 120px;
    border-radius: 5px;
    margin-right: 20px;
  }
  
  .chocolate-info {
    flex-grow: 1;
  }
  
  .chocolate-info h3 {
    font-size: 1.8rem;
    margin-bottom: 5px;
    color:violet;
  }
  
  .chocolate-info p {
    font-size: 1.2rem;
    margin: 0;
  }
  </style>
  