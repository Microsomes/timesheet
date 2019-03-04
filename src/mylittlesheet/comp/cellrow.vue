<!--
    @author Tayyab Javed
    @Date 07/02/2019
    --cell tow

-->

<template>

        <div>
       <div style="display:Flex;height:40px;" class="inout">
            
             <div style="width:50%;border:1px solid black;display:flex;align-items:center;justify-content:center;">
                <input @change="calc" v-model="data.data.in" type="time"/>
            </div>
            <div style="width:50%;border:1px solid black;;display:flex;align-items:center;justify-content:center;">
                <input  @change="calc" v-model="data.data.out" type="time"/>
                
            </div>
        </div>
        <p style="padding:1px;">Diff:{{diffi.hours}}:{{diffi.min}} hours</p>
        </div>



</template>



<script>
  function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

    import moment from 'moment';
    //imkporting the moment js file so i can calculate the difference between in and out checkouts

    export default{
        data:function(){
            return {
                diffi:{hours:0,min:0},//calculates the hours inbetween
            }
        },
        props:['data'],
        methods:{
            calc(){
                // if(this.data.data.in.length<=0){
                //     //wait
                //     return;
                // }
                // if(this.data.data.out.length<=0){
                //     //wait
                //     return;
                // }

                // var start = moment.duration(this.data.data.in, "HH:mm");
                // var end = moment.duration(this.data.data.out, "HH:mm");
                // var diff = end.subtract(start);
                // diff.hours(); // return hours
                // diff.minutes(); // return minutes
                
                // this.diffi={
                //     hours:pad(diff.hours()),
                //     min:pad(diff.minutes())
                // };

                

            }
        }
    }


</script>