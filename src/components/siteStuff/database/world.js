/*
@authur Muhammed T Javed
@date 5th of October 2018
-handles all interactions with the outside world
*/

import {db} from './db.js';
import moment from 'moment'



class World{

    addSuggestion(what){
        db.collection("suggest").add({
            content:what
        })
    }
    
    getPosts(which){

    }

    add_post(data){
        //method adds a blog post
        var datas=data;
        datas.postType="post";
        db.collection("posts").add({
            content:datas
        })
    }
    add_post_rambaling(data){
        var datas=data;
        datas.postType="rambaling";
        //method adds a blog post
        db.collection("posts").add({
            content:datas
        })
    }
    add_post_mypicks(data){
        var datas=data;
        datas.postType="picks";
        //method adds a blog post
        db.collection("posts").add({
            content:datas
        })
    }
    add_email_list(email){
        //method adds to the email list
        db.collection('email_list').add({
            email:email,
            dateAdded:moment().format()
        }).catch(err=>{
            console.log("error")
            console.log(err)
        }).then(d=>{
            console.log(d)
        })
    }

}

class NewWorld{
    addTag(tag){
        db.collection("n_tag").add({
            tag:tag,
            amountOfPosts:0
        }).then(status=>{
            console.log(status);
        })
    }
    getAllTags(){
        //returns all tags
        return new Promise((resolve,reject)=>{
            db.collection("n_tag").get().then(data=>{
                resolve(data);
            }).catch(err=>{
                reject(err);
            })
        })
    }
 
}

export const world =new World();
export const nWorld= new NewWorld();
