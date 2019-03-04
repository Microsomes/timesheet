<!--
    @author Tayyab Javed
    @date 13/02/2019
    -this will show the user all the key colors
-->

<style scoped>



</style>

<template>

    <div>
        <h5 style="color:grey;text-align:center;">Color coded keys</h5>
        <div v-for="(n,i) in keyData" :key="i" style="border:1px solid grey;min-width:500px;height:50px;display:flex;border-radius:20px;margin-top:10px;">
          
            <div :style="{backgroundColor:n.color}" style="height:100%;width:20%;background:red;  border-top-left-radius: 20px;  border-bottom-left-radius: 20px;"></div>
            <div style="display:flex;align-items:center;justify-content:center;">
                <p style="margin-left:10px;font-size:20px;color:grey">{{n.text}}</p>
            </div>
        </div>

    </div>



</template>


<script>

    export default{
        data:function(){
            return {

            }
        },
        methods:{

        },
        components:{

        },
        props:['keyData']
    }

</script>