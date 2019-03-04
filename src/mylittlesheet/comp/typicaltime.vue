<!--

    convenience timing
    a component for typing a typical timing makes adding times easier

    @author Tayyab Javed
    @date 11/02/2019
-->

<template>
    
    <div style="display:flex;align-items:center;flex-flow:column">
        <div v-for="(n,i) in typical" :key="i" style="border:1px solid grey;height:50px;width:400px;display:flex;">
            <div style="position:relative;width:40%;border:1px solid black;height:100%;display:flex;align-items:flex-start;justify-content:center;padding:20px;">
                <p style="position:absolute;top:0px;left:20px;color:grey">Label:</p>
                <input v-model="n.label" type="text" style="height:20px;" disabled/>
            </div>
             <div style="width:60%;border:1px solid black;height:100%;display:flex;align-items:center;justify-content:center;">
              <div>  <input v-model="n.time" type="time"/></div>
            </div>
        </div>

        <p style="text-align:center;color:grey;margin-top:10px">Typical times is a convenience function that will make data entry faster because you won't have to add repeated values manually multiple times. But before the system can help speed up the data entry please enter some of the times that are very common</p>

        <button @click="addTime" style="margin-top:20px;" class="btn">+</button>
        <button @click="savei()" style="margin-top:20px;" class="btn">save</button>
        <p style="text-align:center;color:grey;margin-top:3px;margin-top:10px;">Please save the typical timings</p>
    </div>

</template>


<script>


 import {storage,db} from '../../components/siteStuff/database/db.js';

    var typicalRef= db.collection("/typicaltimes");

export default{
    data:function(){
        return {
            typical:[
                {
                    label:'c1',
                    time:'',
                 }
            ],//stores all typical 
        }
    },methods:{
        removeTiming(label){
            //removes typical from array
             var index=0;
            
            for(var i=0;i<this.typical.length;i++){
                 var cur= this.typical[i];

                    if(cur.label==label){
                        console.log("label found");
                    }else{
                        index++;
                    }
             }

            console.log("found",index);
            this.typical.splice(index,1);
        },
        addTime(){
            var total= this.typical.length;
            var nIndex= total+1;
            this.typical.push({label:'c'+nIndex,time:''})
        },
        savei(){
             //check if all fields are filled;
            this.typical.forEach(item=>{
                if(item.time<=1){
                    alert("time of "+item.label+" not filled");
                }else{
                    alert("Saved "+item.label);
                    //save the time
                    
                    //fetch or save last index
                    
                      
                      typicalRef.doc("config").get().then(data=>{
                          if(data.exists){
                              //a previous index exists
                              var prev= data.data().index;
                              //grabs previous index;
                              var nIndex= prev+1;

                                typicalRef.add({
                                time:item.time,
                                label:"c"+nIndex
                                })
                                //overwrite the label starting with the previous index +1

                                 typicalRef.doc("config").set({
                                    index:nIndex
                                })
                                //update the prev index to be +1
                                

                          }else{
                              //no previous index exists
                                typicalRef.doc("config").set({
                                    index:1
                                })
                                typicalRef.add({
                                time:item.time,
                                label:item.label
                                })
                          }
                      })

                     

                    this.removeTiming(item.label);
                    //remove from editor
                }
            })

         }
    }
}


</script>