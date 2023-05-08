// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    //key
    runtimeConfig: {

        apiSecret: '',

        public: {
            apiBase:'/api'
        }
    },

    //key
    postcss: {

        plugins: {

            tailwindcss: {},
            autoprefixer: {},
        }
    

    },

    //key 
    css: ['~/assets/css/main.css','~/assets/css/_fonts.css'],

    modules : ["nuxt-lodash"],

    lodash: {
        prefix: "_",
        prefixSkip: ["string"],
        upperAfterPrefix: false,
        exclude: ["map"],
        alias: [
          ["camelCase", "stringToCamelCase"], // => stringToCamelCase
          ["kebabCase", "stringToKebab"], // => stringToKebab
          ["isDate", "isLodashDate"], // => _isLodashDate
        ],
    }
    
 


})
