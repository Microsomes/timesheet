<!--

    @author Tayyab Javed
    @date 26/02/2019

    --month indicator

-->

<template>

    <div>
        <p>All the months completed        {{employee.id}}</p>
        {{monthlyInsights}}
         <div style="display:none;" class="row">
            
            <div class="col m4">JAN</div>
            <div class="col m4">FEB</div>
            <div class="col m4">MAR</div>
            <div class="col m4">APR</div>
            <div class="col m4">MAY</div>
            <div class="col m4">JUN</div>
            <div class="col m4">JUL</div>
            <div class="col m4">AUG</div>
            <div class="col m4">SEP</div>
            <div class="col m4">OCT</div>
            <div class="col m4">NOV</div>
            <div class="col m4">DEC</div>
        </div>
    </div>

</template>


<script>

 import {storage,db} from '../../../components/siteStuff/database/db.js';


    export default{
        data:function(){
            return {
                allMonthsDone:'',
                monthlyInsights:[],
             }
        },
        created(){
            //grab all months done
            var sheetID= this.employee.id;

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
        methods:{
            
        },
        props:['employee']
    }



</script>