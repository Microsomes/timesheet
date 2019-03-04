<template>
    <nav>
        <footer style="background:black;" class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">mylittletimesheet.com</h5>
                <p class="grey-text text-lighten-4">Timesheet created for managing colorway graphics staff</p>
                  Author: Tayyab
              </div>
              
            </div>
          </div>
          
          <div class="footer-copyright">
            <div class="container">
            © 2019 Colorway Graphics 
             </div>
          </div>
        </footer>
    </nav>
            
</template>

<script>
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


  export default{
    data:function(){
      return {
        feedback:null,
        emailAdded:''
      }
    },methods:{
      addEmailList(){
        var home=this;
       
        if(validateEmail(this.emailAdded)){
          this.feedback="Added";
            import('./database/world.js')
          .then((module) => {
            // Do something with the module. 
            module.world.add_email_list(home.emailAdded)
          });
        }else{
          this.feedback="Invalid Email"
        }
      }
    }
  }

</script>