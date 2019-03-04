<template>
    <div>
         <div class="row">
      <div class="col l12 s12 m12 ">
            <h4 style="text-align:center" class="flow-text">{{post.title}}</h4>
           <img class="materialboxed responsive-img" :src="post.thumbnail"/>
           <span v-html="post.body"></span>



      </div>
   </div>
    </div>
</template>


<script>

import {db} from '../siteStuff/database/db.js';

var postsRef= db.collection('posts');


export default{
    data:function(){
        return {
            post:''
        }
    },created(){
        //load post
            var home=this;
            var r= this.$route.params.slug;
            
            
        //load all the recent posts here
        postsRef.where('content.slug','==',r).get().then(doc=>{
            console.log(doc);
    doc.docs.forEach(d=>{
        var data=d.data();
        home.post=data.content
        
    });
})
    }
}

</script>

<style>
 img { max-width: 100%;
 
  }

</style>