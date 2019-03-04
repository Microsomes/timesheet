<!--
    Nice beautiful card that shows the employees details
    @author Tayyab Javed
    @date 12/02/2019

-->


<style>
    *{
        margin:0;
        padding:0;
    }

    .name{
        padding:20px;
        color:grey;
    }
</style>

<template>

    <div style="height:100%;display:flex;">

        <div style="width:100px;display:flex;align-items:center;justify-content:center;" class="person">
              <i style="font-size:50px;color:grey" class="material-icons">people</i>
        </div>
        <div style="display:flex;" class="details">
            <p style="font-size:20px;padding:10px;" class="name">{{name}}<br><em v-if="isFixedTime">Fixed timing {{startTime}}-{{endTime}}. Lunch Allowance: {{lunchAllowance}} </em></p>
        </div>

    </div>


</template>



<script>


export default{
    data:function(){
        return {
            isFixedTime:false,//determines if this user is on fixed timing
            startTime:'',//start time of shift
            endTime:'',//end time of shift
            lunchAllowance:'',//shows the lunch allowance
            name:'Please select an employee to show this',//name of employee
         }
    },
    created(){

    },
    watch:{
        selectedPerson:function(val){
            //whenever the data changed this annonymous function will be called
            console.log("called the data has changed");

            

            this.isFixedTime=val.data.isFixed;
            this.startTime=val.data.startTime;
            this.endTime=val.data.endTime;
            this.lunchAllowance=val.data.lunchAllowance;
         }
    },
    methods:{
        clearAllData(){
            this.name="";
            this.lunchAllowance="";
            this.startTime="";
            this.endTime="";
        },
    },
    props:['selectedPerson']
}



</script>