<template>
  <div class="factory-list">
    <header class="complex-header">
      <div class="overlay"></div>
      <div class="header-content">
        <h1 class="company-name">ChocolateFactory</h1>
        <p class="company-tagline">Sweetening Lives, One Chocolate at a Time</p>
        <p class="company-history">
          Since 1950, ChocolateFactory has been creating the finest chocolates using traditional methods and the highest quality ingredients. Step into our world and discover the passion and craftsmanship behind every piece of chocolate.
        </p>
      </div>
    </header>

    <div class="search-container">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search by name..."
      @keyup.enter="searchFactories"
    />
    <input
      type="number"
      v-model="gradeQuery"
      placeholder="Search by grade..."
      min="0"
      max="5"
      step="0.1"
      @keyup.enter="searchFactories"
    />
    <select v-model="selectedChocolate" class="chocolate-dropdown" >
      
      <option v-for="chocolate in chocolates" :key="chocolate.id" :value="chocolate.id">
        {{ chocolate.name }}
      </option>
    </select>
    <select v-model="selectedLocation" class="location-dropdown" >
      
      <option v-for="location in locations" :key="location.id" :value="location.id">
        {{ location.address }}
      </option>
    </select>
    <button @click="handleSearch">Search</button>
  </div>


    <!-- Open Factories -->
    <div v-if="openedFactories.length > 0" class="mb-4">
      <h3 class="text-center mb-3 section-header">
        <span class="line"></span>
        <span class="section-title">Open Factories</span>
        <span class="line"></span>
      </h3>
      <div class="factory-grid">
        <div v-for="(factory, index) in openedFactories" :key="factory.id" class="factory-card">
          <img :src="factory.logo" alt="Factory Image" class="factory-image">
          <div class="card-body">
            <h4 class="card-title">{{ factory.name }}</h4>
            <p class="card-text"><strong>Working Hours:</strong> {{ factory.workingHours }}</p>
            <p class="card-text"><strong>Status:</strong> {{ factory.status }}</p>
            <p class="card-text"><strong>Rating:</strong> {{ factory.rating }}</p>
            <router-link :to="`/factory/${factory.id}`" class="btn btn-light btn-sm">View Details</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Closed Factories -->
    <div v-if="closedFactories.length > 0" class="mb-4">
      <h3 class="text-center mb-3 section-header">
        <span class="line"></span>
        <span class="section-title">Closed Factories</span>
        <span class="line"></span>
      </h3>
      <div class="factory-grid">
        <div v-for="(factory, index) in closedFactories" :key="factory.id" class="factory-card">
          <img :src="factory.logo" alt="Factory Image" class="factory-image">
          <div class="card-body">
            <h4 class="card-title">{{ factory.name }}</h4>
            <p class="card-text"><strong>Working Hours:</strong> {{ factory.workingHours }}</p>
            <p class="card-text"><strong>Status:</strong> {{ factory.status }}</p>
            <p class="card-text"><strong>Rating:</strong> {{ factory.rating }}</p>
            <router-link :to="`/factory/${factory.id}`" class="btn btn-light btn-sm">View Details</router-link>
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
      factories: [],
      chocolates: [],
      locations: [],
      searchQuery: '',
      gradeQuery: '',
      selectedChocolate: '',
      selectedLocation: ''

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
    this.fetchAllFactories(); // Fetch all factories on mount
    this.fetchAllChocolates();
    this.fetchAllLocations();
  },

  methods: {
    async fetchAllFactories() {
      try {
        const response = await axios.get('http://localhost:3000/api/factories');
        this.factories = response.data;
      } catch (error) {
        console.error('Error fetching factories:', error);
      }
    },
    async fetchAllChocolates(){
      try {
        const response = await axios.get('http://localhost:3000/api/chocolates');
        this.chocolates = response.data;
      } catch (error) {
        console.error('Error fetching chocolates:', error);
      }
    },
    async fetchAllLocations(){
      try {
        const response = await axios.get('http://localhost:3000/api/locations');
        this.locations = response.data;
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    },
    async searchFactories(query) {
      try {
        const nameQuery = this.searchQuery;
        const gradeQuery = this.gradeQuery;
        const chocolateQuery = this.selectedChocolate;
        const locationQuery = this.selectedLocation;

        const searchParam = `${nameQuery}&${gradeQuery}&${chocolateQuery}&${locationQuery}`;
        const response = await axios.get(`http://localhost:3000/api/factories/search/${searchParam}`);
        this.factories = response.data;
        this.openedFactories = this.factories.filter(factory => factory.status === 'Open');
        this.closedFactories = this.factories.filter(factory => factory.status === 'Closed');
      } catch (error) {
        console.error('Error searching factories:', error);
      }
    },
    handleSearch() {
      
      console.log('Search button clicked');
      console.log('Search query:', this.searchQuery);
      if (this.searchQuery.trim() || this.gradeQuery || this.selectedChocolate || this.selectedLocation){
        console.log('Performing search...');
        this.searchFactories(this.searchQuery);
        console.log("posle");
      } else {
        console.log('Fetching all factories...');
        this.fetchAllFactories();
      }
    }
  }

};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Raleway:wght@700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  background-color: #eea333f1;
  margin: 0;
  padding: 0;
  color: white;
}

.factory-list {
  padding: 20px;
  background-color: #ffffff;
  width: 100%;
}

.complex-header {
  position: relative;
  background: url('https://source.unsplash.com/random/1920x600?chocolate,factory') no-repeat center center/cover;
  padding: 60px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: white;
  margin-bottom: 30px;
}

.complex-header .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
}

.header-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.company-name {
  font-size: 4rem;
  margin: 0 0 20px;
  font-family: 'Raleway', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.company-tagline {
  font-size: 1.5rem;
  font-style: italic;
  margin: 0 0 10px;
  color: #ffcc00;
}

.company-history {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #f3f3f3;
}

.section-header {
  font-size: 2.5rem;
  color: black;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.section-header .line {
  flex-grow: 1;
  height: 1px;
  background-color: black;
}

.section-title {
  color: black;
}

.factory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
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
  max-width: 400px; 
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
  font-family: 'Roboto', sans-serif;
}

.card-title {
  font-size: 1.25rem;
  color: #333;
  font-family: 'Roboto', sans-serif;
}

.card-text {
  font-size: 0.875rem;
  margin-bottom: 10px;
  color: #555;
  font-family: 'Roboto', sans-serif;
}

.btn-light {
  background-color: #ffcc00;
  color: #000;
  border: none;
  padding: 5px 10px;
  font-size: 0.875rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  font-family: 'Roboto', sans-serif;
}

.btn-light:hover {
  background-color: #eea333f1;
  color: #fff;
}



.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.search-container input {
  width: 30%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px 0 0 5px;
  outline: none;
}

.search-container button {
  padding: 10px 20px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-left: none;
  background-color: #ffcc00;
  color: #000;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.search-container button:hover {
  background-color: #eea333f1;
  color: #fff;
}

.chocolate-dropdown {
  width: 25%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
   border-radius: 5px 0 0 5px;
  
  outline: none;
}
.location-dropdown {
  width: 25%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
   border-radius: 5px 0 0 5px;
  
  outline: none;
}


</style>

