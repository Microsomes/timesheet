

<template>
<div style="min-height:300px;" class="container">
    <h5 style="color:grey;text-align:center;">Extra Time Log</h5>
    <p style="text-align:center;color:grey">This is the place where all extra time can be logged</p>
    <div class="card" style="min-height:300px;position:relative;display:flex;align-items:center;justify-content:center">
 
            <div class="container">
                <div style="min-height:200px;width:80%" class="card">
                     <div style="padding:20px;">
                            <table>
                                <thead>
                                <tr>
                                    <th>Note</th>
                                    <th>Time Given</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr v-for="(n,i) in extraTimeLogs" :key="i">
                                     <td v-for="(a,i) in n.data" :key="i">{{a}}</td>
                                     <td><button @click="deleteRecord(n)" class="btn">Delete</button></td>
                                 </tr>
                                
                                </tbody>
                            </table>
                     </div>
                </div>
            <div style="height:200px;width:80%" class="card">
                <div style="padding:20px">
                <form @submit.prevent="addNote">
                    <input  v-model="note" type="text" placeholder="note"/>
                    <input v-model="time" type="time"/>
                    <input class="btn" type="submit"/>
                </form>
                </div>
            </div>
            </div>
    </div>
</div>
</template>



<script>
 // Convert a time in hh:mm format to minutes
function timeToMins(time) {
  var b = time.split(':');
  return b[0]*60 + +b[1];
}

 import {storage,db} from '../../components/siteStuff/database/db.js';
 import {extraTimeDirectBus} from '../../main.js';

    export default{
        data:function(){
            return{
                time:'',
                note:'',
                extraTimeLogs:[],//extra times will be logged here
                ubsub:function(){},//

            }
        },
        created(){
         },
        methods:{
            resub(){
                   if(this.data.person){
                //person has been selected
                     let month=this.data.month.month;
                    let personName= this.data.person.name;

                        this.ubsub=db.collection("/extratime").doc("2019").collection("months").doc(month).collection("/person").doc(personName).collection("/logs").onSnapshot(data=>{
                            this.extraTimeLogs=[];
                            if(data.empty){
                                //no data
                            }else{
                                var totalExtra=0;
                                data.docs.forEach(item=>{
                                    this.extraTimeLogs.push({data:item.data(),id:item.id})
                                    totalExtra+=timeToMins(item.data().time);
                                })
                                this.$emit("extratime",totalExtra);
                            }
                        })

                    
            }else{
                alert("No person has been accepted OP_01")
            }
            },
            deleteRecord(item){
                var id=item.id;
                var toRemove=timeToMins(item.data.time);
                 this.$emit("removeExtraTime",toRemove)
              let month=this.data.month.month;
              let personName= this.data.person.name;
             db.collection("/extratime").doc("2019").collection("months").doc(month).collection("/person").doc(personName).collection("/logs").doc(id).delete();
            },
            clearFields(){
                this.time="";
                this.note="";
            },
            addNote(){
                if(this.time.length>=1){
                    if(this.note.length>1){

                        let month=this.data.month.month;
                        let personName= this.data.person.name;
                        
                        db.collection("/extratime").doc("2019").collection("months").doc(month).collection("/person").doc(personName).collection("/logs").add({
                            note:this.note,
                            time:this.time
                        }).catch(err=>{
                            alert("Error something went wrong. Contact your IT Support");
                        }).then(data=>{
                            alert("Added");
                            this.clearFields();
                        })

                    }else{
                        alert("no note given. Give a note to explain why the extra time was added")
                    }
                }else{
                    alert("Time too short")
                }
            }
        },
        props:['data'],
        watch:{
            data:function(){
                this.ubsub();
                this.resub();
            }
        }
    }
    

</script>