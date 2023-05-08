<script setup lang="ts">


const {pending, data:products} = await useLazyFetch('http://localhost:3300/api/products', {


    //interceptors
    onRequestError({request, options, error}) {

        console.log('onRequestError activated callback',error)
    },


    onResponse({request, response, options}){

        console.log('onResponse activated callback', response._data)
        

    },

    onResponseError({request, response, options}){

        console.log('onResponseError activated callback', response)
    }


});


const newProducts= ref<any>(products)

watch(products, (newProduct) => {

    console.log('nouveaus produits ...')
})









</script>
<template>


    <div class="session-page-contaier"> 
        
       
        <div class="products-loading-container" v-if="pending">

            Chargement en cours ...

        </div>
        <div class="products-container" v-if="products">



            <div class="product-container" v-for="product in newProducts" v-bind:key="product">

                <img :src="product.url"/>
                <div class="product-info-container">
                    <span>{{ product.name }}</span>
                </div>

                <div class="product-price-container">
                    <span>{{ product.price }}</span>
                </div>

            </div>


        </div>
      
    
    </div>


</template>
<style scoped lang="scss">


.session-page-contaier {


    display: flex;
    flex-direction: column;
    align-items: center;
   
    height: 100vh;


    .products-container {

        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 20px;
        position: relative;
   

        justify-content: space-evenly;
        .product-container {
            margin-bottom: 10px;
            width: 40%;
            position: relative;
            display: flex;
            height: 200px;
            overflow: hidden;


            &:hover {
                cursor: pointer;
            }

            &:hover > img {

                transform: scale(1.2);
            }
        

            img {
                position: absolute;
                z-index: 1;
                object-fit: cover;
                width: 100%;
                height: 100%;
                transition: 400ms;

            }

            .product-info-container{

                z-index: 10;
                position: absolute;
                top: 10px;
                left: 10px;
                background-color: rgba($color: #000000, $alpha: 0.7);
                padding: 5px;
                color: white;
            }

            .product-price-container{


                z-index: 8;
                position: absolute;
                right: 10px;
                bottom: 10px;
                background-color: rgba($color: #000000, $alpha: 0.7);
                padding: 5px;
                color: white;



            }

        }
    }
}


</style>



