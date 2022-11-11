import axios from "axios";
import {useState} from "react"
import { Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
function Register(props){
    const[input, setInput] = useState({
        name: '',
        email:'',
        password:'',
        phone: '',
        address: '',
        country : '',
        lever : 0
    });

    const objectCountry = [
        {
            'id' : '',
            'name' : 'Please select'
        },
        {
            'id': '3',
            'name' : 'Viet nam'
        },
        {
            'id': '4',
            'name' : 'Anh'
        },
        {
            'id': '5',
            'name' : 'Phap'
        }
    ]

    const navigate = useNavigate()
    const[error, setError] = useState('')
    const[getAvatar, setAvatar] = useState('')
    function handlechange(e){
        const nameInput = e.target.name
        const value = e.target.value
        setInput(state=>({...state,[nameInput]:value}))
    }
    const [getFile, setFile] = useState("")
    function handleUserInputFile(e){
        const file = e.target.files;
        console.log(file)
        let reader = new FileReader() ;
        reader.onload = (e) => {
            setAvatar(e.target.result)
            setFile(file[0])
        };
        reader.readAsDataURL(file[0]);
    }
   

    function listCountry(){
        if(objectCountry.length > 0){
            return objectCountry.map((value, key) => {
                return (
                    <option key = {key} value = {value.id}>{value.name}</option>
                )
            });
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        const testEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const testPass = /^(?=.*[a-z])[A-Za-z0-9\d=!\-@._*]+$/;
        const testPhone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
        
        console.log(input)
        if(input.name == ""){
            errorSubmit.name = 'vui long nhap ten'
            flag = false;
        }else {
            errorSubmit.name = ''
        }

        if(input.email == ""){
            errorSubmit.email = 'vui long nhap email'
            flag = false 
        }else if(!testEmail.test(input.email)){
            errorSubmit.email = "email sai dinh dang"
            flag = false
        }else {
            errorSubmit.email = ''
        }

        if(input.password == ""){
            errorSubmit.password = 'vui long nhap password'
            flag = false
        }
        else if(testPass.test(input.password)){
            
            errorSubmit.password = '' 
        }
        else{
            flag = false  
            errorSubmit.password = 'pass sai ding dang'
        }

        if(input.phone == ''){
            flag = false 
            errorSubmit.phone = 'vui long nhap phone'
        }else if(testPhone.test(input.phone)) {
            errorSubmit.phone = ''
        }else {
            flag = false
            errorSubmit.phone = 'phone sai dinh dang'
        }

        if(getFile == ""){
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

        if(input.country == ''){
            flag = false
            errorSubmit.country = 'vui long chon'
        }else{
            errorSubmit.country = ''
        }

        if(!flag){
            setError(errorSubmit)
        }else{
           
            const data = 
                {
                    name: input.name,
                    email: input.email,
                    password: input.password,
                    phone: input.phone,
                    address: input.address,
                    avatar : getAvatar,
                    country: input.country,
                    level: 0
                }
            
            axios.post("http://localhost:8080/laravel/laravel/public/api/register", data)
            .then((res)=>{
                console.log(res)
                if(res.data.errors){
                   setError(res.data.errors)
                }
                else{
                    navigate('/Login')
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
                    <div className="card-header">Register Member</div>
                    <div className="card-body">
                        <br />
                        <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
                            <input type="hidden" name="_token" defaultValue="Akn5uPxH0GEokgWFqvgTrTz3ZX3fVHTsayb85Qqa" />
                            <div className="form-group row">
                                <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Full Name (*)</label>
                                <div className="col-md-8">
                                    <input id="name" type="text" className="form-control " name="name" placeholder="Name" autoComplete="name"  onChange={handlechange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email (*)</label>
                                <div className="col-md-8">
                                    <input id="name" type="text" className="form-control " name="email" placeholder="Email" autoComplete="email"  onChange={handlechange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Password (*)</label>
                                <div className="col-md-8">
                                    <input id="name" type="password" className="form-control " name="password" placeholder="Pass" autoComplete="password"   onChange={handlechange}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Phone</label>
                                <div className="col-md-8">
                                    <input id="phone" type="text" className="form-control " name="phone" placeholder="Phone" autoComplete="phone"   onChange={handlechange}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Address</label>
                                <div className="col-md-8">
                                    <input id="address" type="text" className="form-control " name="address" placeholder="Address" autoComplete="address"  onChange={handlechange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Avatar (*)</label>
                                <div className="col-md-8">
                                    <input id="avatar" type="file" className="form-control " name="avatar" onChange={handleUserInputFile} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Country (*)</label>
                                <div className="col-md-8">
                                    <select name="country" className="form-control form-control-line" onChange={handlechange}>
                                        {listCountry()}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row mb-0">
                                <div className="col-md-8 offset-md-4">
                                    <button type="submit" className="btn btn-primary">
                                        Register
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
    );
}
export default Register;