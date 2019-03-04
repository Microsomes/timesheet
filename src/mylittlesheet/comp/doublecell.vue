<!--

    @author Tayyab 
    @date Javed

-->


<template>

<div style="border:1px solid black;height:40px;display:flex;position:relative" class="rowTime">

                     
             <div  v-if="data.isHoliday==false" @mouseleave="isCellQuickTimeingShowing=false" style="border:1px solid black;width:25%;height:100%;display:flex;align-items:center;justify-content:center;position:relative">
                 <input v-model="data.in" style="padding-left:40px" type="time"/>
                    <button @click="isCellQuickTimeingShowing=!isCellQuickTimeingShowing" style="min-width:20px;height:20px;position:absolute;left:0px;top:0px;">Q</button>
                    <!--this is the convenience method to give typical suggestions-->
                    <div v-if="isCellQuickTimeingShowing" style="z-index:100;border:1px solid black;height:40px;width:300px;position:absolute;top:0px;background:grey;display:flex;align-items:center;justify-content:center;">
                        <button @click="enterTimein1(n)" v-for="(n,i) in typical" :key="i" class="btn">{{n.time}}</button>
                    </div>

              </div>

              <!--afternoon out-->
             <div v-if="data.isHoliday==false" style="position:relative;border:1px solid black;width:25%;height:100%;display:flex;align-items:center;justify-content:center;">
                 <input v-model="data.out" style="padding-left:40px" type="time"/>
                  <button @click="isCellQuickTimeingShowing_2=!isCellQuickTimeingShowing_2" style="min-width:20px;height:20px;position:absolute;left:0px;top:0px;">Q</button>
                    <!--this is the convenience method to give typical suggestions-->
                    <div v-if="isCellQuickTimeingShowing_2" style="z-index:100;border:1px solid black;height:40px;width:300px;position:absolute;top:0px;background:grey;display:flex;align-items:center;justify-content:center;">
                        <button @click="enterTimeout1(n)" v-for="(n,i) in typical" :key="i" class="btn">{{n.time}}</button>
                    </div>
             </div>
             <!--afternoon in-->

             <!-- afternoon in number 3-->
             <div v-if="data.isHoliday==false" style="position:relative;border:1px solid black;width:25%;height:100%;display:flex;align-items:center;justify-content:center;">
                 <input v-model="data.in2" style="padding-left:40px" type="time"/>
                   <button @click="isCellQuickTimeingShowing_1=!isCellQuickTimeingShowing_1" style="min-width:20px;height:20px;position:absolute;left:0px;top:0px;">Q</button>
                    <!--this is the convenience method to give typical suggestions-->
                    <div v-if="isCellQuickTimeingShowing_1" style="z-index:200;border:1px solid black;height:40px;width:300px;position:absolute;top:0px;background:grey;display:flex;align-items:center;justify-content:center;">
                        <button @click="enterTimein2(n)" v-for="(n,i) in typical" :key="i" class="btn">{{n.time}}</button>
                    </div>
             </div>
             <!-- afternoon number 3 ends-->

            <!-- final checkout the day is over-->            
             <div v-if="data.isHoliday==false" style="position:relative;border:1px solid black;width:25%;height:100%;display:flex;align-items:center;justify-content:center;">
                 <input v-model="data.out2" style="padding-left:40px" type="time"/>
                  <button @click="isCellQuickTimeingShowing_3=!isCellQuickTimeingShowing_3" style="min-width:20px;height:20px;position:absolute;left:0px;top:0px;">Q</button>
                    <!--this is the convenience method to give typical suggestions-->
                    <div v-if="isCellQuickTimeingShowing_3" style=" border:1px solid black;height:40px;width:300px;position:absolute;top:0px;background:grey;display:flex;align-items:center;justify-content:center;">
                        <button @click="enterTimeout2(n)" v-for="(n,i) in typical" :key="i" class="btn">{{n.time}}</button>
                    </div>
             
             </div>
            
            <!-- final checkout the day is over-->

                <div style="display:flex;align-items:center;justify-content:center;align-items:center;text-align:center;width:100%" v-if="data.isHoliday">
                     Holiday Hour
                    <div  ><input v-model="data.holidayHours" type="time"/></div>

                </div>
            <button v-if="isHolidayShow" @click="isAHoliday" style="position:absolute;right:0px;height:30px;width:20px;" class="btn">H</button>
            <button v-if="isHolidayShow" @click="undoHoliday" style="position:absolute;right:-50px;height:30px;width:20px;" class="btn">U</button>
        
            </div>

</template>


<script>
 import {storage,db} from '../../components/siteStuff/database/db.js';

    var typicalRef= db.collection("/typicaltimes");
    //refernece for the typical timgins


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
 
export default{
    data:function(){
        return {
            isHolidayActive:false,
            amountOfHolidayHour:0,
            isHolidayShow:true,
            isCellQuickTimeingShowing:false,//determines in1
            isCellQuickTimeingShowing_1:false,           //in2
            isCellQuickTimeingShowing_2:false,          //out1
            isCellQuickTimeingShowing_3:false,           //out2
            typical:[],//populates with the typical timings
        }
    },
    created(){
        var home=this;

 
        typicalRef.onSnapshot(data=>{
           if(data.empty){
               //their is no typical timings
               this.typical=null;
           }else{
               this.typical=[];
               //empty the typical array every time a new event is coming in
               data.forEach(item=>{
                   if(item.id!="config"){
                       //exclude the config document since it does not contain data we need
                        let data=item.data();

                        this.typical.push(data);
                   }
               })
           }
        })

        var d= this.data;

        if(d.isHoliday){
            //this cell should be marked as a holiday
            this.isHolidayActive=true;
            this.amountOfHolidayHour=d.holidayHours;
        }
        
        console.log("mode",this.mode);
        if(this.mode){
            //view mode is action
            this.isHolidayShow=false;
        }else{
            this.isHolidayShow=true;
        }

        //conveneience timings

     },
    methods:{
        enterTimein1(data){
            this.data.in=data.time;
            this.isCellQuickTimeingShowing=false;
        },
        enterTimein2(data){
            this.data.in2=data.time;
            this.isCellQuickTimeingShowing_1=false;
        },
        enterTimeout1(data){
             this.data.out=data.time;
            this.isCellQuickTimeingShowing_2=false;
        },
        enterTimeout2(data){
            this.data.out2=data.time;
            this.isCellQuickTimeingShowing_3=false;
        },
        showit(){
            alert(1);
        },
        undoHoliday(){
            console.log("trying to undo");
            this.data.isHoliday=false;
            this.data.holidayHours="00:00";
            this.isHolidayActive=false;

         },
        isAHoliday(){
            var amount= "08:00";

            if(amount.length>=1){
                this.amountOfHolidayHour=amount;
            }
            this.isHolidayActive=true;

            this.data.isHoliday=true;
            this.data.holidayHours=amount;
        }
    },
    props:['data','mode','ind','currentSelectedMonth']
}




</script>