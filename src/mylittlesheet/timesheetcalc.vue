<!--

    @author Tayyab Javed
    @date 01/02/2019

    -- this will simulate the main time sheet and show calculations

-->

<template>

    <div style="min-height:1400px;" >

        <h2 style="text-align:center;color:grey">Time Sheet</h2>
        <p style="text-align:center">Timesheet</p>
        <div class="container">

            
        <!-- start of step 1-->
        <div style="min-height:100px;padding:20px;" class="card">
            <h2 style="text-align:center;">Step 1</h2>
            <p style="text-align:center;">Pick a person to add time for</p>

            
            <!--shows the amount of months that have been logged by THIS member-->
            <div class="card" style="min-height:300px">
                <h2 style="text-align:center;color:grey">Month Insights</h2>
                <p style="text-align:center;">This will show all the months that have been logged for. For example if you have only logged January for person A then below will show the January online</p>
                                <div class="container">
                                <table>
                                <thead>
                                <tr>
                                    <th >Month</th>
                                    <th>Is Saved</th>
                                    <th>D</th>
                                 </tr>
                                </thead>

                                <tbody>
                                <tr v-for="(n,i) in monthlyInsights" :key="i">
                                    <td>{{n}}</td>
                                    <td>True</td>
                                    <td><button @click="deleteTimesheet(n)" class="btn">Delete record</button></td>
                                 </tr>
                               
                                </tbody>
                            </table>
                            </div>
            
            </div>
            <!-- end shows the amount of months that have been logged by this member-->

              <label>Person Selector</label>
                <select @change="updateSelectPerson"  v-model="selectedPerson" class="browser-default">
                    <option value="" disabled selected>Pick a Employee</option>
                    <option v-for="(n,i) in allEmployees" :value="n" :key="i">{{n.data.name}}</option>
                 </select>    
                 <p style="color:grey">The above is where you select the person you would like to log</p>


                 <div style="height:100px;" class="card">
                    <personCardDetails :selectedPerson="selectedPerson"></personCardDetails>     
                </div>   
        </div>
         <!--end of step 1-->
        
        <!-- start of step 1-->
        <div style="min-height:100px;padding:20px;" class="card">
            <h2 style="text-align:center;">Step 2</h2>
            <p style="text-align:center;">Pick a Month</p>
            <bugDetected>
                <p style="color:grey">DO NOT PICK A MONTH THAT HAS ALREADY BEEN LOGGED FOR THE SELECTED EMPLOYEE. A bug has been detected that could corrupt data if done. This will be fixed soon.</p>
            </bugDetected>
             
 

              <label>Month Selector</label>
                <select @change="selectedMonthC" v-model="selectedMonth" class="browser-default">
                    <option value="" disabled selected>Pick a Month</option>
                    <option v-for="(n,i) in allMonths" :value="{month:n,index:i}" :key="n">{{n}}</option>
                 </select>       
        </div>
        
        <!--end of step 1-->


            <button @click="process3" class="btn">Open timesheet</button>
            <p>Please only press this button after you have selected a month and an employee</p>

             <!-- start of step 1-->
        <div v-show="isStep3" style="min-height:100px;padding:20px;" class="card">
            <h2 style="text-align:center;">Step 3</h2>
            <p style="text-align:center;">Fill in the timesheet</p>
            
            <div style="border:1px solid black;padding:20px;display:none" class="card">
                <h4 style="text-align:center;color:grey">Typical Times</h4>
                <div class="card">
                    <h2 style="color:grey;text-align:center;">Current Typical</h2>
                     <div style="min-height:300px;" class="container"> <!--start of table container that shows the current typical timingss-->
                        <table>
                            <thead>
                            <tr>
                                <th v-for="(n,i) in typicalTimeings[0]" :key="i">{{i}}</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr v-for="n in typicalTimeings">
                                <td v-for="a in n">{{a}}</td>
                                </tr>
                            
                            </tbody>
                        </table>
                    </div><!-- parent that hosts the table that shows the typical timings ends-->
                </div>
                <typicalTime></typicalTime>
            </div>

            <timesheetcomp ref="mainsheet"  :data="selectedPerson"></timesheetcomp>

        </div>
        <!--end of step 1-->

        
             <!-- start of step 1-->
        <div v-show="isStep3" style="min-height:100px;padding:20px;" class="card">
            <h2 style="text-align:center;">Step 4</h2>
            <p style="text-align:center;">Please check all timeing above has been entered correctly. Deep Analysis will take place in the background and be ready in a few minutes. In the meantime you may log another employees data.</p>
            <button @click="submitTimings" class="btn pulse">Submit Timesheet of {{selectedPerson}}</button>

 
        </div>
        <!--end of step 1-->



  


        </div>

    </div>

</template>

<script>

import moment from 'moment';
import {storage,db} from '../components/siteStuff/database/db.js';
import timesheetcomp from './comp/timesheet.vue';
//timesheetcomp

import typicalTime from './comp/typicaltime.vue';

import {bus} from '../main.js';

var typicalRef= db.collection("/typicaltimes");
    //refernece for the typical timgins


    //personCrdDetails import
    import personCardDetails from './comp/personCardDetails.vue';

    import bugDetected from './comp/bugDetected.vue';


