import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

function My_Product(props){
    // const userData = JSON.parse(localStorage.getItem("Auth"))
    // console.log(userData.id)
    const[data, setData] = useState('')
    console.log(data)
    useEffect(() => {
        // console.log(data)
        let accessToken = JSON.parse(localStorage.getItem("token"));
        // console.log(accessToken)
        let url = "http://localhost:8080/laravel/laravel/public/api/user/my-product"
        let config = { 
            headers: { 
                'Authorization': 'Bearer '+ accessToken.token,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            } 
        }
        axios.get(url, config)
        .then(res =>{
            console.log(res)
            setData(res.data.data)
        })
    },[]);

    function handleSection(e){
        let id = e.target.className
        // console.log(id)
        let accessToken = JSON.parse(localStorage.getItem("token"));
            
        let url = 'http://localhost:8080/laravel/laravel/public/api/user/delete-product/' + id ;
        let config = { 
            headers: { 
                'Authorization': 'Bearer '+ accessToken.token,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }            
        };
        axios.get(url, config)
        .then(res=>{
            // console.log(res)
            window.location.reload();
        }) 
    }

    function handleEdit(e){
        let edit = e.target.className
        console.log(edit)
    }
    
    function renderData(){
        const userData = JSON.parse(localStorage.getItem("Auth"));
        if(Object.keys(data).length > 0){
            return Object.keys(data).map((value, key)=>{
                // console.log(data[value]['id'])
                const avatar = JSON.parse(data[value]['image'])
                // console.log(avatar[1])
                // console.log(userData.id)
                return(
                    <tr key={key} class="table-section-product">
                        <td class="id-product">{data[value]['id']}</td>
                        <td class="name-product">{data[value]['name']}</td>
                        <td class="img-product"><img src={"http://localhost:8080/laravel/laravel/public/upload/user/product/"+ userData.id + "/" + avatar[0] } alt=""/></td>
                        <td class="price-product">{data[value]['price']}</td>
                        <td class="action-product" >
                            <button  type="submit" id="edit"> <Link to ={'/account/edit_product/'+ data[value]['id'] }>Edit</Link> </button>
                            <button  onClick={handleSection} className={data[value]['id']}type="submit" id="delete">Delete</button>          
                        </td>
                    </tr>     
                )
            })
        }
    }
       
    return(
        <div className="col-sm-9 padding-right">
            <div className="row justify-content-center">
                <div class="wrap-my-product">
                    <table class="table-my-product">
                    <thead class="header-table">
                        <tr class="table-menu">
                        <td class="id">ID</td>
                        <td class="name">Name</td>
                        <td class="image">Image</td>
                        <td class="price">Price</td>
                        <td class="action">Action</td>
                        </tr>
                    </thead>
                    <tbody class="table-tbody">
                        {renderData()}
                    </tbody>
                    </table>
                    
                    </div>
                </div>
            <div className="form-group row mb-0">
                <div className="col-md-8 offset-md-4">
                <button class="Add-new-product" type="submit"><Link to='/account/add_product'>Add New</Link></button>
                </div>
            </div>
        </div>
    )
}
export default My_Product;