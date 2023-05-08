<script lang="ts" setup>


const runtimeConfig = useRuntimeConfig()
const appConfig = useAppConfig()
const isLoggingIn = ref(false)

const changeLogStatus = (bool:boolean) => {

    if(bool){

        isLoggingIn.value = true
    }   else {

        isLoggingIn.value = false
    }
}


</script>
<template>

    <HeaderComponent @is-logging-in="changeLogStatus"/>
    <main class="homepage-container" :style="`background-image:url(${appConfig.theme.backgroundUrl});`">

        <LogComponent :isLoggingIn="isLoggingIn"/>

    </main>
  

</template>
<style>

.homepage-container {

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    background-size: cover; 


}



</style>
