<!--
    @author Tayyab Javed
    @date 14/02/2019

    -this is the login and logout page

-->


<template>

    <div style="min-height:1200px;">

        <div class="container" style="margin-top:20px;">
            <div style="border:1px solid black;height:500px;background:lightblue">
                <h2 style="text-align:center;color:grey">Login to timesheet</h2>
                <p style="text-align:center;">Your details will be emailed to you. </p>
                <div class="container">
                    Use email: test@test.com
                    Password: test123
                    <div class="card" style="padding:10px">
                        <form @submit.prevent="login">
                            <input v-model="username" type="text" placeholder="email"/>
                            <input v-model="password" type="password" placeholder="password"/>
                            <input class="btn" type="submit" value="Login"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>



<script>

import {auth} from '.././components/siteStuff/database/db.js';

export default{
    data:function(){
        return {
            username:'',//username
            password:''//password
        }
    },
    methods:{
        login(){
            if(this.username.length>=1){
                if(this.password.length>=1){
                    //process
                    auth.signInWithEmailAndPassword(this.username,this.password).then(auth=>{
                        if(auth.user){
                            alert("Logged in");
                            this.$router.push("/sheet/addperson");
                            location.reload();
                        }
                    }).catch(err=>{
                        alert(err);
                    })
                }else{
                    alert("Password too short");
                }
            }else{
                alert("Username too short to process");
            }
        }
    }
}



</script>