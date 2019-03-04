<!--
    @author Tayyab Javed
    @date 15/02/2019
    --this is a mega sumamry timesheet
-->


<template>

    <div style="display:none">
        <table>
        <thead>
          <tr style="text-align:center">
              <th style="text-align:center;">Day/Month</th>
              <th  style="text-align:center;">Attended</th>
              <th  style="text-align:center;">Morning Late Status</th>
              <th  style="text-align:center;">Lunch Status</th>
              <th  style="text-align:center;">Lunch Taken</th>
              <th  style="text-align:center;">Overtime Hours</th>
              <th  style="text-align:center;">Total Hours</th>
          </tr>
        </thead>

        <tbody>
          <tr style="text-align:center" v-for="(n,i) in crunchAnalysed" :key="i">
            <td style="text-align:center;">{{month.month}}{{i+1}}</td>
            <td  style="text-align:center;">Eclair</td>
            <td  style="text-align:center;">$0.87</td>
            <td  style="text-align:center;">$0.87</td>
            <td  style="text-align:center;">$0.87</td>
            <td  style="text-align:center;">$0.87</td>
            <td  style="text-align:center;">$0.87</td>
          </tr>
           
        </tbody>
      </table>
     </div>


</template>

<script>

    import moment from 'moment';
    //import moment 

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
    
    //get total amount of days in a month
    function getTotalDaysInMonth(month){
        var month_name=month;
            var month_index= findMonthIndex(month_name)+1;
            var totDays= moment("2019-"+month_index, "YYYY-MM").daysInMonth() // 29
            return totDays;
    }

    //end of find month index
    export default{
        data:function(){
            return {
                curMonth_index:'',//contains what the current month index is
                totalMonthDays:0,//determines the total amount of days
                //this is the processed data from the crunchdetails
                crunchAnalysed:[]
            }
        },
        props:['crunchDetails','month'],
        watch:{
            crunchDetails:function(){
                //the data has changed
                this.curMonth_index=findMonthIndex(this.month.month);
                this.totalMonthDays=getTotalDaysInMonth(this.month.month);
                this.crunchAnalysed=[];
                for(let i=0;i<this.totalMonthDays;i++){
                this.crunchAnalysed.push({
                    day_month:'',
                    attended:false,//determines if today was attended
                    morning_late_status:false,//determines if this person was late in the morning
                    lunchStatus_late:false,//determines if the employee came late after lunch
                    totalLunchTaken:0,//determines how much lunch was taken
                    overtime:0,//determines how much overtime was taken
                    totalHours:0//total hours remaining
                })
                }

            }
        }
     }


</script>