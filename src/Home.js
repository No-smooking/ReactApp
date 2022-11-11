
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
function Home(){
    const [data, setData] = useState('')
    // console.log(data)
    useEffect(()=>{
        axios.get("http://localhost:8080/laravel/laravel/public/api/product")
        .then(res =>{
            console.log(res)
            setData(res.data.data)
        })
    },[])
    const[cart, setCart] = useState('')
    // console.log(cart)
    function idProduct(e){

        let idProducts= e.target.id;
        let qty = 1
        setCart(state =>({...state,[idProducts]: qty}))
        console.log(cart)
        if(Object.keys(cart).length > 0 ){

            localStorage.setItem('Cart',JSON.stringify(cart))
           
        }
    }

    const renderProduct=()=>{
        if(Object.keys(data).length > 0){
            return Object.keys(data).map((value, key)=>{
                const images = JSON.parse(data[value]['image'])
                const user = data[value]['id_user']
                // console.log(data[value]['id'])
                return(
                  

                        <div key={key} className="col-sm-4" onClick={idProduct} >
                                    <div className="product-image-wrapper">
                                        <div className="single-products" >
                                            <div className="productinfo text-center" >
                                                <img src={"http://localhost:8080/laravel/laravel/public/upload/user/product/" + user + "/" + images[0] } alt=""/>
                                                <h2>{data[value]['price']}</h2>
                                                <p>{data[value]['name']}</p>
                                                <button  id={data[value]['id']} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                            </div>
                                            {/* <div className="product-overlay">
                                            <div className="overlay-content">
                                                <h2 id ={data[value]['price']}>{data[value]['price']}</h2>
                                                <p id ={data[value]['name']}> {data[value]['name']} </p>
                                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                            </div>
                                            </div> */}
                                        </div>
                                        <div className="choose">
                                            <ul className="nav nav-pills nav-justified">
                                            <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
                                            <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li>
                                            </ul>
                                        </div>
                                    </div>
                        </div>
                )
            })
        }
    }
    return (
        <div className="App">
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 padding-right">
                            <div className="features_items">{/*features_items*/}
                            <h2 className="title text-center">Features Items</h2>
                            {renderProduct()}
                            </div>{/*features_items*/}
                            <div className="category-tab">{/*category-tab*/}
                            <div className="col-sm-12">
                                <ul className="nav nav-tabs">
                                <li className="active"><a href="#tshirt" data-toggle="tab">T-Shirt</a></li>
                                <li><a href="#blazers" data-toggle="tab">Blazers</a></li>
                                <li><a href="#sunglass" data-toggle="tab">Sunglass</a></li>
                                <li><a href="#kids" data-toggle="tab">Kids</a></li>
                                <li><a href="#poloshirt" data-toggle="tab">Polo shirt</a></li>
                                </ul>
                            </div>
                            <div className="tab-content">
                                <div className="tab-pane fade active in" id="tshirt">
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={7}> 
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={8}>
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={9}>
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={10}>
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className="tab-pane fade" id="blazers">
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={11}>
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={12}>
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={13}>
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={14}>
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className="tab-pane fade" id="sunglass">
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper" id={15}>
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={16}>
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={17}>
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={18}>
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className="tab-pane fade" id="kids">
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={19}>
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={20}>
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={21}>
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={22}>
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className="tab-pane fade" id="poloshirt">
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={23}>
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={24}>
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={25}>
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center" id={26}>
                                        <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>{/*/category-tab*/}
                            <div className="recommended_items">{/*recommended_items*/}
                            <h2 className="title text-center">recommended items</h2>
                            <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                <div className="item active">	
                                    <div className="col-sm-4">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                        <div className="productinfo text-center" id={27}>
                                            <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/recommend1.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-sm-4">
                                    <div className="product-image-wrapper">
                                        <div className="single-products" id={28}>
                                        <div className="productinfo text-center">
                                            <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/recommend2.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-sm-4">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                        <div className="productinfo text-center" id={29}>
                                            <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/recommend3.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="item">	
                                    <div className="col-sm-4">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                        <div className="productinfo text-center" id={30}>
                                            <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/recommend1.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-sm-4">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                        <div className="productinfo text-center" id={31}>
                                            <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/recommend2.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-sm-4">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                        <div className="productinfo text-center" id={32}>
                                            <img src="http://localhost:8080/laravel/laravel/public/frontend/images/home/recommend3.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                                <i className="fa fa-angle-left" />
                                </a>
                                <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                                <i className="fa fa-angle-right" />
                                </a>			
                            </div>
                            </div>{/*/recommended_items*/}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;