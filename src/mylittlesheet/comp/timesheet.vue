<!--
    this will mimic the actual time sheet

    @author Tayyab Javed
    @date 07/02/2019
-->

<template>
    <div>
        <button @click="randomiseFill" class="btn">Debug Fill</button>
        <p style="color:grey">The above button is for debug/testing purposes only!</p>
    <div ref="tmainsheet" style=" min-height:500px;display:flex;align-items:flex-start;justify-content:center;">

 
          <div style="border:1px solid red;margin:10px;min-height:800px;min-width:400px;" class="sheet">
                      <h1 v-if="timesheetData==null">Timesheet data is loading</h1>

                <div style="height:60px;background:lightblue"></div>
                <div style="border:1px solid black;height:60px;display:flex;" class="second">
                    <div style="border:1px solid black;width:30%;display:flex;align-items:center;justify-content:center;position:relative;" class="detop">
                        <p style="padding-left:10px;position:absolute;left:0px;top:5px;">NO:</p>
                        <p style="  font-style: italic;font-size:30px;">{{selectedMonth.month}}</p>
                    </div>
                    <div style="border:1px solid black;width:70%;display:flex;align-items:center;justify-content:center;position:relative;" class="detop">
                        <p style="padding-left:10px;position:absolute;left:0px;top:5px;">Name:</p>
                        <p style="font-size:30px;font-style:italic;">{{selectedName}}</p>

                    </div>
                 </div>

                <div style="border:1px solid black;min-height:300px;display:flex;" class="bar">
                    <div style="border:1px solid black;width:40px">
                        <div>Date</div>
                        <div style="margin-top:20px;">
                         <div  v-for="(n,i) in selectedMonthTotalDays" :key="i" style="text-align:center;margin-top:0px;border:1px solid black;height:40px;display:flex;align-items:center;justify-content:center;">{{n}}</div>
                        </div>
                     </div>
                    <div style="border:1px solid black;width:40px">
                         <div>Days</div>
                        <div style="margin-top:20px;">
                         <div v-for="n in allDaysInTheMonthArr"   style="text-align:center;margin-top:0px;border:1px solid black;height:40px;display:flex;align-items:center;justify-content:center;"><em>{{n.substring(0,3)}}</em></div>
                        </div>
                    </div>

                    <!--start row-->
                        
                        <div style="border:1px solid black;width:100%;">
                            <div style="border:1px solid black;height:50px;display:flex;">

                                <!--morning header-->  
                                 <div style="border:1px solid black;width:50%" class="morning">
                                    <div style="border:1px solid black;display:flex;flex-flow:column">
                                        <div style="text-align:Center;">Morning</div>
                                        <div style="display:flex;text-align:center;">
                                            <div style="width:50%">IN</div>
                                            <div style="width:50%">OUT</div>
                                        </div>
                                    </div>  
                              </div>
                              <!--morning header ends-->

                               <!--morning header-->  
                                 <div style="border:1px solid black;width:50%" class="morning">
                                    <div style="border:1px solid black;display:flex;flex-flow:column">
                                        <div style="text-align:Center;">Afternoon</div>
                                        <div style="display:flex;text-align:center;">
                                            <div style="width:50%">IN</div>
                                            <div style="width:50%">OUT</div>
                                        </div>
                                    </div>  
                              </div>
                              <!--morning header ends-->

                        
                            </div>
                            
                                  <double_row ref="doublerow" :mode="doubleCellViewMode" v-for="(n,i) in timesheetData" :month="currentSelectedMonth" :ind="i" :key="i" :data="n"></double_row>
                           



                        </div>

                    <!--sendrow-->

                    <!-- <div style="border:1px solid black;display:flex;width:100%;">
                    <div style="border:1px solid black;width:50%" class="morning">
                        <div style="border:1px solid black;display:flex;flex-flow:column">
                            <div style="text-align:Center;">Morning</div>
                            <div style="display:flex;text-align:center;">
                                <div style="width:50%">IN</div>
                                <div style="width:50%">OUT</div>
                             </div>
                        </div>
                      
                    </div>
                    <div style="border:1px solid black;width:50%" class="morning">
                             <div style="border:1px solid black;display:flex;flex-flow:column">
                            <div style="text-align:Center;">Afternoon</div>
                            <div style="display:flex;text-align:center;">
                                <div style="width:50%">IN</div>
                                <div style="width:50%">OUT</div>
                             </div>
                        </div>
                   
                    </div>
                    </div> -->
                </div>

        </div>

    </div>
    </div>



