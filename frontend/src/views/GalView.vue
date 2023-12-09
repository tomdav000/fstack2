<script setup>
import {onMounted,ref} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import {useGalStore} from '@/stores/gal'
const galStore = useGalStore()
const router = useRouter()
const route = useRoute()
const file = ref(null)
const img = import.meta.env.VITE_PHOTOS

const addAg = {
	title:'',
	location:'',
	GalId: route.params.id
}

const updGal = {
  id:route.params.id,	
  name:'',
  photo:''
}

const addNewAgency = (addAd) =>{
	galStore.addAgency(addAd)
	router.go()
}

const uploadFile = (event) =>{
  file.value = event.target.files[0]
  updGal.photo = file.value
}

const updGalInfo = (updGal)  =>{
  galStore.updateGal(updGal)
  router.go()
}



onMounted(()=>{
  galStore.getGal(route.params.id)
})
</script>

<template>
  <div class="container">
    <form align='center'>
      <input type="text" v-model='updGal.name' placeholder="Enter Girl Name">
      <input type="file" @change='uploadFile' placeholder="upload file">
      <button @click.prevent='updGalInfo(updGal)'>Update Girl</button>
    </form>
  </div>
  <hr/>
  <div class="container">
        <div class="card m-2">
          <h1 class="card-top text-center">{{galStore.gal.name}}</h1>
          <p class="text-center"><img class="card-img-top img-fluid" :src=" `${img}/${galStore.gal.photo}` "></p>
          <div v-for='(a,ind) in galStore.gal.agencys' :key='a.id'>
          	<p class="text-center fs-4">{{a.title}} is in {{a.location}}</p>
          </div>
        </div>
  </div>
  <hr/>
  <div class="container">
  	<form align='center'>
  		<input type="text" v-model='addAg.title' placeholder="Enter Name of Agency">
  		<input type="text" v-model='addAg.location' placeholder="Location of Agency">
  		<button class="btn btn-warning" @click.prevent='addNewAgency(addAg)'>Add Agency</button>
  	</form>
  </div>
</template>
