
<style >
*{
    max-width: 100%;
}
</style>
<template>
    <div style="margin-bottom:30px;">
 
    <div class="container">
            <h5 style="color:lightgrey" >Admins Only Stay out!!!</h5>
            <p style="font-size:20px;" class="flow-text">However if you want to post something you may however stick to the tabboo theme and you may need to refresh the form to make the post type options show up.</p>

        <form>

             <select v-model="postMode">
  <option value="normal">Normal</option>
  <option value="picks">My Picks</option>
  <option value="rambaling">Rambaling</option>
 </select>
 <em v-if="!postMode">Pick a post type</em>
            <input v-model="title" type="text" placeholder="title"/>
           <wysiwyg v-model="body" />
                
            <br>

             <input  v-model="tagModel" placeholder="type a tag" type="text"/>

             <div class="input-field col s12">
                 <em>Thumbnail</em>
                 <div></div>
                    <input @change="handleImage" type="file"/>
            </div>

            <button @click="createPost" style="background:#EE6E73" class="btn">Submit</button>
            {{feedback}}
           
        </form>
    
    </div>

    </div>
</template>

<script>

   import FormData from 'form-data'
   import axios from 'axios'
var slugify = require('slugify')


export default{
    data:function(){
        return {
            body:'',
            title:'',
            tagModel:'',
            feedback:null,
            postMode:null,
            isImageAdded:false,
            imageFile:'',
            thumbnailURL:''
        }
    },updated(){
            document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  });
    },created(){
        document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  });
    },methods:{
        handleImage(evt){
            var home=this;
            //uploads th eimage
            this.isImageAdded=true;
            this.imageFile= evt.target.files[0];
            console.log(this.imageFile)

            let data= new FormData();
            var five= Math.floor(Math.random()*90000) + 10000;
            data.append('file',this.imageFile,this.imageFile.name+five)
            axios.post("https://socialstation.info/upload", data, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
                })
                .then((response) => {
                    //handle success
                    home.thumbnailURL=response.data;
                    console.log(response.data)

                }).catch((error) => {
                    //handle error
                });

        },
        createPost(){
            var home=this;
            //validates post
              if(!this.isImageAdded){
                this.feedback="add a thumnnail";
                return;
            }
            if(this.tagModel.length<=0){
                this.feedback="no tag";
                return;
            }
            if(this.body.length<=0){
                this.feedback="no content";
                return;
            }
            if(this.title.length<=0){
                this.feedback="no title";
                return;
            }
            if(!this.postMode){
                this.feedback="select a post type";
                return;
            }
           
            var tag= this.tagModel;
            var body= this.body;
            var title= this.title;
            var miniTitle= title.substring(0,10)
            var slug= slugify(miniTitle, {
            replacement: '-',    // replace spaces with replacement
            remove: null,        // regex to remove characters
            lower: true          // result in lower case
            })
            var thumbnail= this.thumbnailURL;

           if(this.postMode=='normal'){
                import('../components/siteStuff/database/world.js')
                .then((module) => {
                    // Do something with the module. 
                    module.world.add_post({title,body,tag,thumbnail,slug})

                    home.feedback="page submitted";
                    home.tagModel='';
                    home.body='';
                    home.title='';
                });
           }else if(this.postMode=='picks'){
               import('../components/siteStuff/database/world.js')
                .then((module) => {
                    // Do something with the module. 
                    module.world.add_post_mypicks({title,body,tag,thumbnail,slug})
                    home.feedback="page submitted";
                    home.tagModel='';
                    home.body='';
                    home.title='';
                });
           }else if(this.postMode=='rambaling'){
                import('../components/siteStuff/database/world.js')
                .then((module) => {
                    // Do something with the module. 
                    module.world.add_post_rambaling({title,body,tag,thumbnail,slug})
                    home.feedback="page submitted";
                    home.tagModel='';
                    home.body='';
                    home.title='';
                });
           }

            
        }
    }
}

</script>