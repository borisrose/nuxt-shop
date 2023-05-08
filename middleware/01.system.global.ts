export default defineNuxtRouteMiddleware ((to, from) => {

    if(to.params.mail){
   
        console.log(from, to)
        console.log('on-going session')

    }
  

  


})