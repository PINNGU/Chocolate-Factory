<template>
    <div>
      <h1>Factory List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Working Hours</th>
            <th>Status</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="factory in factories" :key="factory.id">
            <td>{{ factory.name }}</td>
            <td>{{ factory.workingHours }}</td>
            <td>{{ factory.status }}</td>
            <td>{{ factory.rating }}</td>
          </tr>
        </tbody>
      </table>
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
    mounted() {
      this.fetchFactories();
      console.log('Factories:', this.factories);
    },
    methods: {
      async fetchFactories() {
        try {
          axios.get('http://localhost:3000/api/factories').then(response => {
            this.factories = response.data;
            console.log(response.data);
          });
        this.factories = response.data;
        } catch (error) {
          console.error('Error fetching factories:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: black
  }
  
  th, td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
    background-color: black;
    
  }
  
  th {
    background-color: black;
  }
  </style>
  