<template>

    <h1 class="text-center mb-4" style="font-size: 3rem; color: #fff; background: linear-gradient(to right, #7F00FF, #E100FF); padding: 20px; border-radius: 12px;">Factory List</h1>

    <!-- Open Factories -->
    <div v-if="openedFactories.length > 0" class="mb-4">
      <h3 class="text-center mb-3" style="font-size: 2.5rem; color: white;">Open Factories</h3>
      <div class="row justify-content-center">
        <div v-for="(factory, index) in openedFactories" :key="factory.id" class="col-lg-4 col-md-6 mb-4">
          <div class="card" style="background: linear-gradient(to right, #8000ff, #ff00e6);border: 2px solid orangered;border-radius: 3%;">
            <div class="card-text">
              <h4 class="card-title" style="font-size: 2rem; color: #fff;">{{ factory.name }}</h4>
              
                <p  style="font-size: 1.5rem; color: #fff;"><strong>Working Hours:</strong> {{ factory.workingHours }}</p>
                <p style="font-size: 1.5rem; color: #fff;"><strong>Status:</strong> {{ factory.status }}</p>
              
            
              <p  style="font-size: 1.5rem; color: #fff;"><strong>Rating:</strong> {{ factory.rating }}</p>
              <router-link :to="`/factory/${factory.id}`" class="btn btn-light btn-lg">View Details</router-link>
            </div>
            
            
              <img :src="factory.logo" alt="Factory Image" style= "border-radius: 3% 3% 0 0; max-width: 60%;justify-content: right">
            
              
            
          </div>
        </div>
      </div>
    </div>

    <div v-if="closedFactories.length > 0" class="mb-4">
    <h3 class="text-center mb-3" style="font-size: 2.5rem; color: white;">Closed Factories</h3>
    <div class="row justify-content-center">
      <div v-for="(factory, index) in closedFactories" :key="factory.id" class="col-lg-4 col-md-6 mb-4">
        <div class="card" style="background: linear-gradient(to right, #8000ff, #ff00e6);border: 2px solid orangered;border-radius: 3%;">
          <div class="card-text">
            <h4 class="card-title" style="font-size: 2rem; color: #fff;">{{ factory.name }}</h4>
            <p style="font-size: 1.5rem; color: #fff;"><strong>Working Hours:</strong> {{ factory.workingHours }}</p>
            <p style="font-size: 1.5rem; color: #fff;"><strong>Status:</strong> {{ factory.status }}</p>
            <p style="font-size: 1.5rem; color: #fff;"><strong>Rating:</strong> {{ factory.rating }}</p>
            <router-link :to="`/factory/${factory.id}`" class="btn btn-light btn-lg">View Details</router-link>
          </div>
          <img :src="factory.logo" alt="Factory Image" style="border-radius: 3% 3% 0 0; max-width: 60%; justify-content: right">
        </div>
      </div>
    </div>
  </div>

    <!-- No Factories Message -->
    <div v-if="factories.length === 0" class="text-center mt-5">
      <p style="font-size: 2rem; color: #333;">No factories found.</p>
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

.first-part {
  display: flex;
  gap: 10px;
}

.card{
  display:flex;
  gap:100px;
  max-height: 200px;
}


.card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.btn-light {
  
  color: white;
  border-color: #fff;
}

.btn-light:hover {
  background-color: #4d89e3;
  border-color: #f2f2f2;
}

h1, h3 {
  font-weight: bold;
}

</style>
