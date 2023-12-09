import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useGalStore = defineStore({
  id:'gal',
  state:()=>({
    gals:[],
    gal:{}
  }),
  actions:{
    async getGals(){
      try{
        const res = await axios.get('/api/content')
        this.gals = res.data
      }catch(error){
        alert(error)
        console.log(error)
      }
    },
    async getGal(id){
      try{
        const res = await axios.get(`/api/content/${id}`)
        this.gal = res.data
      }catch(error){
        alert(error)
        console.log(error)
      }
    },
    async addGal(ga){
      try{
        const config = {headers:{'Content-Type':'multipart/form-data'}}
        await axios.post('/api/content',ga,{headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{
          console.log(res.data)
        }).catch((err)=>console.log('error uploading',err))
      }catch(error){
        alert(error)
        console.log(error)
      }
    },
    async updateGal(ga){
      try{
        const config = {headers:{'Content-Type':'multipart/form-data'}}
        await axios.put(`/api/content/${ga.id}`,ga,config)
      }catch(error){
        alert(error)
        console.log(error)
      }
    },
    async removeGal(id){
      try{
        await axios.delete(`/api/content/${id}`)
        this.getGals()
      }catch(error){
        alert(error)
        console.log(error)
      }
    },
    async addAgency(ag){
      try{
        const config = {headers:{'Content-Type':'application/json'}}
        await axios.post(`/api/content/${ag.GalId}/agencys`,ag,config)
        this.getGals()
      }catch(error){
        alert(error)
        console.log(error)
      }
    },
    async removeAgency(did,id){
      try{
        await axios.delete(`/api/content/${did}/agencys/${id}`)
        this.getGals()
      }catch(error){
        alert(error)
        console.log(error)
      }
    }
  },
  getters:{
    allGals(state){
      return state.gals
    },
    myGal(state){
      return state.gal
    }
  }
})
