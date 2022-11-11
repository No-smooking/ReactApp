import {useEffect, useState } from "react";
import axios from "axios";
import {
    Link
} from "react-router-dom";
function Index(){
    const[getItem, setItem] = useState('');
    useEffect(() => {
        axios.get("http://localhost:8080/laravel/laravel/public/api/blog")
        .then(response => {
            setItem(response.data.blog)
        })

        .catch(function (error){
            console.log(error);
        })
    },[]);

    function fetchData(){
        if(Object.keys(getItem).length > 0){
            
            return getItem.data.map((value, key)=>{
                return(
                    <div key={key} className="single-blog-post">
                        <h3>{value.title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user" /> Mac Doe</li>
                                <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                <li><i className="fa fa-calendar" />{value.updated_at}</li>
                            </ul>
                        {/* <span>
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star-half-o" />
                        </span> */}
                        </div>
                        <a href>
                            <img src={"http://localhost:8080/laravel/laravel/public/upload/Blog/image/" + value.image} alt="" />
                        </a>
                        <p>{value.description}</p>
                        <Link className="btn btn-primary" to={"/blog/detail/" + value.id}>Read More</Link>
                    </div>
                    
                    
                );

            })
        }
    }
    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {fetchData()}
                <div className="pagination-area">
                    <ul className="pagination">
                        <li><a href className="active">1</a></li>
                        <li><a href>2</a></li>
                        <li><a href>3</a></li>
                        <li><a href><i className="fa fa-angle-double-right" /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Index;