<script setup>

const runtimeConfig = useRuntimeConfig()
const appConfig = useAppConfig()

const emit = defineEmits(['isLoggingIn'])
const isLoggingIn = ref(false)

const showLoginForm = () => {

    if(!isLoggingIn.value){
      
        isLoggingIn.value = true
        console.log('mode connexion activé')
        emit('isLoggingIn', true)
        
    }else {

        isLoggingIn.value = false
        console.log('mode inscription activé')
        emit('isLoggingIn', false)
    } 
 
}

</script>


<template>


    <header>
        <h4 class="font-bold">{{appConfig.title}}</h4>
        <button  v-on:click="showLoginForm"> {{!isLoggingIn ? "Se connecter" : "S'inscrire"}}</button>

    </header>

</template>

<style scoped lang="scss">

 header {

    font-family: "Gotham SSm";
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: solid rgba($color: #000000, $alpha: 0.3);
    padding-left: 10px;
    padding-right: 10px;
    height: 40px;
    justify-content: space-between;

   

    button {

        font-size: 12px;
        border: solid black 1px;
        padding: 2px 5px;
        &:hover {
            box-shadow: 1px 1px 1px black;
        }
    }
 }


</style>