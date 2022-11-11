import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Detail from "./Detail";

function Comment(props){
    
    const params = useParams();
    
    const[comment, setComment] = useState("");
    const[error, setError] = useState('')

    function handlechange(e){
 
        const value = e.target.value
        setComment(value)
    }
    
    
    function messageSubmit(e){
        e.preventDefault();
        let userData = localStorage.getItem("Auth");
        console.log(userData)
        const errorSubmit = {};
        let flag = true;

        if(userData == ""){
            flag = false
            errorSubmit.message = " vui long dang nhap"
        }else{
            flag = true
            errorSubmit.message = ""
        }
        if(!flag){
            setError(errorSubmit);
        }else {
            setError(errorSubmit)
            const accessToken = JSON.parse(localStorage.getItem("token"));
            let url = 'http://localhost:8080/laravel/laravel/public/api/blog/comment/'+ params.id;
            let config = { 
                headers: { 
                    'Authorization': 'Bearer '+ accessToken.token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                } 
            };
            let user = JSON.parse(userData)
            console.log(accessToken)
            if(comment){
                const formData = new FormData();
                    formData.append('id_blog', params.id);
                    formData.append('id_user',user.id);
                    formData.append('id_comment', props.getId ? props.getId : 0);
                    formData.append('comment', comment);
                    formData.append('image_user', user.avatar);
                    formData.append('name_user', user.name);
                axios.post(url, formData, config)
                .then(res=>{
                    console.log(res)
                    props.getCmt(res.data) // ==== lấy data của comment vừa bình luận ====
                    if(res.data.errors){
                        setError(res.data.errors)
                    }
                }) 
                errorSubmit.message = '';
                setError(errorSubmit)
            }else{
                errorSubmit.message = 'ban chua nhap binh luan'
                setError(errorSubmit)
            }
		
        }
    } 
    
    function renderError(){
        if(Object.keys(error).length > 0) {
            return Object.keys(error).map((key, index) => {
              return(
                    <p key={index}>{error[key]}</p>
                );
            })
        }
      }
    
    // console.log(userData)
    return(
        <div classname="replay-box">
            <div classname="row">
                <div classname="col-sm-12">
                    <h2>Leave a replay</h2>
                    <div classname="text-area">
                        <div classname="blank-arrow">
                            <label>Your Name</label>
                        </div>
                        <span>*</span>
                        <form onSubmit={messageSubmit}>
                            <textarea onChange={handlechange} name="message" rows="{11}"/>
                            <button type="submit" classname="btn btn-primary">post comment</button>
                        </form>
                    </div>
                </div>
                {renderError()}
            </div>
            
        </div>            

    );
}
export default Comment;