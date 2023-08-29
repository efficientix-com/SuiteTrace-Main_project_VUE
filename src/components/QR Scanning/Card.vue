<template>
    <div class="card">{{ card.title }}</div>
  </template>
  
  <script>
  export default {
    name:'CardComponent',
    props: ['card'],
  };
  </script>
  
  <style>
  .card {
    padding: 10px;
    margin: 5px;
    background-color: #f0f0f0;
    border-radius: 4px;
  }
  </style>