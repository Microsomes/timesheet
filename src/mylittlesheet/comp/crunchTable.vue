<!--

    @author Tayyab Javed
    @date 12/02/2019
    
    -crunch table
-->

<style scoped>

  .active{
    background:lightgreen;
  }

  .active_holiday{
    background:lightblue;
  }

  .checkedOutAM{
    background:darkgreen;
    color:white;
  }

 
  .checkedOutPM{
    background:black;
    color:white;
  }

  .noLunch{
    background:grey;
    color:black;
    color:white;
  }

  .overtime{
    background:purple;
    color:white;
  }

</style>

<template>

    <div class="" style="padding:0px">

  
     <table>
        <thead>
          <tr >
                          <th >Month</th> 

              <th   v-for="(n,i) in data[0]">{{i}}</th> 
            </tr>
          
        </thead>

        <tbody>
          <tr v-for="(n,i) in data" :key="i">
            <td style="text-align:center;">{{month.month.substring(0,3)}}:{{i+1}}</td>
            <td style="text-align:center;" :class="{active:n.isAttended,active_holiday:n.isHoliday,checkedOutAM:n.isOnlyFirstBlock,checkedOutPM:n.isOnlySecondBlock,noLunch:n.noLunch,overtime:n.isOvertime}" v-for="(a,i) in n" :key="i">{{a}}</td>
          </tr>
         
        </tbody>
      </table>

    </div>



</template>



<script>


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

    export default{
        data:function(){
            return {
                exampleDate:{
                    //the example data will be shown here
                }
            }
        },
        mounted(){
         },
        props:['data','month']
    }


</script>

