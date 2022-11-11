import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login(){
    const[param, setParam] = useState({
      email : '',
      password : '',
      level : 0
    });
    const navigate = useNavigate();
    const[error, setError] = useState('')
    function handlechange(e){
      const nameParam = e.target.name
      const value = e.target.value
      setParam(state=>({...state,[nameParam]:value})) 
    }
    function handleSubmit(e){
        e.preventDefault();
        const errorSubmit={};
        let flag = true;
        if(param.email == ''){
            errorSubmit.email = 'vui long nhap email'
            flag = false 
        }else {
          errorSubmit.email = ''
        }
        if(param.password == ''){
            errorSubmit.password = 'vui long nhap password'
            flag = false
        }else{
          errorSubmit.password = ''
        }
        if(!flag){
            setError(errorSubmit)
        }else {
          const data = {
            email : param.email,
            password : param.password,
            level: 0
          }
          axios.post("http://localhost:8080/laravel/laravel/public/api/login", data)
          .then((res)=>{
            console.log(res)
            if(res.data.errors){
              setError(res.data.errors);
            }else{
              localStorage.setItem("isLogin", JSON.stringify(true));
              localStorage.setItem('Auth', JSON.stringify(res.data.Auth))
              localStorage.setItem('token', JSON.stringify(res.data.success))
              navigate('/')
            }
          })
         
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

    return(
        <div className="col-sm-9 padding-right">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  Login Member
                </div>
                <div className="card-body">
                  <br />
                  <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="hidden" name="_token" defaultValue="ll7gEtz90I2y8dsW5Tg9vjkkTFDTzQeos8f4pqpJ" />
                    <div className="form-group row">
                      <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                      <div className="col-md-6">
                        <input id="email" type="email" className="form-control " name="email" placeholder="Email" autoComplete="email" onChange={handlechange} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
                      <div className="col-md-6">
                        <input id="password" type="password" className="form-control " name="password" placeholder="Password" autoComplete="current-password" onChange={handlechange} />
                      </div>
                    </div>
                   
                    <div className="form-group row mb-0">
                      <div className="col-md-8 offset-md-4">
                        <button type="submit" className="btn btn-primary">
                          Login
                        </button>
                        {/* <a class="btn btn-link" href="http://localhost:8080/laravel/laravel/public/password/reset">
                          Forgot Your Password?
                        </a> */}          
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
export default Login;