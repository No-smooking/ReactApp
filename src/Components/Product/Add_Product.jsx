import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AddProduct(props){
    const[input, setInput] = useState({
        name : '',
        category : '',
        brand : '',
        price : '',
        company : ''
    })
    const[detail, setDetail] = useState('')
    const[priceStatus, setPriceStatus] = useState('')
    const [inputSale, setSale] = useState('')
    const [checkShow, setCheckShow] = useState(true)
    // console.log(input.priceSale)
    const[dataBrand, setBrand] = useState('');
    const[dataCategory, setCategory] = useState('');
    // console.log(dataBrand)
    // const[File, setFile] = useState('');
    const [avatar, setAvatar] = useState()
    console.log(avatar)
    function handleUserInputFile(e){
        const file = e.target.files;
        setAvatar(file)
    }
    const[error, setError] = useState('')
    // console.log(getFile)
    function handlechange(e){
        const nameInput = e.target.name
        const value = e.target.value
        
        setInput(state=>({...state, [nameInput]:value}))
    }
    function changePriceSale(e){
        setSale(e.target.value)
        console.log('inputSale: ', inputSale)
    }
    function changDetail(e){
        setDetail(e.target.value)
    }
    
    function changeCheckShow(e){
        const status = e.target.value
        setPriceStatus(status)
        setCheckShow(!checkShow)  // ẩn hiện form
        console.log("status : ", status)
    }
    useEffect(()=>{
        axios.get("http://localhost:8080/laravel/laravel/public/api/category-brand")
        .then(res=>{
            // console.log(res)
            setBrand(res.data.brand)
            setCategory(res.data.category)
        })
    },[])

    function handleSubmit(e){
        e.preventDefault()
        // console.log()
        let userData = localStorage.getItem("Auth");
        // console.log(userData)
        let errorSubmit = {};
        let flag = true
        if(input.name == ""){
            flag=false
            errorSubmit.name = "vui long nhap ten"
        }else{
            flag = true
            errorSubmit.name = ""
        }

        if(input.price == ""){
            flag = false 
            errorSubmit.price = "vui long nhap gia"
        }else{
            flag = true
            errorSubmit.price = ""
        }
        if(input.status == 0){
            if(inputSale == ''){
                flag = false
                errorSubmit.sale = "vui long nhap sale"
            }else{
                flag = true
                errorSubmit.sale = ""
            }
        }

        if(input.company == ''){
            flag = false
            errorSubmit.company = "vui long nhap thong tin company"
        }else{
            flag = true
            errorSubmit.company = ""
        }

        // ==== file ảnh start
        

        if(Object.keys(avatar).length > 3){
            flag = false
            errorSubmit.avatar = 'file qua lon '
        }else{
            if(Object.keys(avatar).length > 0 ){
                Object.keys(avatar).map((value, key)=>{
                    const sizeFile = avatar[value]['size']
                    const nameFile = avatar[value]['name']
                    const img = ["png", "jpg", "jpeg", "PNG", "JPG"];
                    const tailName = nameFile.split(".");
                    let testFile = img.includes(tailName[1])
                    console.log(tailName)
                    
                    if(sizeFile > 1024 * 1024){
                        flag = false;
                        errorSubmit.avatar = 'avatar sai  dinh dang'
                    }else if(!testFile){
                        flag =  false
                        errorSubmit.avatar = "loi dinh dang files"
                    }else {
                        flag = true
                        errorSubmit.avatar = ""
                    }
                    
                })
            }
        }
        // ==== file ảnh end 


        
        if(!flag){
            setError(errorSubmit)
        }else{
            setError(errorSubmit)
            let accessToken = JSON.parse(localStorage.getItem("token"));
            
            let url = 'http://localhost:8080/laravel/laravel/public/api/user/add-product';
            let config = { 
                headers: { 
                    'Authorization': 'Bearer '+ accessToken.token,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                } 
            };
            const formData = new FormData();
                    formData.append('name', input.name);
                    formData.append('price',input.price);
                    formData.append('category', input.category);
                    formData.append('brand', input.brand);
                    formData.append('company', input.company);
                    formData.append('status', priceStatus);
                    formData.append('sale', inputSale);
                    formData.append('detail', detail);

                    Object.keys(avatar).map((item, i)=>{
                        formData.append('file[]', avatar[item]);
                    })
                axios.post(url, formData, config)
                .then(res=>{
                    console.log(res)
                    if(res.data.errors){
                        setError(res.data.errors)
                    }
                }) 
        }
    }
    function renderError(){
        // console.log(error)
        if(Object.keys(error).length > 0){
            return Object.keys(error).map((value, key)=>{
                return(
                    <p key={key}>{error[value]}</p>
                )
            })
        }
    }

    function renderBrand(){
        if(Object.keys(dataBrand).length > 0){
            return Object.keys(dataBrand).map((value, key)=>{
                return(
                    <option key={key} value={dataBrand[value]['id']}>{dataBrand[value]['brand']}</option>
                )
            })
        }
    } 
    function renderCategory(){
        if(Object.keys(dataCategory).length > 0){
            return Object.keys(dataCategory).map((value, key)=>{
                return(
                    <option key={key} value={dataCategory[value]['id']}>{dataCategory[value]['category']}</option>
                )
            })
        }
    } 
    return(
        <div className="col-sm-9 padding-right">
            <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                <div className="card-header"><h3>Create Product!</h3></div>
                <div className="card-body">
                    <br />
                    <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                        <input type="hidden" name="_token" defaultValue="xNRvy9rLyuLkVOFhaytT9q6CF0VlP9SqSeHBG24H" />
                        <div className="form-group row">
                        <div className="col-md-8">
                            <input id="name" type="text" onChange={handlechange} className="form-control" name="name" autoComplete="name" placeholder="Name"  />
                        </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-8">
                                <input id="price" type="text" onChange={handlechange} className="form-control " name="price" placeholder="Price"  autoComplete="price"  />
                            </div>
                        </div>
                        {/* {renderBrand()} */}
                        <div className="form-group row">
                            <div className="col-md-8">
                                <select name="category" onChange={handlechange} className="form-control form-control-line">
                                {renderCategory()}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                        <div className="col-md-8">
                            <select name="brand" onChange={handlechange} className="form-control form-control-line">
                            {renderBrand()}
                            </select>
                        </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-8">
                                <select name="status" onChange = {changeCheckShow} className="form-control form-control-line">
                                    <option value="1" onClick={()=>{changeCheckShow(true)}}>Sale</option>
                                    <option value="0" onClick={()=>{changeCheckShow(false)}}>New</option>
                                </select>
                            </div>
                        </div>
                        {/* saleNew */}
                                {
                                    checkShow === true && 
                                        <div>
                                            <div className="form-group row">
                                                <div className="col-md-4">
                                                    <input type="number" onChange={changePriceSale} className="form-control " name="sale"   placeholder="0"  autoComplete=""/>  
                                                    <span><h4>%</h4></span> 
                                                </div>
                                            </div>  
                                        </div>
                                }
                           
                        <div className="form-group row">  
                            <div className="col-md-8">
                                <input type="text" className="form-control " onChange={handlechange} name="company"   placeholder="Company profile" autoComplete=""  />
                            </div>
                        </div>
                        <div className="form-group row">  
                            <div className="col-md-8">
                                <input id="avatar" type="file" onChange={handleUserInputFile} className="form-control " name="avatar" multiple/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <form className="col-sm-8 ">
                                <textarea placeholder="detail" onChange={changDetail} name="detail" rows="{10}" />
                            </form>
                        </div>
                        <div className="form-group row mb-0">
                            <div className="col-md-8 offset-md-4">
                                <button type="submit" className="btn btn-primary">
                                    Signup
                                </button>
                            </div>
                        </div>
                    </form>
                    {renderError()}
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}
export default AddProduct;