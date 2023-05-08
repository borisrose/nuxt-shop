<script setup lang="ts">

onMounted(() => {


    console.log('on LogComponent mouting', props.isLoggingIn)
})

interface ILogProps {
    isLoggingIn: boolean;
}

interface User {

    email?: string;
    password?: string;
    confirmed_password?: string;
}

const isFormCompleted = ref(false);
const user = reactive<User>({});
const props = defineProps<ILogProps>();
const passwordError = ref(false)
const passwordTooShort = ref(false)
const emailError = ref(false)
const counter = ref(0)
const validEmail = ref<boolean>()


const handleLog = async() => {

    counter.value += 1
    console.log('cv',counter.value)

    const data = {
            
        user_email : user.email,
        user_password : user.password
    }

    if(!props.isLoggingIn){

        //SIGN UP
      

        await fetch('http://localhost:3300/api/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)

        })
        .then(() => {

      
            navigateTo({

                path : `/session/${data.user_email}`,
                
                

            })



        })

      


    }
    else {

        //LOGIN 

        await fetch(`http://localhost:3300/api/read/${data.user_email}`, {

            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)


        })
        .then((res) => {
            if(res.status === 500) {
                console.log('email invalid')
                validEmail.value = false
                
        
            }
          

            if(res.status === 200) {

                console.log('email valid')
                validEmail.value = true
                navigateTo({

                    path : `/session/${data.user_email}`,
                   
                  

                })

            }

        })
        



    }

}


const checkError = (user: User, isLoginMode: boolean):boolean => {

    //common checks 
    if(!user.password || !user.email) return false; 

    if(user.email && (!user.email.includes('@')  || !user.email.includes('.'))) {
        emailError.value = true;
        return false;
    } else {

        emailError.value = false;
    }

    if(user.email && user.email.length < 6){
        emailError.value = true;
        return false;
    }
    else {
        emailError.value = false;
    }

    if(user.password && user.password.length < 6){
        passwordTooShort.value = true;
        return false
    }
    else {
        passwordTooShort.value = false
    } 

    if(!isLoginMode){

       if(!user.confirmed_password) return false;
       if(user.confirmed_password !== user.password) {
        passwordError.value = true;
        return false
       }
       else {
        passwordError.value = false;
       }
       
    }
   
    
    return true;


}

watch(() =>_cloneDeep(user), (user) =>{

    if(props.isLoggingIn){

        isFormCompleted.value = checkError(user, true)
    }
    else {
    
       
        isFormCompleted.value = checkError(user, false)
       
      
    }

})



</script>

<template>


    <form @submit.prevent="handleLog" class="log-form">

        <h4 class="font-semibold"> {{ props.isLoggingIn ? 'Connexion' : 'Inscription' }}</h4>

        <div class="form-inputs-container">

            <div class="log-input-container">
                <input type="text" :placeholder="props.isLoggingIn ? 'Identifiant' : 'Email'" v-model="user.email" />
                <div class="error-message"><p v-if="emailError">Email invalide</p></div>
            </div>
            <div class="log-input-container">
                <input type="text" placeholder="Mot de passe" v-model="user.password" />
                <div class="error-message"><p v-if="passwordTooShort">Mot de passe invalide</p></div>
            </div>
            <div class="log-input-container" v-if="!props.isLoggingIn">
                <input type="text" placeholder="Confirmer le mot de passe" v-model="user.confirmed_password"  />
                <div class="error-message"> <p v-if="passwordError"> Les mots de passe doivent être identiques</p></div>
            </div>
        </div>
     
        <div class="log-button-container">

            <button  type="submit"  v-if="isFormCompleted"> {{ props.isLoggingIn ? "Se connecter" : "S'inscrire" }}</button>
        </div>


        <div class="log-message-container" v-if="(validEmail || !validEmail) && props.isLoggingIn && counter > 0">

           <p :class="{'green-message': validEmail}">{{ validEmail ? 'Email valide' : 'Email invalide' }} </p>

        </div>

    </form>


</template>


<style lang="scss">


.log-form {

    display: flex;
    flex-direction: column;
    width: 70%;
    animation: log-form-anim 1000ms ease-in-out;
    height: 60%;
    justify-content: space-evenly;
   
    color: white;
    background-color: rgba($color: #000000, $alpha: 0.4);
    border-radius: 10px;

    padding: 0 10px;

    .green-message {
        color: white;
        font-size: bold;
        background-color: green;
        width: 100%;
    }

    .log-message-container {

        animation: messageAnim 1000ms ease-in forwards;
        width: 100%;
        align-items: center;
        justify-content: center;
        background-color: rgb(169, 49, 49);
        display: flex;
        color: white;
        p {
            width: 100%;
          
            padding: 0 5px;
           
        }
    }

    button {
        align-self: center;
      
        padding: 10px 30px;
        border-radius: 10px;
        opacity: 0;
        color: white;
        animation: button-anim 400ms ease-in-out forwards;
        background-color: #000000;

    }

    .log-button-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
    }
    
}

.form-inputs-container {

    display: flex;
    flex-direction: column;
    width: 100%;

    height: 60%;
    justify-content: space-evenly;




    .log-input-container {

      
        display: flex;
        width: 100%;

        flex-direction: column;
        .error-message {
            height: 30px;
            display: flex;
            align-items: center;
 
           
            p { 

                font-size: 12px;
                color: red;
                opacity: 0;
                animation: error-anim 400ms ease-in-out forwards;
            }
        }


      
        input {
            height: 40px;
        
            width: 100%;
            border-radius: 10px;
            padding-left: 10px;
            color: black;
        }
    }
    
}

@keyframes error-anim {

    from {
        opacity: 0;
        transform: translateX(-100%);
    }
    
    to {
        opacity: 1;
        transform: translateX(0%);
    }
}


@keyframes log-form-anim {

    from {
        opacity: 0;
        transform: translateY(-200%);
    }

    to {
        opacity: 1;
        transform: translateX(0%);
    }
}

@keyframes button-anim {

    from {
        opacity: 0;
        transform: translateY(200%);
    }

    to {
        opacity: 1;
        transform: translateY(0%);
    }
    
}

@keyframes messageAnim {

    from {

        opacity: 0;
        transform: translateY(400px);
    }

    to {

        opacity: 1;
        transform: translateX(0);
    }
    
}
</style>