<!--
    @author Tayyab Javed
    @date 13/02/2019
    -summary hours shows the total overtime total monthly payable hours etc
-->

<template>

    <div style="min-height:300px;">
         <h5 style="text-align:center;color:grey">You will see a few charts below after crunching is done</h5>
            <bugDetected>
                <p>Caustion: This has not been thoroughly tested yet.</p>
            </bugDetected>
        <div style="height:300px;overflow-x:scroll;display:flex;">
            <div style="width:400px;height:100%">
                <h4 style="text-align:center;color:grey;">Total Hours</h4>
                <p style="text-align:center;">Includes overtime,lunch and total hours</p>
                <p style="text-align:center;font-size:50px;color:lightgreen">{{data.totalHours.toFixed(2)}} hours</p>
            </div>
             <div style="width:400px;height:100%">
                <h4 style="text-align:center;color:grey;">Total Overtime</h4>
                 <p style="text-align:center;font-size:50px;color:lightgreen">{{data.overtimeHours.toFixed(2)}} hours</p>
                 <bugDetected>
                <p>Caustion: Ignore the overtime hours if the person is not fixed timing. This is an error and will be fixed soon.</p>
            </bugDetected>
            </div>
            <div style="width:400px;height:100%">
                <h4 style="text-align:center;color:grey;">Total Holidays</h4>
                 <p style="text-align:center;font-size:50px;color:lightgreen">{{data.totalHolidays}} days</p>
            </div>
               <div style="width:400px;height:100%">
                <h4 style="text-align:center;color:grey;">Paid Holiday Hours</h4>
                 <p style="text-align:center;font-size:50px;color:lightgreen">{{data.totalHolidayHours.toFixed(2)}} hours</p>
            </div>
        </div>

    </div>  

</template>



<script>

    import animated_time from './comp/animated-time.vue';

    import bugDetected from './bugDetected.vue';

    export default{
        data:function(){
            return {

            }
        },
        props:['data'],
        components:{
            animated_time:animated_time,
            bugDetected:bugDetected
        }
    }

</script>