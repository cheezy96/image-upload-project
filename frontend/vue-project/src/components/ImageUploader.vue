<template>
    <div>
      <h2>Upload Image</h2>
      <input type="file" @change="onFileChange" />
      <button @click="uploadImage">Upload</button>
  
      <div v-if="uploadStatus">
        <p>{{ uploadStatus.message }}</p>
        <img v-if="uploadStatus.filePath" :src="uploadStatus.filePath" alt="Uploaded Image" width="200" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        selectedFile: null,
        uploadStatus: null,
      };
    },
    methods: {
      onFileChange(event) {
        this.selectedFile = event.target.files[0];
      },
      async uploadImage() {
        if (!this.selectedFile) {
          alert("Please select a file first!");
          return;
        }
  
        const formData = new FormData();
        formData.append('image', this.selectedFile);
  
        try {
          const response = await axios.post('http://localhost:5000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
  
          this.uploadStatus = response.data;
        } catch (error) {
          this.uploadStatus = { message: "Upload failed", error: error.response.data.error };
        }
      }
    }
  };
  </script>
  