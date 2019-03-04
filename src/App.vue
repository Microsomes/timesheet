<template>
<div style="min-height:100px;background:lightgrey">

  <navigation v-if="$route.path!='/'"></navigation>

  <div   class="" id="app">
     <div v-if="$route.path=='/'" style="height:300px;">
     

     </div>
    <router-view/>
  </div>

 <Footer class="footer"></Footer>

  </div>
</template>

<style scoped>
  
</style>

<script>


 


export default{
  data:function(){
    return {

    }
  }
}

</script>
