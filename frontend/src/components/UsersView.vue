<template>
  <div>
    <!-- Search Box -->
    <input type="text" v-model="searchQuery" placeholder="Search by name, surname, or username" class="search-box">
    
    <!-- Sorting Dropdown -->
    <select v-model="sortBy" class="sort-dropdown">
      <option value="">Sort by</option>
      <option value="name">Name</option>
      <option value="surname">Surname</option>
      <option value="username">Username</option>
      <option value="points">Points</option>
    </select>
    
    <!-- Sorting Order -->
    <select v-model="sortOrder" class="sort-order">
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
    
    <!-- Filter by Role -->
    <select v-model="roleFilter" class="filter-dropdown">
      <option value="">Filter by role</option>
      <option value="admin">Admin</option>
      <option value="manager">Manager</option>
      <option value="worker">Worker</option>
      <option value="customer">Customer</option>
    </select>
    
    <!-- Filter by Customer Type -->
    <select v-model="userTypeFilter" class="filter-dropdown">
      <option value="">Filter by customer type</option>
      <option value="Regular">Regular</option>
      <!-- Add other customer types as needed -->
    </select>
    
    <!-- User Cards -->
    <div class="user-cards-container">
      <div v-for="user in filteredUsers" :key="user.id" class="user-card">
        <h3>{{ user.name }} {{ user.surname }}</h3>
        <p><strong>Username:</strong> {{ user.username }}</p>
        <p><strong>Gender:</strong> {{ user.gender }}</p>
        <p><strong>Date of Birth:</strong> {{ user.dateOfBirth }}</p>
        <p><strong>Role:</strong> {{ user.role }}</p>
        <p><strong>Factory:</strong> {{ user.chocolateFactory }}</p>
        <p><strong>Points:</strong> {{ user.points }}</p>
        <p><strong>Customer Type:</strong> {{ user.customerType.name }}</p>
        <p><strong>Discount:</strong> {{ user.customerType.discountPercentage }}%</p>
        <p><strong>Points Required for Discount:</strong> {{ user.customerType.pointsRequiredForDiscount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      searchQuery: '',
      roleFilter: '',
      userTypeFilter: '',
      sortBy: '',
      sortOrder: 'asc' // 'asc' or 'desc'
    };
  },
  computed: {
    filteredUsers() {
      let filtered = this.users.filter(user => {
        // Filter by search query
        let searchRegex = new RegExp(this.searchQuery, 'i');
        return (
          searchRegex.test(user.name) ||
          searchRegex.test(user.surname) ||
          searchRegex.test(user.username)
        );
      });

      // Apply role filter
      if (this.roleFilter) {
        filtered = filtered.filter(user => user.role === this.roleFilter);
      }

      // Apply customer type filter
      if (this.userTypeFilter) {
        filtered = filtered.filter(user => user.customerType.name === this.userTypeFilter);
      }

      // Apply sorting
      if (this.sortBy && ['name', 'surname', 'username', 'points'].includes(this.sortBy)) {
        filtered.sort((a, b) => {
          let aValue = a[this.sortBy];
          let bValue = b[this.sortBy];

          if (this.sortOrder === 'asc') {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        });
      }

      return filtered;
    }
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  }
};
</script>

<style scoped>
.user-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.user-card {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-card h3 {
  margin-top: 0;
  color: #333;
}

.user-card p {
  margin: 5px 0;
  color: #666;
}

.search-box,
.sort-dropdown,
.sort-order,
.filter-dropdown {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

</style>
