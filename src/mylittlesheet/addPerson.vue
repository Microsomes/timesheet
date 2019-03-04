<!--

    @author Tayyab Javed
    @date 01/02/2019

    - add person details

-->


<template>

    <div style="min-height:800px;">

        <h3 style="text-align:center;color:grey">Add Person to Timesheet</h3>
        <p style="text-align:center;color:grey">Please add all employee details here so the system can do smarter calculations</p>
        <div class="container"> 
        <form @submit.prevent="addPerson" class="card" style="padding:20px">
            <input v-model="fullname" type="text" placeholder="full name"/>
                
                <p>
                <label>
                    <input v-model="isFixed" type="checkbox" />
                    <span>Is this person on fixed time</span>
                </label>
                </p>

                <!-- is fixed time-->
                <div v-if="isFixed">
                    <!--this is option for only fixed user-->
                    <label>Start Time:</label>
                    <input v-model="startTime" type="time"/>
                    <p>This is the fixed start time. any minute after this point will be flagged as a late as their is no allowance set.</p>
                     <label>End Time:</label>
                    <input v-model="endTime" type="time"/>
                
                <p>After a 5 minute allowance any work after this time will be considered overtime</p>


                    <label>Typical (payable) Hours</label>
                    <input v-model="fixedPayableHours" type="time"/>
                    <p>For example if a typical person works from 08:00 to 17:00 that is 9 hours but only 8 is payable so put 08:00</p>
                </div>
                <!-- end fixed time-->
                 <label>Lunch Allowance:</label>
                <input v-model="lunchAllowance" type="time"/>
                <p>Please type the max lunch allowed for example if 1 hour is allowed then type 01:00</p>

                <input   type="submit" value="Add Person to DB" class="btn"/>


            <bugDetected>
                <slot><p style="color:grey">Please do not dublicate names. (even if their are two people with the same name just prefix 01 or something) The system will run in to a name collision if done.</p></slot>
            </bugDetected>
                

         </form>
        </div>
     </div>



</template>


<script>
 import {storage,db} from '../components/siteStuff/database/db.js';

 import bugDetected from './comp/bugDetected.vue';
 //import the nice bug detected view

export default{
    data:function(){
        return {
            isFixed:false,//determines if the person is a fixed user

            
                fullname:'',
                lunchAllowance:'',
                startTime:'',
                endTime:'',
                fixedPayableHours:''//this is the amount of hours the employee is usually paid for
            
        
        }
    },
    methods:{
        clearFields(){
            this.fullname="";
            this.lunchAllowance="";
            this.startTime="";
            this.endTime="";
            this.isFixed=false;
        },
        addPerson(){
            if(this.fullname.length<=0){
                alert("No name");
                return;
            }
            if(this.lunchAllowance.length<=0){
                alert("Lunch Allowance Not Set");
                return;
            }

            if(this.isFixed){
                
                if(this.startTime.length<=0){
                alert("Start Time not set");
                return;
                 }   

                 if(this.endTime.length<=0){
                alert("End Time not set");
                return;
                 }   

            }

            //process
            if(this.isFixed){
                //add in the full fixed time mode
                 db.collection("/sheet").doc("employees").collection("peoples").doc(this.fullname).set({
                name:this.fullname,
                isFixed:this.isFixed,
                startTime:this.startTime,
                endTime:this.endTime,
                lunchAllowance:this.lunchAllowance
                 })
                 alert("Done");
                 this.clearFields();
            }else{
                 db.collection("/sheet").doc("employees").collection("peoples").doc(this.fullname).set({
                name:this.fullname,
                isFixed:this.isFixed,
                lunchAllowance:this.lunchAllowance

                 })
                alert("Done");
                this.clearFields();

            }
            

            
        }
    },
    created(){

    },
    mounted(){

    },
    components:{
        bugDetected:bugDetected
    }
}


</script>