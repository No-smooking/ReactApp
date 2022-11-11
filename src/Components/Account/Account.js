import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { navigate, useParams } from "react-router-dom";
function Account(props){
    const[dataUser,setDataUser ] = useState({
        id : '',
        name : '',
        email:'',
        pass : '',
        phone : '',
        address : ''
    });

    const[error, setError] = useState('')
  
    useEffect(()=>{
        let userData =JSON.parse (localStorage.getItem("Auth"));
       
        setDataUser({
            id : userData.id,
            name : userData.name,
            email : userData.email,
            pass : userData.password,
            phone : userData.phone,
            address : userData.address
        });

    },[])
    const[getAvatar, setAvatar] = useState('')
    const [getFile, setFile] = useState("")
    function handleUserInputFile(e){
        const file = e.target.files;

        let reader = new FileReader() ;
        reader.onload = (e) => {
            setAvatar(e.target.result)
            setFile(file[0])
        };
        reader.readAsDataURL(file[0]);
    }
    function handlechange(e){
        const nameInput = e.target.name
        const value = e.target.value
        setDataUser(state=>({...state,[nameInput]:value}))
    }
    function handleSubmit(e){
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        const testPhone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
        
        console.log(dataUser)
        if(dataUser.name == ""){
            errorSubmit.name = 'vui long nhap ten'
            flag = false;
        }else {
            errorSubmit.name = ''
        }
        if(dataUser.phone == ''){
            flag = false 
            errorSubmit.phone = 'vui long nhap phone'
        }else if(testPhone.test(dataUser.phone)) {
            errorSubmit.phone = ''
        }else {
            flag = false
            errorSubmit.phone = 'phone sai dinh dang'
        }

        if(getFile == " "){
            errorSubmit.avatar = "vui long upload file"
        }else{
            console.log(getFile)
            const tailFile  = ["png", "jpg", "jpeg", "PNG", "JPG"];
            let getByte = getFile['size']; 
            let nameFiles = getFile['name'];
            let tail = nameFiles.split(".");
            let testTailFiles = tailFile.includes(tail[1])
           
            if (getByte > 1024 * 1024){
                flag = false
                errorSubmit.avatar = "loi dinh dang"
            }else if(!testTailFiles){
                flag =  false
                errorSubmit.avatar = "loi dinh dang files"
            }else {
                errorSubmit.avatar = ""
            }
        }

        if(!flag){
            setError(errorSubmit)
        }else{
            const accessTokens = JSON.parse(localStorage.getItem("token"));
            let url = "http://localhost:8080/laravel/laravel/public/api/user/update/" + dataUser.id;
            let config = { 
                headers: { 
                    'Authorization': 'Bearer '+ accessTokens.token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                } 
            };
            const formData = new FormData();
                formData.append('name', dataUser.name);
                formData.append('email',dataUser.email);
                formData.append('password', dataUser.pass  ? dataUser.pass :"");
                formData.append('phone', dataUser.phone);
                formData.append('address', dataUser.address);
                formData.append('avatar' , getAvatar);
            axios.post(url, formData, config)
            .then((res)=>{
                console.log(res)
                if(res.data.errors){
                   setError(res.data.errors)
                }
            })
        }
       
    }
    function renderError(){
        if(Object.keys(error).length > 0) {
            return Object.keys(error).map((key, index) => {
                return (
                    <p key={index}>{error[key]}</p>
                );
            })
        }
    }
    return(
        <div className="col-sm-9 padding-right">
            <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                <div className="card-header">User Update!</div>
                <div className="card-body">
                    <br />
                    <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                        <input type="hidden" name="_token" defaultValue="xNRvy9rLyuLkVOFhaytT9q6CF0VlP9SqSeHBG24H" />
                        <div className="form-group row">
                        <div className="col-md-8">
                            <input id="name" type="text" className="form-control " onChange={handlechange} value={dataUser.name} name="name" autoComplete="name" placeholder="Name"  />
                        </div>
                        </div>
                        <div className="form-group row">
                        <div className="col-md-8">
                            {/* readOnly -> khong thay doi doi tuong */}
                            <input id="name" type="text" readOnly className="form-control " name="email" placeholder="Email" value={dataUser.email} autoComplete="email"  />
                        </div>
                        </div>
                        <div className="form-group row">
                        <div className="col-md-8">
                            <input id="name" type="password"  className="form-control " value="" name="password" placeholder="Pass" autoComplete="password"  />
                        </div>
                        </div>
                        <div className="form-group row">      
                        <div className="col-md-8">
                            <input id="phone" type="text" className="form-control " name="phone" onChange={handlechange} Value={dataUser.phone} placeholder="Phone" autoComplete="phone"  />
                        </div>
                        </div>
                        <div className="form-group row">  
                        <div className="col-md-8">
                            <input id="address" type="text" className="form-control " name="address" onChange={handlechange} Value={dataUser.address} placeholder="Address" autoComplete="address"  />
                        </div>
                        </div>
                        <div className="form-group row">  
                        <div className="col-md-8">
                            <input id="avatar" type="file" onChange={handleUserInputFile} className="form-control " name="avatar" />
                        </div>
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
export default Account;