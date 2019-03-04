<template>
<div style="margin-bottom:30px;min-height:400px;" class="container">
    <div class="container">
            <h2>Suggest a feature</h2>
            <input v-model="suggestText" type="text" placeholder="suggest something"/>
        
            <button @click="addSuggestion" style="background:#EE6E73" class="btn">Submit</button>
            {{feedback}}
            </div>
    </div>
</template>

<script>

import {world} from '../components/siteStuff/database/world.js';

export default{
    data:function(){
        return {
            feedback:'',
            suggestText:''
        }
    },methods:{
        addSuggestion(){
            if(this.suggestText.length<=0){
                this.feedback="nothing to suggest.";
                return;
            }
            world.addSuggestion(this.suggestText);
            this.feedback="Thanks for your suggestion";
            this.suggestText="";

        }
    }
}

</script>