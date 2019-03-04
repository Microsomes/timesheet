<!--

    @author Tayyab Javed
    @date 01/02/2019

    - all people page, here you will be able to view edit and update timesheet

-->


<style scoped>

    .fultime{
        background:green;
    }


</style>




<template>

    <div style="min-height:900px;">

        

        <h3 style="color:grey;text-align:center;">All Employees</h3>
        <p style="text-align:center;">All employees will be visible here</p>
        <div style="display:flex;align-items:center;justify-content:center;margin-top:10px;flex-flow:column">

            <button @click="backup_people" class="btn">Backup All People</button><br>
            <button @click="backup_timesheet" class="btn">Backup Timesheet data</button><br>
            <p>Keeping regular backups is recommended!! Pushing this button will trigger a backup to another firebase database</p>
        </div>

        
        <div class="container">

                

                <div style="min-height:300px;" class="card">
                    <h2 style="text-align:center;color:grey;padding:10px;">Search employee</h2>
                    <p style="text-align:center;color:grey;padding:10px;">You may search employees here. Please use full name and push enter</p>
                    <div class="container">
                    <input @keyup.enter="searchEmployee" v-model="employeeSearch" style="margin:20px;" type="text" placeholder="full name"/>
                    </div>
                </div>


            <div class="card" style="padding:20px;">

                <!--key-->
                <div class="card" style="display:flex;padding:10px;">
                    <div v-for="(n,i) in keys" :key="i" style="display:flex;border:1px solid lightgreynnp;width:300px;border-radius:5px;margin-left:20px;">
                        <div :style="{background:n.color}" style="height:50px;width:50px;background:green"></div>
                        <div style="height:50px;min-width:150px;display:flex;align-items:center;justify-content:center">{{n.text}}</div>
                    </div>
                 </div>

                 <bugDetected>Bug detected. The table is not color coded. Will be fixed somewhere around march time.</bugDetected>

                
            <table class="container">
        <thead>
          <tr>
               <th style="text-align:center;">Full Name</th>
              <th style="text-align:center;">IsFixed</th>
              <th style="text-align:center;">Lunch Allowance</th>
              <th style="text-align:center;">Start Time</th>
              <th style="text-align:center;">End Time</th>
              <th style="text-align:center;">Delete</th>
              <th style="text-align:center;">Summary</th>

              <th style="text-align:center;">Calendar</th>

          </tr>
        </thead>

        <tbody>
           <tr    v-for="(n,i) in allEmployees"   :key="i">
            <td style="text-align:center;">{{n.data.name}}</td>
            <td style="text-align:center;">{{n.data.isFixed}}</td>
            <td style="text-align:center;">{{n.data.lunchAllowance}}</td>
            <td style="text-align:center;">{{n.data.startTime}}</td>
            <td style="text-align:center;">{{n.data.endTime}}</td>
            <td style="text-align:center;"  v-if="showDelete==true" ><button @click="deletePeople(n.id)" class="btn">Delete</button></td>
            <td style="text-align:center;" v-if="showDelete==false" ><button style="background:red;"   class="btn">Delete Disallowed</button></td>
            <td style="text-align:center;"><button class="btn" @click="$router.push('/sheet/person/'+n.data.name)">V</button></td>
            
            <td><div style="width:200px;height:100px;">
                      <monthIndicator :employee="allEmployees[i]"></monthIndicator>

            </div></td>

         </tr>
      
        </tbody>
      </table>
            </div>
      </div>

    </div>

</template>


<script>


 import {storage,db,auth} from '../components/siteStuff/database/db.js';
 import bugDetected from '../mylittlesheet/comp/bugDetected.vue';

    import monthIndicator from './comp/comp/monthIndicator';
 
var fs = require('fs');


export default{
    data:function(){
        return {
            allEmployees:[],//all employees
            employeeSearch:'',
            showDelete:false,//only if account is nings show delete

            keys:[
                {
                    color:'green',
                    text:'Full time employees'
                },
                {
                    color:"purple",
                    text:"Non-Fixed time"
                }
            ]
        }
    },
    created(){  
        this.loadAllPeople();

        auth.onAuthStateChanged(auth=>{
            if(auth.email=="ning@colorwayprinting.com" || auth.email=="tayyab@colorwayprinting.com"){
                this.showDelete=true;
            }
        })
    },
    methods:{
        backup_timesheet(){
            //backup all data
             db.collection("/timesheet").doc("years").collection("/years").doc("2019").get().then(dcc=>{
                 console.log(dcc.data());
             })
        },

        backup_people(){
        let allEmployees=[];
            alert("Backing up now");
            db.collection("/sheet").doc("employees").collection("peoples").get().then(ref=>{
            ref.docs.forEach(item=>{
                allEmployees.push({
                    id:item.id,
                    data:item.data()
                });
            })

            let json=JSON.stringify(allEmployees);

                db.collection("/backups").doc("people").collection("/data").add({
                    json:json
                }).then(data=>{
                    alert("Done");
                })

        })
        },
        
            search(nameKey, myArray){
                var home=this;
                for (var i=0; i < myArray.length; i++) {
                    let curName=myArray[i].data.name.toLowerCase();
                    console.log(curName)
                    let nmK= nameKey.toLowerCase();
                    if (curName === nameKey) {
                        home.$router.push("/sheet/person/"+curName);
                        return myArray[i];
                    }
                }
            },
        searchEmployee(){
            //check if employee search v-model is filled
            if(this.employeeSearch.length>=2){
                //proceed with the search
                //search employees from the all employees list
                
                let empS= this.employeeSearch.trim().toLowerCase();
                empS.trim();
                console.log(empS)
                var res=this.search(empS,this.allEmployees);
                if(!res){
                    alert("cannot find. Please use full name");
                }
                console.log(res);
            }
        },
        loadAllPeople(){
            //method loads people
            var home=this;
        //load all employees
        this.allEmployees=[];
        db.collection("/sheet").doc("employees").collection("peoples").get().then(ref=>{
            ref.docs.forEach(item=>{
                home.allEmployees.push({
                    id:item.id,
                    data:item.data()
                });
            })
        })
        },
        deletePeople(id){
            if(prompt("Please push any key to process the delete")){
                db.collection("/sheet").doc("employees").collection("peoples").doc(id).delete();
                this.loadAllPeople();
            }else{

            }
             
        }
    },
    components:{
        bugDetected:bugDetected,
        monthIndicator:monthIndicator
    }
}



</script>