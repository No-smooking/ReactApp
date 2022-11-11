
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment";
import Rate from "./Rate";

function Detail(props){
  let params = useParams();
  console.log(params)

  const [data, setData] = useState('');
  const [cmt, setCmt] = useState('');
  const [cmtId, setCmtId] = useState('');
  const[allRate, setAllRate] = useState('');
  // console.log(data)
    // tragn detail: xem chi tiet 1 bai viet cua blog
    // + vao detail thi goi api ra va lay data hien thi ra 
    // + link api: 'blog/detai/:id' , id chinh id cua mỗi bai blog 
    // + clcik redmore, lay id gui qua detail, co id thi moi goi api dc
    
    // + tao dinh nghia router như sau:
    //   <Route path='/blog/detail/:id' element={<Detail/>}/>
    // + readmore blog: sua lai nhu sau:
    //   <Link className="btn btn-primary" to={"/blog/detail/" + value.id}>Read More</Link>
    // + trang detail: lay id ra thi param :chinh tham so tren url
  useEffect(() => {
    axios.get("http://localhost:8080/laravel/laravel/public/api/blog/detail/" + params.id)
    .then(response => {
      setData(response.data.data)
      setCmt(response.data.data.comment)


    })
    .catch(function (error){
      console.log(error)
    })
  },[]);
  
  
  function renderData(){
    if(Object.keys(data).length > 0){
      return(
        <div className="single-blog-post">
              <h3>{data.title}</h3>
              <div className="post-meta">
                <ul>
                  <li><i className="fa fa-user" /> Mac Doe</li>
                  <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                  <li><i className="fa fa-calendar" />{data.updated_at}</li>
                </ul>
            </div>
            <a href>
              <img src={"http://localhost:8080/laravel/laravel/public/upload/Blog/image/" + data.image} alt="" />
            </a>
            <p>{data.content}</p>
            </div>
      )
    }
  }
  // renderComment
  function renderComment(){
    if(Object.keys(data).length  > 0){
      return Object.keys(cmt).map((object, i)=>{
        if(cmt[object]['id_comment'] == 0 ){
          return(
            <React.Fragment key={i}>
              <li className="media">
                <a className="pull-left" href="#">
                  <img className="media-object" src={"http://localhost:8080/laravel/laravel/public/upload/user/avatar/" + cmt[object]['image_user']} alt="" />
                </a>
                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li><i className="fa fa-user" />{cmt[object]['name_user']}</li>
                    <li><i className="fa fa-clock-o" />{cmt[object]['updated_at']}</li>
                  </ul>
                  <p>{cmt[object]['comment']}</p>
                  <a onClick={replay} id={cmt[object]['id']} className="btn btn-primary"><i className="fa fa-reply" />Replay</a>
                </div>
              </li> 
              {Object.keys(cmt).map((object2, j) => {
                if(cmt[object]['id'] == cmt[object2]['id_comment']){
                  return(
                    <li key={j} index={j} className="media second-media">
                      <a className="pull-left" href="#">
                        <img className="media-object" src={"http://localhost:8080/laravel/laravel/public/upload/user/avatar/" + cmt[object2]['image_user']} alt="" />
                      </a>
                    <div className="media-body">
                      <ul className="sinlge-post-meta">
                        <li><i className="fa fa-user" />{cmt[object2]['name_user']}</li>
                        <li><i className="fa fa-clock-o" /> {cmt[object2]['updated_at']}</li>
                      </ul>
                      <p>{cmt[object2]['comment']}</p>
                    </div>
                  </li>
                  )
                }
              })}

            </React.Fragment>

          )
        }
        
      })
    }
  }
  /* replay 
    - lấy id comment cha 
    - id comment con = id comment cha 
  */
  function replay(e){
    const id = e.target.id
    setCmtId(id)
  }
 
  //  ==== hiển thị bình luận mới nhất ====
  function getCmt(commentData){
   let newCmt =commentData.data;
   console.log(commentData)
  //  commentData : 1 object => xx : 1 mảng
    const listCmt = cmt.concat(newCmt)
    setCmt(listCmt)
  }
  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        {renderData()}
      </div>{/*/blog-post-area*/}
      <Rate/>
      {/*/rating-area*/}
      <div className="socials-share">
        <a href><img src="images/blog/socials.png" alt="" /></a>
      </div>{/*/socials-share*/}
      <div className="response-area">
          <h2>3 RESPONSES</h2>
          <ul className="media-list">
            {renderComment()}
          </ul>			
        </div> 
      <Comment getCmt = {getCmt} getId={cmtId}/>

    </div>
  );  
}
export default Detail;