export default{
    data:function(){
        return {
            allMonths:[],//all months will be stored here
            allEmployees:[],//all employees will be stored here

            selectedPerson:[],//which person has been selected
            selectedMonth:[],//stores the month the suser hs selectred

            isStep3:false,//determines weather to show step 3 or not

            typicalTimeings:[],//stores all the typical timings 

            monthlyInsights:[],//this will be populated with the monthly insights
        }
    },
    created(){
        
        this.allMonths= moment.months();
        this.loadAllPeople();
        this.loadTypicalTimings();
 
        
           bus.$on("sendSheet",data=>{
                
            this.addTimeSheetToDB(data);
              
            })
    },
    methods:{
        addTimeSheetToDB(data){
               console.log("you would like to save this sheet for the selected month",this.selectedMonth.month);
               console.log(data);
             db.collection("/timesheet").doc("years").collection("/years").doc("2019").collection("/months").doc(this.selectedMonth.month).collection("/users").doc(this.selectedPerson.data.name).set({
                                ...data
                            }).then(status=>{
                                bus.$emit("clear","clear now");
                                //just keep a log of which months have been filled
                                db.collection("/timesheetlogs").doc(this.selectedPerson.data.name).collection("/months").doc(this.selectedMonth.month).set({
                                    month:this.selectedMonth.month
                                })
                                //instruct the timehseet to clear its data right now
                                alert("Record saved for "+this.selectedPerson.data.name);
                                
                                location.reload();
                            
                            })
        },
        deleteTimesheet(data){
            //this will delete the timesheet record of the currently selected person
            alert("CANNOT_DEL_ERR NO_PERMISSION");
            return;
            console.log("i was asked to delete the timesheet record");
            console.log(data);
            console.log(this.selectedPerson);
                
                var ref= db.collection("/timesheet").doc("years").collection("/years").doc("2019").collection("/months").doc(data).collection("/users").doc(this.selectedPerson.data.name);
                
                if(prompt("are you sure you want to delete push any key to delete")){
                    ref.delete().then(status=>{
                        console.log("deleted");
                    }).catch(err=>{
                        console.log("cannot delete");
                    })
                     var timeLogRef=db.collection("/timesheetlogs").doc(this.selectedPerson.data.name).collection("/months").doc(data);
                    timeLogRef.delete().then(d=>{
                        alert("Deleted");
                        location.reload();
                    })
                    
                }else{
                    alert("Nothing has been deleted");
                }
        },
        loadTypicalTimings(){
            //convenience method that will load all the normal typical timings
                typicalRef.onSnapshot(data=>{
            
                    if(data.empty){
                        //their is no typical timings this happens only at the start of the hand over but eventually the user will add some timings
                        this.typicalTimeings=[];
                        //tell the user their is no typical timings and they should add some
                    }else{
                        this.typicalTimeings=[];
                        data.forEach(item=>{
                            if(item.id!="config"){
                                let data= item.data();
                                this.typicalTimeings.push(data);
                            }
                        })
                    }
                })
        },
        process3(){
            //check if employee and month is selected
            console.log(this.selectedPerson);
            console.log(this.selectedMonth);

            if(this.selectedPerson.length==0){
                alert("Please select a person thanks");
                return;
            }
            
            if(this.selectedMonth.length==0){
                alert("Please select a month");
                return;
            }
            this.updateSelectPerson();
            this.selectedMonthC();



            db.collection("/timesheet").doc("years").collection("/years").doc("2019").collection("/months").doc(this.selectedMonth.month).collection("/users").doc(this.selectedPerson.data.name).get().then(data=>{
                                if(data.exists){
                                    //data does exists
                                    var d=data.data();
                                    //stores the data coming in from the server
                                    var mainsheet= this.$refs.mainsheet;

                                    bus.$emit("selectedMonthi",this.selectedMonth);
                                    //send the timesheet the month we selected


                                    //links to the timesheet view object that is present on this page
                                    mainsheet.loadDataExternally(d);
                                    //loads the data to the timesheet externally
 
 
                                    
                                }else{
                                 
                                }
                            })

            this.isStep3=true;
         },
        submitTimings(){
            //this will submit the timings

            //ask timesheet for its timesheet data right now
            //bus.$emit("retrieveSheet","please");
            //asl the timesheet to send the data

            var mainsheet= this.$refs.mainsheet;

            var timeSheetData=mainsheet.externallyGrabData();
            //call timesheets external method to grab its data
            
            this.addTimeSheetToDB(timeSheetData);
         
        },
        selectedMonthC(){
            console.log(this.selectedMonth);
            bus.$emit("selectedMonthi",this.selectedMonth);
            //sends emit to timesheet that the selected month has been selected
        },

        updateSelectPerson(){
            //will be callled when i send it to the main timesheet component
            bus.$emit("selectedPerson",this.selectedPerson);

            
       
            var monthyInsightsRef= db.collection("/timesheetlogs").doc(this.selectedPerson.data.name).collection("/months");
            //this is the ref for monthly insights
            monthyInsightsRef.get().then(data=>{
              this.monthlyInsights=[];

                data.docs.forEach(data=>{
                    let d= data.data();
                    console.log(data.id);
                    this.monthlyInsights.push(data.id);
                })
            })
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
    },
    mounted(){

    },
    components:{
        timesheetcomp:timesheetcomp,
        typicalTime:typicalTime,
        personCardDetails:personCardDetails,
        bugDetected:bugDetected
    }
}



</script>