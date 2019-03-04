<!--

    @author Tayyab
    @date 07/02/2019

    - view person details
-->


<template>

    <div style="min-height:900px;">
          <h3 style="color:grey;text-align:center;">{{fname}}</h3>
        <p style="text-align:center;">You are viewing employee record. Only 2019 records will be visible</p>
        
        <div class="container">
            <!--start of card-->
        <div class="card" style="padding:10px;">
            <h2 style="text-align:center;">Step 1</h2>
            <p style="text-align:center;">Pick a Month in 2019 you would like to view</p>
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
                                 </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(n,i) in monthlyInsights" :key="i">
                                    <td>{{n}}</td>
                                    <td>True</td>
                                 </tr>
                                </tbody>
                            </table>
                            </div>
            </div>
            <!-- end shows the amount of months that have been logged by this member-->
             <label>Month Selector</label>
                <select  @change="monthSelectedSync" v-model="selectedMonth"   class="browser-default">
                    <option value="" disabled selected>Pick a Month</option>
                    <option v-for="(n,i) in monthlyInsights" :value="{month:n,index:i}" :key="n">{{n}}</option>
                 </select>  
        </div>

            
            <!--step 4-->

                <div v-if="isStep3" class="card">
                      <h2 style="text-align:center;">Step 4</h2>
                        <p style="text-align:center;">This is the final step here you will be able to see the total hours,overtime,holiday and extra hours.</p>
                        <div style="display:flex;align-items:center;justify-content:center;flex-flow:column">
                            <button @click="calculateTotals" class="btn">Calculate Summary</button>
                            <p>This will take a few seconds. We will tally up the totals in the above table and show the results below.</p>
                            
                            </div>
                        <summaryHours :data="summaryHouring"></summaryHours>

                        <extraAdditionalTime @removeExtraTime="removeExtraTime" @extratime="extratimetoadd" :data="{person:employeeDetails,month:selectedMonth}"></extraAdditionalTime>
                
                </div>

            <!--step4-->

        <!-- end of card-->
            <div v-if="showStep2"  class="card" style="padding:20px;">
                <h2 style="text-align:center;">Step 2</h2>
            <p style="text-align:center;">You will now be presented with the timesheet.</p>
                    <timesheet ref="mainsheet"></timesheet>
            </div>
            <!--step 3-->
                <div v-if="isStep3" class="card">
                        <h2 style="text-align:center;">Step 3</h2>
                        <p style="text-align:center;">Crunching Number. If the metric is not available that means the automatic process failed. Push Crunch Number to manually crunch the numbers.</p>
                        <div v-if="isCrunchAvailable==false" style="display:flex;align-items:center;justify-content:center;flex-flow:column">
                                <button ref="crunch" @click="crunchNumbers" class="btn" >Crunch Number</button>
 
                                    <div style="min-height:200px;width:80%;display:flex;align-items:center;justify-content:center;padding:10px;" class="card">
                                            <keys :keyData="keyData"></keys>
                                    </div>       
                                 <div    style="min-height:300px;min-width:80%;overflow:scroll;ursor: grab; cursor : -o-grab; cursor : -moz-grab; cursor : -webkit-grab;" class="card dragscroll" >
                                        
                                    <crunch_table :month="selectedMonth"  :data="crunchDetails"></crunch_table>
                                </div>

                        </div>
                </div>



            <!--step 3-->

    
            <!--step 3.5-->

            <div v-if="isStep3" style="min-height:300px;" class="card">
                <h2 style="text-align:center;">Step 3.5</h2>
                <p style="text-align:center;">The performance table will be shown here</p>
                <customTimesheet :month="selectedMonth"  :crunchDetails="crunchDetails"></customTimesheet>
                <bugDetected>
                    <p style="color:grey">Performance record not fully working right now. This will be hotfixed by next week.</p>
                </bugDetected>

            </div>

            <!--step 3.5-->
        
 

        </div>


    </div>

</template>


