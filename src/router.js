import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/main/index'
import addPost from './views/addPost';

import compMin from './views/compmin.vue';

import recent from './components/main/recent';
import mypicks from './components/main/mypicks';
import rambaling from './components/main/rambaling';
import details from './components/main/details';
import tag from './components/main/tag';

import suggest from './views/suggest';

Vue.use(Router)

 import VueAnimateNumber from 'vue-animate-number'
Vue.use(VueAnimateNumber)






//timesheet pages
import timesheet_addperson from './mylittlesheet/addPerson.vue';
//add time sheet
import timesheet_allPeople from './mylittlesheet/allPeople.vue';

import timesheet_timesheetcalc from './mylittlesheet/timesheetcalc.vue';


import viewPerson from './mylittlesheet/specific/viewPerson.vue';
import VueRouter from 'vue-router';

import {auth} from './components/siteStuff/database/db.js';

import login from './mylittlesheet/login.vue';

const router= new VueRouter({
    routes: [
      {
        path:"/test/comp",
        component:compMin
      },
      {
        path:"/login",
        component:login
      },
    {
      path:"/sheet/person/:sheetID",
      component:viewPerson,
      beforeEnter(to,from,next){
        var cur= auth.currentUser;
        if(cur!=null){
          next();
        }else{
          alert("you are not logged in. Accessed Denied");
          next({path:"/login"});
        }
      }
    },
    {
      path:"/sheet/sheet",
      component:timesheet_timesheetcalc
      ,
      beforeEnter(to,from,next){
        var cur= auth.currentUser;
        if(cur!=null){
          next();
        }else{
          alert("you are not logged in. Accessed Denied");
          next({path:"/login"});
        }
      }
    },
    {
      path:"/sheet/addperson",
      component:timesheet_addperson,
      beforeEnter(to,from,next){
        var cur= auth.currentUser;
        if(cur!=null){
          next();
        }else{
          alert("you are not logged in. Accessed Denied");
          next({path:"/login"});
        }
      }
    },

    {
      path:"/sheet/all",
      component:timesheet_allPeople,
      beforeEnter(to,from,next){
        var cur= auth.currentUser;
        if(cur!=null){
          next();
        }else{
          alert("you are not logged in. Accessed Denied");
          next({path:"/login"});
        }
      }
    },

    {
      path:'/suggest',
      component:suggest,
      beforeEnter(to,from,next){
        var cur= auth.currentUser;
        if(cur!=null){
          next();
        }else{
          alert("you are not logged in. Accessed Denied");
          next({path:"/login"});
        }
      }
    },
    {
      path:'/add',
      component:addPost
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path:'/post/:slug',
          component:details
        },
        {
          path:'/recent',
          component:recent
        },{
          path:'/mypicks',
          component:mypicks
        },{
          path:'/rambaling',
          component:rambaling
        },
        {
          path:'/tag/:tag',
          component:tag
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // ...
   next();
})

const router_nologin= new VueRouter({
  routes: [
    {
      path:"/login",
      component:login
    },
  {
    path:"/sheet/person/:sheetID",
    component:viewPerson,
    beforeEnter(to,from,next){
      var cur= auth.currentUser;
      if(cur!=null){
        next();
      }else{
        alert("you are not logged in. Accessed Denied");
        next({path:"/login"});
      }
    }
  },
  {
    path:"/sheet/sheet",
    component:timesheet_timesheetcalc
    ,
    beforeEnter(to,from,next){
      var cur= auth.currentUser;
      if(cur!=null){
        next();
      }else{
        alert("you are not logged in. Accessed Denied");
        next({path:"/login"});
      }
    }
  },
  {
    path:"/sheet/addperson",
    component:timesheet_addperson,
    beforeEnter(to,from,next){
      var cur= auth.currentUser;
      if(cur!=null){
        next();
      }else{
        alert("you are not logged in. Accessed Denied");
        next({path:"/login"});
      }
    }
  },

  {
    path:"/sheet/all",
    component:timesheet_allPeople,
    beforeEnter(to,from,next){
      var cur= auth.currentUser;
      if(cur!=null){
        next();
      }else{
        alert("you are not logged in. Accessed Denied");
        next({path:"/login"});
      }
    }
  },

  {
    path:'/suggest',
    component:suggest,
    beforeEnter(to,from,next){
      var cur= auth.currentUser;
      if(cur!=null){
        next();
      }else{
        alert("you are not logged in. Accessed Denied");
        next({path:"/login"});
      }
    }
  },
  {
    path:'/add',
    component:addPost
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children:[
      {
        path:'/post/:slug',
        component:details
      },
      {
        path:'/recent',
        component:recent
      },{
        path:'/mypicks',
        component:mypicks
      },{
        path:'/rambaling',
        component:rambaling
      },
      {
        path:'/tag/:tag',
        component:tag
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  }
]
})


export default router;