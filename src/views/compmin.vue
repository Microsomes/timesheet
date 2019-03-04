<!--

    @author Tayyab Javed
    @date 28/02/2019
    --compmin testing

-->


<template>


    <div style="height:1000px;">
        <div class="card" style="padding:30px;">
        <input @keyup="changeTo" v-model="inputM" type="text"/>
         Min: {{res}}
        <br>
        Hours:{{res/60}}
        </div>
    </div>


</template>



<script>

 // Convert a time in hh:mm format to minutes
function timeToMins(time) {
  var b = time.split(':');
  return b[0]*60 + +b[1];
}

    export default{
        data:function(){
            return {
                inputM:'',
                res:''
            }
        },
        methods:{
            changeTo(){
                this.res= timeToMins(this.inputM);
            }
        },
        created(){

        }
    }


</script>