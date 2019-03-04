<!--
    @author Tayyab Javed
    @date 14/02/2019
    this will be a component for auth
-->


<template>


    <div class="card" style="padding:20px;width:400px;">
         <h5 v-if="loginDetails.isLoggedIn" style="color:white">You are logged in as {{loginDetails.email}}</h5>
        <h5   v-if="loginDetails.isLoggedIn==false" style="color:white">Your access to this resource has been denied please login first<button style="margin:20px;" class="btn" @click="loginPage">Login</button></h5>
        <button v-if="loginDetails.isLoggedIn" @click="logOut" class="btn">Log Out</button>
        <p v-if="isAdmin">Admin mode actived</p>
    </div>


</template>

<script>
      import {auth} from '../.././components/siteStuff/database/db.js';

    export default{
        data:function(){
            return {
                isAdmin:false
            }
        },
        props:["loginDetails"],
        created(){
           
        auth.onAuthStateChanged(auth=>{
            if(auth.email=="ning@colorwayprinting.com" || auth.email=="tayyab@colorwayprinting.com"){
                this.isAdmin=true;
            }
        })
        },
        methods:{
            loginPage(){
                this.$router.push("/login");
            },
            logOut(){
                auth.signOut().then(data=>{
                    location.reload();
                })
            }
        }
    }

</script>


