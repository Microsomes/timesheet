<template>
   <div>
      <div class="row">
         <div class="col m9 offset-m1">
            <h2>Rambaling</h2>
            <div v-for="post in posts" :key="post.title">
               <div class="col l6 m12 s12">
                  <div class="card z-depth-5">
                     <div class="card-image">
                        <img :src="post.content.thumbnail">
                        <a><span class="card-title flow-text">{{post.content.title}}</span></a>
                        <router-link style="text-align:center;" :to="'post/'+post.content.slug" class="btn-floating halfway-fab waves-effect waves-light red btn-floating pulse">Open</router-link>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <!-- sidebar on bottom -->
         <div class="col m2 hide-on-med-and-up">
            <ul class="collection with-header">
               <li class="collection-header">
                  <div class="z-depth-4" style="background:#EE6E73;margin:px;min-height:50px;text-align:center;border:1px solid #EE6E73;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:20px;font-family: 'Roboto', sans-serif;color:white;">About</div>
               </li>
               <li class="collection-item">
                  <p style="font-size:14px;" class="flow-text">Whatstaboo.com talks about stories that no mainstream media dare to cover. We talk about the real world, exposing the truths of the world. Our mission is to cover lots of taboo topics and stories. If interested add this website to your bookmarks.</p>
               </li>
            </ul>
            <ul class="collection with-header">
               <li class="collection-header">
                  <div class="z-depth-4" style="background:#EE6E73;margin:20px;height:50px;text-align:center;border:1px solid #EE6E73;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:20px;font-family: 'Roboto', sans-serif;color:white">Top Tags</div>
               </li>

               <li v-for="tag in tagComp" :key="tag" class="collection-item">
                  <router-link :to="'/tag/'+tag"> {{tag}} </router-link>
                   </li>
              
            </ul>
         </div>
         <div class="col m2 hide-on-med-and-down">
            <ul class="collection with-header">
               <li class="collection-header">
                  <div class="z-depth-4" style="background:#EE6E73;margin:px;min-height:50px;text-align:center;border:1px solid #EE6E73;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:20px;font-family: 'Roboto', sans-serif;color:white;">About</div>
               </li>
               <li class="collection-item">
                  <p style="font-size:14px;" class="flow-text">Whatstaboo.com talks about stories that no mainstream media dare to cover. We talk about the real world, exposing the truths of the world. Our mission is to cover lots of taboo topics and stories. If interested add this website to your bookmarks.</p>
               </li>
            </ul>
            <ul class="collection with-header">
               <li class="collection-header">
                  <div class="z-depth-4" style="background:#EE6E73;margin:20px;height:50px;text-align:center;border:1px solid #EE6E73;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:20px;font-family: 'Roboto', sans-serif;color:white">Top Tags</div>
               </li>
                
                <li v-for="tag in tagComp" :key="tag" class="collection-item">
                  <router-link :to="'/tag/'+tag"> {{tag}} </router-link>
                   </li>            
            </ul>
         </div>
      </div>
   </div>
</template>
<script>
   import {db} from '../siteStuff/database/db.js';
   
   var postsRef= db.collection('posts');

   var _= require('underscore');
   
   
   
   export default{
       data:function(){
           return {
               posts:[],
               tags:[]
           }
       },created(){
           var home=this;
           //load all the recent posts here
           postsRef.where('content.postType','==','rambaling').get().then(doc=>{
               console.log(doc);
       doc.docs.forEach(d=>{
           var data=d.data();
           home.posts.push(data)   
        
         var tag= data.content.tag;
         home.tags.push(tag);

       });
   })
           
       },computed:{
           tagComp(){    
               return _.uniq(this.tags)
           }
       }
   }
   
</script>