<style>
  .redC{
    background:rgba(245, 246, 250, 0.295);
    border-radius: 20px;
    color:black;
  }
</style>

<template>

    <div>
 
  <nav style="background:black;" class="nav-extended">
     <div class="nav-wrapper">

      <div style="text-align:center;" href="#" class="brand-logo hide-on-large-only">
       <router-link to="/"> mylittletimesheet.com</router-link>
       <button></button>
        </div>
        <div style="padding:20px;">
          <authStatus style="background:grey;color:white;width:400px;padding:40px;" :loginDetails="loginDetails"></authStatus>
        </div>
         <button target="_blank" class="btn"><a href="https://firebasestorage.googleapis.com/v0/b/colorway-4f6cf.appspot.com/o/Timesheet%20instructions.pdf?alt=media&token=958feba6-e843-420a-8d2a-89c3535bac04" download>Download Instructions</a></button>
      
      <div style="text-align:center;margin-left:20px;" href="#" class="brand-logo hide-on-med-and-down">
       <router-link to="/admin"> TimeSheet.com</router-link>       
          

        </div>


      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
  <li v-for="link in sideLinks" :key="link.name">
        <router-link  :to="link.route">{{link.name}}</router-link>
    </li>
        
      </ul>
    </div>
    <div class="nav-content">
      <ul class="tabs tabs-transparent">
                
                <div  class="row hide-on-med-and-down	">
                <div class="col m6 offset-m4">
               <li v-for="link in navLinks " :key="link.name" class="tab">
                  <router-link  v-bind:class="{ redC:linkPath==link.route }"  :to="link.route">{{link.name}}</router-link>
                  </li>
                </div>
                </div>
                <!-- ONLY SHOW THE ABOVE ON LARGE MODE-->

                  <div  class="row hide-on-large">
                <div class="col 12">
                <li v-for="link in navLinks " :key="link.name" class="tab">
                  <router-link  v-bind:class="{ redC:linkPath==link.route }"  :to="link.route">{{link.name}}</router-link>
                  </li>
                 
                </div>
                </div>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="mobile-demo">
    <li v-for="link in sideLinks" :key="link.name">
        <router-link  :to="link.route">{{link.name}}</router-link>
    </li>
         
  </ul>

 
    </div>

</template>


<script>

 $(document).ready(function(){
    $('.sidenav').sidenav();
  });


  import {auth} from '../.././components/siteStuff/database/db.js';

  import authStatus from './authStatusComp.vue';

   
export default{
    data:function(){
        return {
          loginDetails:{
            email:'',
            isLoggedIn:''
          },
          navLinks:[
            {
              name:'Add Person',
              route:'/sheet/addperson'
            },
             {
              name:'Timesheet Calc',
              route:'/sheet/sheet'
            },
             {
              name:'All People',
              route:'/sheet/all'
            }
          ],
          sideLinks:[
            {
              name:'Suggest Something',
              route:'/suggest'
            },
             
            
            
          ]
        }
    },created(){
      var r= this.$route.fullPath.split("/")[1];

      auth.onAuthStateChanged(data=>{
        console.log(data.email);
        if(data){
           this.loginDetails.email=data.email;
          this.loginDetails.isLoggedIn=true;
         }else{
          alert("Not signed in");
            this.loginDetails.email="";
          this.loginDetails.isLoggedIn=false;
        }
      })

      console.log(r);
    },computed:{
      linkPath(){
        return this.$route.fullPath.split("/")[1]
      }
    },
    components:{
      authStatus:authStatus
    }
}

</script>