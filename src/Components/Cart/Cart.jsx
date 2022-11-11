import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Cart(){
    const ex = JSON.parse(localStorage.getItem('Cart'))
    console.log(ex)
    const[data, setData] = useState('')
    console.log(data)
    useEffect(()=>{
        axios.post('http://localhost:8080/laravel/laravel/public/api/product/cart',ex)
        .then(res => {
            console.log(res)
            setData(res.data.data)
        },[])
    },[])
            // active
            // : 
            // 0
            // company_profile
            // : 
            // "tuan dinh"
            // condition
            // : 
            // null
            // created_at
            // : 
            // "2022-10-27 20:35:51"
            // detail
            // : 
            // "10"
            // highlight
            // : 
            // 0
            // id
            // : 
            // 29
            // id_brand
            // : 
            // 1
            // id_category
            // : 
            // 3
            // id_user
            // : 
            // "8"
            // image
            // : 
            // "[\"1666877747_robots.jpg\",\"1666877749_xe \\u0111\\u1eb9p.jpg\"]"
            // name
            // : 
            // "Le sy tuan 11"
            // price
            // : 
            // 100000
            // qty
            // : 
            // 1
            // sale
            // : 
            // 10
            // status
            // : 
            // 1
            // updated_at
            // : 
            // "2022-10-27 20:35:51"
            // web_id
            // : 
            // null 

    
    function renderData(){
        if(Object.keys(data).length > 0 ){
            return Object.keys(data).map((value, key)=>{
                const images = JSON.parse( data[value]['image'])
                console.log(images)
                return (
                    <tr key={key} class="cart_section-product">
							<td class="cart_product">
								<a href=""><img src={"http://localhost:8080/laravel/laravel/public/upload/user/product/" + data[value]['id_user'] + '/' + images[0]} alt=""/></a>
							</td>
							<td class="cart_description">
								<h4><a href="">Colorblock Scuba</a></h4>
								<p>Web ID: {data[value]['web_id']}</p>
							</td>
							<td class="cart_price">
								<p>{data[value]['price']}</p>
							</td>
							<td class="cart_quantity">
								<div class="cart_quantity_button">
									<a class="cart_quantity_up" href=""> + </a>
									<input class="cart_quantity_input" type="text" name="quantity" value="1" autocomplete="off" size="2"/>
									<a class="cart_quantity_down" href=""> - </a>
								</div>
							</td>
							<td class="">
								<p class="cart_total_price">$59</p>
							</td>
							<td class="cart_delete">
								<a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a>
							</td>
						</tr>     

						
                )
            })
        }
    }
    return(
        <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li><a href="#">Home</a></li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Item</td>
                  <td className="description" />
                  <td className="price">Price</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                  <td />
                </tr>
              </thead>
              <tbody>
              {renderData()}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    )
}
export default Cart;