</template>




<script>
    
    import html2canvas from 'html2canvas';
    //html 2 canvas package so i can allow timesheet to be exported as an image

    import cell_row from './cellrow.vue';

    import double_row from './doublecell.vue';

    import {bus} from '../../main.js';

    import moment from 'moment';

    function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function getDaysArrayByMonth(monthindex) {
  var daysInMonth = moment("2019-"+monthindex, "YYYY-MM").daysInMonth();
  var arrDays = [];

  while(daysInMonth) {
    var current = moment().date(daysInMonth);
    arrDays.push(current);
    daysInMonth--;
  }

  return arrDays;
}

//get all the days in the month
function getDaysArray(year, month) {
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

    return daysArray;
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


    export default{
        data:function(){
            return {
                doubleCellViewMode:false,//determines the double cell mode
                currentSelectedMonth:'',//currently the selected month is empty
                selectedPerson:'',//stores the person that has been selected
                selectedMonth:'',//stores the selected month
                selectedName:'',
                selectedMonthTotalDays:0,//determines the total number of days in the month
                selectedMonthActualDays:[],//selected monthhs day

                timesheetData:[
                 
                ]
                ,
                isHolidayShowing:false,//determines if the holiday icon should be showing

                allDaysInTheMonthArr:[],//stores all the days in the month
            }
        },
        methods:{
            randomiseFill(){
                /**
                 * 
                 *     in:'',
                        out:'',
                        in2:'',
                        out2:'',
                        isHoliday:false,//determines if this day is a holiday
                        holidayHours:0,//how many hours of a holiday will they be paid for that day
                        monthIndex:monthInd,
                        isWeekend:false,//determines if this cell is a weekend if so make it true
                 */

                this.timesheetData[0].in="08:20";
                this.timesheetData[1].in="08:30";
                this.timesheetData[2].in="08:40";
                this.timesheetData[3].in="08:50";
                this.timesheetData[4].in="09:00";
                //the above is when we go in
                this.timesheetData[0].out="13:20";
                this.timesheetData[1].out="13:30";
                this.timesheetData[2].out="13:40";
                this.timesheetData[3].out="13:50";
                this.timesheetData[4].out="13:00";
                //the above is when we have lunch we check out
                this.timesheetData[0].in2="14:20";
                this.timesheetData[1].in2="14:30";
                this.timesheetData[2].in2="14:40";
                this.timesheetData[3].in2="14:50";
                this.timesheetData[4].in2="14:00";
                //this is when people come back after lunch
                this.timesheetData[0].out2="17:20";
                this.timesheetData[1].out2="17:30";
                this.timesheetData[2].out2="17:40";
                this.timesheetData[3].out2="17:50";
                this.timesheetData[4].out2="17:00";
                //the above is evening checkout



                 this.timesheetData[7].in="08:20";
                this.timesheetData[8].in="08:30";
                this.timesheetData[9].in="08:40";
                this.timesheetData[10].in="08:50";
                this.timesheetData[11].in="09:00";
                //the above is when we go in
                this.timesheetData[7].out="13:20";
                this.timesheetData[8].out="13:30";
                this.timesheetData[9].out="13:40";
                this.timesheetData[10].out="13:50";
                this.timesheetData[11].out="13:00";
                //the above is when we have lunch we check out
                this.timesheetData[7].in2="14:20";
                this.timesheetData[8].in2="14:30";
                this.timesheetData[9].in2="14:40";
                this.timesheetData[10].in2="14:50";
                this.timesheetData[11].in2="14:00";
                //this is when people come back after lunch
                this.timesheetData[7].out2="17:20";
                this.timesheetData[8].out2="17:30";
                this.timesheetData[9].out2="17:40";
                this.timesheetData[10].out2="17:50";
                this.timesheetData[11].out2="17:00";
                //the above is evening checkout


                
                 this.timesheetData[13].in="08:00";
                this.timesheetData[14].in="08:30";
                this.timesheetData[15].in="08:40";
                this.timesheetData[16].in="08:50";
                this.timesheetData[17].in="09:00";
                //the above is when we go in
                this.timesheetData[13].out="13:30";
                this.timesheetData[14].out="13:39";
                this.timesheetData[15].out="13:49";
                this.timesheetData[16].out="13:59";
                this.timesheetData[17].out="13:30";
                //the above is when we have lunch we check out
                this.timesheetData[13].in2="14:00";
                this.timesheetData[14].in2="14:30";
                this.timesheetData[15].in2="14:40";
                this.timesheetData[16].in2="14:50";
                this.timesheetData[17].in2="14:00";
                //this is when people come back after lunch
                this.timesheetData[13].out2="17:00";
                this.timesheetData[14].out2="17:30";
                this.timesheetData[15].out2="17:40";
                this.timesheetData[16].out2="17:50";
                this.timesheetData[17].out2="17:00";
                //the above is evening checkout

                
                this.timesheetData[20].isHoliday=true;
                this.timesheetData[20].holidayHours=8;
                //
                 this.timesheetData[21].isHoliday=true;
                this.timesheetData[21].holidayHours=8;
                //
                 this.timesheetData[22].isHoliday=true;
                this.timesheetData[22].holidayHours=8;
                //
                 this.timesheetData[23].isHoliday=true;
                this.timesheetData[23].holidayHours=8;
                //
                 this.timesheetData[24].isHoliday=true;
                this.timesheetData[24].holidayHours=8;
                //


                
                      
                 this.timesheetData[27].in="08:00";
                this.timesheetData[28].in="08:30";
                  //the above is when we go in
                this.timesheetData[27].out="13:00";
                this.timesheetData[28].out="13:30";
                   //the above is when we have lunch we check out
                 this.timesheetData[29].in2="14:40";
                 //this is when people come back after lunch
                  this.timesheetData[29].out2="17:50";
                 //the above is evening checkout

            },
            downloadTimesheet(){
              
            },
            loadDataExternally(timesheetdata){
                //this method could be called by a 3rd party to populate data
               this.timesheetData=null;
               var home=this;
               setTimeout(()=>{
                home.timesheetData=timesheetdata;

               },1000)
 
                
            },
            setNameExternally(name){
                //this method will be called externally to set the name
                this.selectedName=name;
            },

            externallyGrabData(){
                //externally called to grab the timesheet data
                return this.timesheetData;
            },

            monthSelected(data){
                var home=this;
                //make home= to this;
                home.selectedMonth=data;
                home.timesheetData=[];
                //new month selected so i remove the old data
                var monthIndex=findMonthIndex(data.month)+1;
            
                var totDays= moment("2019-"+monthIndex, "YYYY-MM").daysInMonth() // 29
                console.log("monthlyIndex",data)
                console.log(totDays);
              
                this.allDaysInTheMonthArr=getDaysArray("2019",monthIndex);

                var totsDay2= getDaysArrayByMonth(monthIndex);
                var monthInd=0;
                totsDay2.forEach(item=>{
                    this.timesheetData.push({
                        in:'',
                        out:'',
                        in2:'',
                        out2:'',
                        isHoliday:false,//determines if this day is a holiday
                        holidayHours:0,//how many hours of a holiday will they be paid for that day
                        monthIndex:monthInd,
                        isWeekend:false,//determines if this cell is a weekend if so make it true
                    })
                    monthInd++;
                })

                 
                home.selectedMonthActualDays=totsDay2;
 

                home.selectedMonthTotalDays=totDays;


            }
        },
        created(){
            var home=this;
            bus.$on("selectedPerson",data=>{
                home.selectedPerson=data;
                home.selectedName=data.data.name;
            })

            bus.$on("clearHoliday",data=>{
                console.log("i will clear this holiday field");
                this.doubleCellViewMode=true;
            })

          

            //listen for a clear event
            bus.$on("clear",data=>{
                //an event from an external source has been called to clear 
                this.timesheetData=[];
                this.selectedMonth={month:'',index:''};
                this.selectedName="n/a";
                console.log("clear called");
            })

            bus.$on("retrieveSheet",data=>{
                //the timesheet data has been requested
                bus.$emit("sendSheet",this.timesheetData);
            })

            bus.$on("selectedMonthi",data=>{
                this.monthSelected(data);
            })

            //set up holiday mode
         },
        components:{
            double_row:double_row
         },
        props:[
            'data'
        ]
    }


</script>