<script>

    import crunch_table from '../comp/crunchTable.vue';

    import extraAdditionalTime from '.././comp/extraAdditionalTime.vue';
    //allows ning to add some extra time

     //smart method that will return true if the date given to the method is a weekend or flase if it is not
function isWeekend(year, month, indexi){
    
    var numDaysInMonth, daysInWeek, daysIndex, index, i, l, daysArray;

    numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    daysIndex = { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 };
    index = daysIndex[(new Date(year, month - 1, 1)).toString().split(' ')[0]];
    daysArray = [];

    for (i = 0, l = numDaysInMonth[month - 1]; i < l; i++) {
        daysArray.push(daysInWeek[index++]);
        if (index == 7) index = 0;
    }

    var day= daysArray[indexi-1];
    console.log(day);
    if(day=="Saturday" || day=="Sunday"){
        //this is a weekend return true
        return true;
    }else{
      //this is not a weekend thus we will be returning false
      return false;
    }
}

//returns the exact minutes and hour durng the start and end
function calculateDifference(start,end){
  var start = moment.duration(start, "HH:mm");
  var end = moment.duration(end, "HH:mm");
  let diff = end.subtract(start);
  let lunchTaken=diff.hours()+":"+diff.minutes();
  return lunchTaken;
}


var allTheMonths=["January","February","March","April","May","June","July","August","September","October","November","December"];

    //method to find monthly index
    function findMonthIndex(month){
        console.log("target",month);
        var target=month;
        var foundIndex=null;
        //default is set to null

        for(let i=0;i<allTheMonths.length;i++){
            var cur= allTheMonths[i];
            if(cur===target){
                foundIndex=i;
                console.log("found");
            }
        }

        return foundIndex;
    }

    //end of find month index

    function getTotalDaysInMonth(month){
        var month_name=month;
            var month_index= findMonthIndex(month_name)+1;
            var totDays= moment("2019-"+month_index, "YYYY-MM").daysInMonth() // 29
            return totDays;
    }

 import {storage,db} from '../../components/siteStuff/database/db.js';

 
 import moment from 'moment';
 //to accurately crunch the data

 import timesheet from '.././comp/timesheet.vue';

 import {bus} from '../../main.js';
 //we need to use this data bus to interact with the timesheet to tell it to point to the correct damn month


 import keys from '.././comp/keys.vue';
 //importing the keys indicator for step 3

 import bugDetected from '../comp/bugDetected.vue';

//converts 1 to 01
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

 // Convert a time in hh:mm format to minutes
function timeToMins(time) {
  var b = time.split(':');
  return b[0]*60 + +b[1];
}

// Convert minutes to a time in format hh:mm
// Returned value is in range 00  to 24 hrs
function timeFromMins(mins) {
  function z(n){return (n<10? '0':'') + n;}
  var h = (mins/60 |0) % 24;
  var m = mins % 60;
  return z(h) + ':' + z(m);
}

// Add two times in hh:mm format
function addTimes(t0, t1) {
  return timeFromMins(timeToMins(t0) + timeToMins(t1));
}

import summaryHours from '../comp/summaryHours.vue';
//sumary hours component used for the final calculation

//config

var COINBASE_MATURITY=55;
//checks if extra time is greater then this number to add extra time
var COINBASE_IMMATURITY=59;
//this contstant controls if their should be extra pay based on coming early or not


import  customTimesheet from '../comp/customSheet.vue'


