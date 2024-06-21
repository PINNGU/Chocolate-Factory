<template>
    <div>
      <div class="search-container">
        <!-- Other search inputs -->
        <img src="http://localhost:3000/images/map.png" @click="openMapModal" class="location-icon">
      </div>
  
      <div v-if="isMapModalOpen" class="map-modal">
        <div class="map-modal-content">
          <span class="close" @click="closeMapModal">&times;</span>
          <div id="map" class="map"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import 'ol/ol.css';
  import { Map, View } from 'ol';
  import { Tile as TileLayer } from 'ol/layer';
  import { OSM } from 'ol/source';
  import { fromLonLat } from 'ol/proj';
  import { Overlay } from 'ol';
  import { toLonLat } from 'ol/proj';
  
  export default {
    data() {
      return {
        isMapModalOpen: false,
        selectedLocation: null,
        map: null,
        mapOverlay: null
      };
    },
    methods: {
      openMapModal() {
        this.isMapModalOpen = true;
        this.$nextTick(this.initializeMap); // Initialize the map after the modal is displayed
      },
      closeMapModal() {
        this.isMapModalOpen = false;
      },
      initializeMap() {
        this.map = new Map({
          target: 'map',
          layers: [
            new TileLayer({
              source: new OSM()
            })
          ],
          view: new View({
            center: fromLonLat([0, 0]), // Default center
            zoom: 2 // Default zoom level
          })
        });
  
        this.mapOverlay = new Overlay({
          element: document.getElementById('marker'),
          positioning: 'bottom-center',
          stopEvent: false
        });
        this.map.addOverlay(this.mapOverlay);
  
        this.map.on('click', (event) => {
          const coordinates = toLonLat(event.coordinate);
          this.selectedLocation = coordinates;
          this.mapOverlay.setPosition(event.coordinate);
          this.closeMapModal();
          this.$emit('location-selected', coordinates); // Emit the coordinates to the parent component
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .map-modal {
    display: block;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .map-modal-content {
    position: relative;
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 25px;
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  
  .map {
    width: 100%;
    height: 400px;
    cursor: url('http://localhost:3000/images/location.png'), auto; /* Replace with the path to your image */

  }
  
  .location-icon {
    cursor: pointer;
    width: 50px; /* Adjust the width as needed */
    height: 50px;
    
    /* Adjust the height as needed */
  }

  .custom-cursor {
  cursor: url('http://localhost:3000/images/location.png'), auto; /* Replace with the path to your image */
}
  </style>
  