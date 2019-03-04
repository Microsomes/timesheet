
<!--
--attempt at a animated 

-->

<template>
<div>
    {{displayNumber}}
</div>
</template>


<script>


    export default{
        data:function(){
            return {
                displayNumber:0,
                interval:false
            }
        },
        props:{'number':{default:0}},
        created(){
              	this.displayNumber = this.number ? this.number : 0;
        },
        watch:{
            number: function(){
    
    	clearInterval(this.interval);
    
    		if(this.number == this.displayNumber){
          return;
        }
    
      	this.interval = window.setInterval(function(){
        
        	if(this.displayNumber != this.number){
        
        		var change = (this.number - this.displayNumber) / 10;
            
            change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          
          	this.displayNumber = this.displayNumber + change;
          
          }
        
        }.bind(this), 20);
      
    }
        }
    }


</script>
 