export default{
    data:function(){
        return {
            available2019record:[],//stores all the records we have of this employee
            fname:'',//stores the full name of employee

            allMonths:[],//stores all months in 2019

            selectedMonth:'',//stores the selected month here

            stockSheetData:[],//stock sheet data that is available

            isCrunchAvailable:false,//determines of crunch numbers is available

            crunchDate:[],//the crunch data will be stored here

            dDate:[],//the current stocksheet data

            
            monthlyInsights:[],//this will be populated with the monthly insights

            showStep2:false,//determines if timesheet will be shown step 2 visibility

            employeeDetails:[],//the current users employee details will be stored here

            crunchDetails:null,//crunch details will be stored here

            isStep3:false,//determines if step 3 should be available

            keyData:[
                {
                    color:'lightgreen',
                    text:'In Attendance Full'
                },
                {
                    color:"darkgreen",
                    text:"In attendance AM only"
                },
                {
                    color:"black",
                    text:"In attendance PM only"
                },
                {
                    color:"grey",
                    text:'No Lunch AM&PM Full Day'
                },
                {
                    color:'lightred',
                    text:'Late'
                },
                {
                    color:"purple",
                    text:'Overtime Full Day Inc AM AND PM'
                },
                {
                    color:'lightblue',
                    text:'Holiday'
                } 
            ],
            summaryHouring:{
                //summary of all the month
                totalHours:'0',
                overtimeHours:'0',
                totalHolidays:0,//determines the amount of holidays
                totalHolidayHours:'0'//total number of hours
            },
            extraTime:null,//determines if extra time should be precalculated

        }
    },
    methods:{
        removeExtraTime(data){
            //removes extra time
            alert("extra time removed");
            var hour=data/60;
            this.summaryHouring.totalHours-=hour;
        },
        extratimetoadd(data){
            var hour=data/60;
            this.summaryHouring.totalHours+=hour;
            this.extraTime=hour;

            this.calculateTotals();
        },
        updateLog(index,month,data,data_log){
            //update logs here                
            var ref= db.collection("/crunchplaceholders").doc("/monthcol").collection("/months").doc(month).collection("/days").doc(""+index).collection("/data").doc(data_log).set({
                ...data
            })

        },
        checkIn(monthIndex,status){
            //updates crunch details to log this employee attended today
            this.crunchDetails[monthIndex].isAttended=true;
        },
        holidayCheckIn(monthIndex,status){
            //update crunc details to log this employee was on holiday today
                this.crunchDetails[monthIndex].isHoliday=status;
        },
        addHolidayHours(monthIndex,val){
            //updates crunch details to log how many hours is payable for this holiday
            this.crunchDetails[monthIndex].holidayHours=val;
        },
        logHoursAtLunch(monthIndex,val){
            //updates crundh details to log the amount of hours total lunch was taken
            this.crunchDetails[monthIndex].totalLunchTaken=val;
            this.crunchDetails[monthIndex].noLunch=false;
        },
        checkedOutAMOnly(monthIndex,status){
            //updates crunch details array to say they logged out at am only 1 block only
            this.crunchDetails[monthIndex].isOnlyFirstBlock=status;
        },
        logAmHours(monthIndex,val){
            //updates crunch details
            this.crunchDetails[monthIndex].firstBlockHours=val;
        },
        checkoutOutPmOnly(monthIndex,status,val){
            //updates crunch details array to say they came only in the pm
            this.crunchDetails[monthIndex].isOnlySecondBlock=status;
            this.crunchDetails[monthIndex].endBlockHours=val;
            this.crunchDetails[monthIndex].totalHours=val;
         },
        noLunchMode(monthIndex,status){
            //update crunch details array to say no lunch was taken
            this.crunchDetails[monthIndex].noLunch=status;
        },
        logFirstBlock(monthIndex,val){
            //log first block
            this.crunchDetails[monthIndex].firstBlockHours=val;
        },
        logSecondBlock(monthIndex,val){
            //log second block
            this.crunchDetails[monthIndex].endBlockHours=val;
        },
        logTotalHours(monthIndex,val){
            //update crunch details to log total hours
            this.crunchDetails[monthIndex].totalHours=val;
        },
        logOvertime(monthIndex,val){
            //update crunch detail to log overtime hours
            this.crunchDetails[monthIndex].isOvertime=true;
            this.crunchDetails[monthIndex].overtimeHours=val;
        },
        logLate(monthIndex,val){
            this.crunchDetails[monthIndex].isLate=true;
            this.crunchDetails[monthIndex].amountLate=val;
        },
        logLateLunch(monthIndex,val){
            this.crunchDetails[monthIndex].isLateLunch=val;
        },
        addPlaceHolders(month){
            var month_name=month.month;
            
            var totDays=getTotalDaysInMonth(month_name);
            
             this.crunchDetails=[];

            for(let i=0;i<totDays;i++){
               this.crunchDetails.push({
                    isAttended:false,//determines if the employee is in attendance
                    isMissed:false,//determines if this day was missed when it was supposed to be attended
                    isHoliday:false,//determines if today was a holiday
                    holidayHours:'',//how many holidays should be paid
                    isOnlyFirstBlock:false,//the employee only came in the am mode
                    isOnlySecondBlock:false,//the employee only came in the pm mode
                    isOvertime:false,//determines if overtime was taken
                    overtimeHours:'',//over time
                    noLunch:false,//determines if no lunch was taken
                    totalLunchTaken:'',//determines how much lunch was taken
                    firstBlockHours:'',//determines how many hours was the am block worked for
                    endBlockHours:'',//determines how many hours was the second block worked for
                    totalHours:'',//beginning to end

                    isLate:false,//determines if the employee is late
                    amountLate:'',//determines the amount of hours or minutes this employee was late
                    isLateLunch:false,//determines if they took a longer lunch then required
                })
            }
            console.log(this.crunchDetails);

            console.log("placeholder total days",totDays);
 
        },
        calculateTotals(){
            //this comes directly after crunch
            var totalPayable=0;
            //this includes overtime practically everything is included apart from the unpaid time such as 
            var overtime=0;

            var totalHolidays=0;
            //determines the total amount of holidays

            var totalHolidayHours=0;
            //determines the amount of hours that will be paid per this holiday

            var totalToSubractFromLunch=0;

            console.log(this.employeeDetails);

             

            this.crunchDetails.forEach(item=>{

                //check if weekend
                 if(item.isAttended || item.isOvertime){
                    //find the totals
                    var lHour=item.totalHours;
                    var lMin=timeToMins(lHour);
                    totalPayable+=lMin;
                    console.log(totalPayable);

                    if(item.isOvertime){
                        //overtime needs to be added
                        let lHour=item.overtimeHours;
                        let lMin= timeToMins(lHour);
                        overtime+=lMin;
                    }

                }else if(item.isHoliday){
                    //find the holiday totals too
                    totalHolidays+=1;

                    let lHour=item.totalHours;
                    let lMin=timeToMins(lHour);
                    totalHolidayHours+=lMin;
 

                }

                var totalHours= totalPayable/60;
                console.log("total hours to pay",totalHours);
                this.summaryHouring.totalHours=totalHours;
                var totalOvertimeHours= overtime/60;
                this.summaryHouring.overtimeHours=totalOvertimeHours;

                var calcHolidayHours= totalHolidayHours/60;
                this.summaryHouring.totalHours+=calcHolidayHours;
                this.summaryHouring.totalHolidayHours=calcHolidayHours;
                this.summaryHouring.totalHolidays=totalHolidays;

                this.summaryHouring.totalHours+=this.extraTime;

             })
        },
        crunchNumbers(){
                  db.collection("/timesheet").doc("years").collection("/years").doc("2019").collection("/months").doc(this.selectedMonth.month).collection("/users").doc(this.fname).collection("/crunchs").doc("crunch01").get().then(status=>{
                        if(status.exists){
                            //crunch data is available
                            this.isCrunchAvailable=true;
                            //crunch data is available
                        }else{
                            this.addPlaceHolders(this.selectedMonth);
                            //this will add the crunch placeholder needed for later
                            //the resolution of the crunch will be stored in here
                            var resolutionCrunch={}
                            //will store the whole payload here to be added to the database later

                            this.isCrunchAvailable=false;
                            //cunrch data is not available we we need to calculate it ow
                            var totDays= getTotalDaysInMonth(this.selectedMonth.month);
                                console.log("total days in month",totDays);
                            //loop through all the days
                            for(let i=0;i<totDays;i++){
                                var cur= this.dDate[i];
                                if(cur==undefined){
                                    console.log("not defined");
                                }else{
                                
                                ///////////////////////////////
                                var morningClockIn=cur.in;
                                //check in
                                //lunch start
                                var afternooClockout=cur.out;
                                //the differece between these two is the total lunch
                                var afternoonClockIn= cur.in2;
                                //lunc ends
                                var eveningout= cur.out2;
                                //this happens when a user checks out
                                ////////////////////////////////////////////////

                                //check if today is a weekend
                                var curMonthIndex=cur.monthIndex;
                                var MIndex=findMonthIndex(this.selectedMonth.month)+1;
                                var pMIndex= pad(MIndex);
                                console.log("MonthIndex",MIndex);
                                if(false){
                                    //abadoned clause
                                  
                                }else{
                                   

                                
                                        if(morningClockIn.length>=1){
                                            
                                            //morning is defined which means the user did come today
                                        this.checkIn(cur.monthIndex,true);

                                            /////////////////////////////// for fixed employees only
                                            if(this.employeeDetails.isFixed){
                                                //since the employee being analysed is a fix term employee we must make sure they arrived on timesssss
                                                let employeeStart= this.employeeDetails.startTime;
                                                let employeeStartMin=timeToMins(employeeStart);

                                                let diffStartDeadStart=calculateDifference(employeeStart,morningClockIn);
                                                //differnece between when the person is sipposed to start and when they started
                                                if(diffStartDeadStart>=1){
                                                    //ontime
                                                    //this employooee was on time and their should not be any problems
                                                }else{
                                                    if(diffStartDeadStart=="0:0"){

                                                    }else{
                                                    //this employee was late in the morning
                                                   this.logLate(cur.monthIndex,diffStartDeadStart);
                                                   //method to log how late you are
                                                   console.log(cur.monthIndex,diffStartDeadStart);
                                                    }
                                                }
                                            }
                                            //////////////////////////////////////fixed employees only


                                        /////////////////////////////////////////is the day we anylysing a weekend
                                          if(isWeekend("2019",pMIndex,cur.monthIndex+1)){
                                              //since they checked in on a weekend lets mark it as over time off the bat
                                              this.crunchDetails[cur.monthIndex].isOvertime=true;
                                              cur.isAttended=true;
                                            }
                                        //check if this day is a weekend if it is then we must use diffenent logic here sos


                                        if(afternooClockout.length>=1){
                                            //they left in the evening before can determine for sure this was lunch time i need to see if they came back

                                                if(afternoonClockIn.length>=1){
                                                    //lunch was taken and this day is a full day
                                                    var hoursAtLunch= calculateDifference(afternooClockout,afternoonClockIn);
                                                    //calculate the different between clock our and clock back in after lunch
                                                    this.logHoursAtLunch(cur.monthIndex,hoursAtLunch);
                                                    //logs how long they took at lunch
                                                    //calculate if employees took a longer lunch then they were allowed
                                                    let employeeLunchAllowance=this.employeeDetails.lunchAllowance;
                                                    //grabs employee lunch from the array
                                                    let employeeLunchAllowance_min=timeToMins(employeeLunchAllowance);
                                                    //grabs employees lunch allowance in minute format
                                                    let timeTaken= timeToMins(hoursAtLunch);
                                                    //time taken at lunch
                                                    /////////////check if employee took a longer lunch then was allowed
                                                    if(timeTaken>employeeLunchAllowance_min){
                                                        //the employee took a longer lunch then was allowed
                                                        this.logLateLunch(cur.monthIndex,true);
                                                        //call to method to log a late lunch was taken
                                                    }
                                                    ///////////////////lunch anaylsis ends here
                                                
                                                
                                                    //final clockout this happeend at the end of the day
                                                    if(eveningout.length>=1){
                                                        
                                                        //employees in this block did a full time all 4 checked including lunch in out lunch in2 out2

                                                        let firstBlock= calculateDifference(morningClockIn,afternooClockout);
                                                        //this calculates the first workable block
                                                        let secondBlock= calculateDifference(afternoonClockIn,eveningout);
                                                        //this calculates the second workable block

                                                        this.logFirstBlock(cur.monthIndex,firstBlock);
                                                        this.logSecondBlock(cur.monthIndex,secondBlock);
                                                        this.logTotalHours(cur.monthIndex,addTimes(firstBlock,secondBlock));
                                                        

                                                        //check if overtime was needed
                                                        var employeesEndTime=this.employeeDetails.endTime;
                                                        //this is the time the employee typically ends their shift

                                                        var endedRelativeToEmployeeEndTime= calculateDifference(employeesEndTime,eveningout);
                                                        //calculates employee end time
                                                        var endRel=timeToMins(endedRelativeToEmployeeEndTime);
                                                        //how long after their shift did they stay behind
                                                        if(endRel>=COINBASE_MATURITY){
                                                            //this employee has earnt an over time time to pay up lol
                                                            console.log("overtime mode activated");
                                                            this.logOvertime(cur.monthIndex,endedRelativeToEmployeeEndTime);
                                                        }
                                                        //the above is the logic that determines if overtime is to be awarded

                                                    }

                                                }else{
                                                    //they left after lunch and never came back
                                                    console.log("left after lunch and never came back AM ONLY MODE");
                                                    this.checkedOutAMOnly(cur.monthIndex,true);
                                                    //call method to check out user in am only mode

                                                    var amHours= calculateDifference(morningClockIn,afternooClockout);
                                                    console.log("am",amHours);
                                                    this.logAmHours(cur.monthIndex,amHours);
                                                    this.logTotalHours(cur.monthIndex,amHours);

                                                        //am only on weekends still classes as a overtime
                                                     if(isWeekend("2019",pMIndex,cur.monthIndex+1)){
                                                            //since they checked in on a weekend lets mark it as over time off the bat
                                                            this.logOvertime(cur.monthIndex,amHours);
                                                            console.log("AM----------WEEKEND");
                                                            cur.isAttended=true;
                                                        }
                                                }

                                        }else{
                                            //do nothing the person clearly has not taken a lunch break its totally fine
                                            //we just need to calculate what time they left to get a clear idea of the total hours
                                            console.log("had no lunch");
                                            this.noLunchMode(cur.monthIndex,true);
                                            //signify no lunch was taken
                                            //calculate the hours now

                                                if(eveningout.length>=1){
                                                    //calculate start and evening out
                                                    let totHours= calculateDifference(morningClockIn,eveningout);
                                                    this.logTotalHours(cur.monthIndex,totHours);

                                                      if(isWeekend("2019",pMIndex,cur.monthIndex+1)){
                                                            //since they checked in on a weekend lets mark it as over time off the bat
                                                            this.logOvertime(cur.monthIndex,totHours);
                                                                cur.isAttended=true;

                                                        }
                                                    
                                                }

                                        }
                                
                                        }else{
                                            //the person did not attend today theirfore should not be included in the block

                                            //check if a holiday is registered instead
                                            if(cur.isHoliday){
                                                //means today was actually a holiday
                                                this.holidayCheckIn(cur.monthIndex,cur.isHoliday);
                                                var hours=cur.holidayHours;
                                                this.addHolidayHours(cur.monthIndex,hours);
                                                this.logTotalHours(cur.monthIndex,hours);
                                            }

                                            //check if the employee actually came in the PM 
                                            if(afternoonClockIn.length>=1){
                                                console.log("emplyoee came in on the pm");
                                           
                                                if(eveningout.length>=1){
                                                    let TotHours= calculateDifference(afternoonClockIn,eveningout);
                                                          this.checkoutOutPmOnly(cur.monthIndex,true,TotHours);
                                                    
                                                             
                                                            //this.logSecondBlock(TotHours);
                                                        //pm hours
                                                        if(isWeekend("2019",pMIndex,cur.monthIndex+1)){
                                                            //since they checked in on a weekend lets mark it as over time off the bat
                                                            console.log("PM+_++++++++++++++++++++++");
                                                            console.log(TotHours);
                                                            this.logTotalHours(cur.monthIndex,TotHours);
                                                            this.logOvertime(cur.monthIndex,TotHours);
                                                            this.crunchDetails[cur.monthIndex].isOvertime=true;
                                                            cur.isAttended=true;
                                                        }
                                                }
                                                 
                                            }
                                            
                                        }

                                }


                                }
                            }
                         
                        }
                    })
        },
        monthSelectedSync(){
                                            this.showStep2=true;
                                            this.isStep3=true;

            var home=this;
            //method is called when the user selects a month
            //load the data
                            db.collection("/timesheet").doc("years").collection("/years").doc("2019").collection("/months").doc(this.selectedMonth.month).collection("/users").doc(this.fname).get().then(data=>{
                                if(data.exists){
                                
 
                                    //data does exists
                                    var d=data.data();
                                    //stores the data coming in from the server'
                                    this.dDate=d;
                                    var mainsheet= this.$refs.mainsheet;

                                        console.log("new month selected",this.selectedMonth);

                                     bus.$emit("selectedMonthi",this.selectedMonth);
                                    //send the timesheet the month we selected

 
                                    //links to the timesheet view object that is present on this page
                                    mainsheet.loadDataExternally(d);
                                    //loads the data to the timesheet externally
                                    mainsheet.setNameExternally(this.fname);

                                    bus.$emit("clearHoliday",{});

                                    var h=this;
                                    setTimeout(()=>{
                                        h.$refs.crunch.click();
                                    },1000)

                                    
                                }else{
                                    alert("no record for selected month");
                                    bus.$emit("clear",{});
                                    //send clear commmand to timesheet
                                }
                            })

                    db.collection("/timesheet").doc("years").collection("/years").doc("2019").collection("/months").doc(this.selectedMonth.month).collection("/users").doc(this.fname).collection("/crunchs").doc("crunch01").get().then(status=>{
                        if(status.exists){
                            //crunch data is available
                            this.isCrunchAvailable=true;
                            //crunch data is available
                        }else{
                            this.isCrunchAvailable=false;
                        }
                    })


        }
    },
    created(){

        this.allMonths= moment.months();

        var sheetID= this.$route.params.sheetID;

        var home=this;

        //grab employee details
        var peopleDetailsRef=db.collection("/sheet").doc("employees").collection("peoples").doc(sheetID);
        peopleDetailsRef.get().then(data=>{
            home.employeeDetails=data.data();
         })
        


        this.fname=sheetID;
        db.collection("/timesheet").doc("years").collection("/years").doc("2019").collection("/months").get().then(data=>{
            console.log(data);
        })
         //available months
         
         //.doc(this.selectedMonth.month).collection("/users").doc(this.selectedPerson.data.name).set({


        //db.collection("/sheet").doc("2019").collection("/users").doc(sheetID)

         var monthsfilledref=db.collection("/timesheetlogs").doc(sheetID).collection("/months");
         //grab all the months that this person has completed this year 2019
         monthsfilledref.get().then(data=>{
             if(data.empty){
                 //no data does not exist
             }else{
                 this.monthlyInsights=[];
                 //their is data
                data.docs.forEach(item=>{
                    this.monthlyInsights.push(item.id);
                })
                 
             }
         })


    },
    components:{
        timesheet:timesheet,
        crunch_table:crunch_table,
        keys:keys,
        summaryHours:summaryHours,
        extraAdditionalTime:extraAdditionalTime,
        customTimesheet:customTimesheet,
        bugDetected:bugDetected
    }
}




</script>














