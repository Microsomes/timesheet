<template>
    <div>
        <router-view/>
    </div>
</template>


<script>

 
export default{

    data:function(){
        return {
            
        }
    },created(){
        this.$router.push("/recent")
    }


}

</script>