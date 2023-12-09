<script setup>
import {onMounted,ref} from 'vue'
import {useRouter} from 'vue-router'
import {useGalStore} from '@/stores/gal'
const galStore = useGalStore()
const router = useRouter()
const file = ref(null)
const img = import.meta.env.VITE_PHOTOS
const newGal = {
  name:'',
  photo:''
}

const uploadFile = (event) =>{
  file.value = event.target.files[0]
  newGal.photo = file.value
}

const addNewGal = (newGal)  =>{
  galStore.addGal(newGal)
  router.go()
}

const rmvGal = (id) =>{
  galStore.removeGal(id)
  router.go()
}

onMounted(()=>{
  galStore.getGals()
})
</script>

<template>
  <div class="container">
    <form align='center'>
      <input type="text" v-model='newGal.name' placeholder="Enter Girl Name">
      <input type="file" @change='uploadFile' placeholder="upload file">
      <button @click.prevent='addNewGal(newGal)'>Add New Girl</button>
    </form>
  </div>
  <hr/>
  <div class="container">
    <div class="row row-cols-2">
      <div v-for="(g,ind) in galStore.gals" :key='g.id'>
        <div class="card m-2">
          <h1 class="card-top text-center"><RouterLink :to=" `${g.id}` ">{{g.name}}</RouterLink></h1>
          <p class="text-center"><img class="card-img-top img-fluid" :src=" `${img}/${g.photo}` "></p>
          <p class="text-center"><button class="btn btn-info" @click="rmvGal(g.id)">Remove</button></p>
        </div>
      </div>
    </div>
  </div>
</template>
