import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ListComment(props){
  let params = useParams();
  const[data,setData] = useState('')

  useEffect(()=>{
    axios.get("http://localhost:8080/laravel/laravel/public/api/blog/detail/" + params.id)
    .then(res => {
      setData(res.data.data)
    })
  },[])
  function renderComment(){
    if(Object.keys(data).length  > 0){
      const commentData = data.comment;
      Object.keys(commentData).map((value, key)=>{
        console.log(key)
        return(
                <li key={key} className="media">
                  <a className="pull-left" href="#">
                    <img className="media-object" src="images/blog/man-two.jpg" alt="" />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" />Janis Gallagher</li>
                      <li><i className="fa fa-clock-o" />{commentData[value]['updated_at']}</li>
                    </ul>
                    <p>{commentData[value]['comment']}</p>
                    <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
                  </div>
                </li>  
        );
      })
    }
  }
    return(
      <div className="response-area">
              <h2>3 RESPONSES</h2>
              <ul className="media-list">
                {renderComment()}
              </ul>			
            </div>  
        
    )
}
export default ListComment;