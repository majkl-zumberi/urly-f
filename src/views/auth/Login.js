import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import http from '../../http/http';
export default function Login() {
  const history = useHistory();
  const [credentials,setCredentials]= useState({email:'',password:'',})
  const [Error,setError]= useState({failure:false,message:''});
  const handleChange = (event)=>{
    setCredentials(prevCredentials=>{
      return {
        ...prevCredentials,
        [event.target.name]:event.target.value
      }
    })
  }
  const handleLogin = ()=>{
    console.log("entrato in login")
     http.post("/auth/signIn",{
      ...credentials
    }).then(response=>{
      console.log(response.data)
      sessionStorage.setItem("userSession",response.data.token)
      sessionStorage.setItem("isAdmin",response.data.isAdmin)
      history.push({
        pathname: '/',
      });
    }).catch(e=>{
      console.log(e)
      setError({failure:true,message:e.response.data.errorMessage})
      setCredentials(prevCredentials=>{
        return {
          ...prevCredentials,
          password:''
        }
      })
    });
    
  }
  const renderError=()=>{
    return Error.failure && (
      <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
        <span className="text-xl inline-block mr-5 align-middle">
          <i className="fas fa-exclamation-triangle"></i>
        </span>
        <span className="inline-block align-middle mr-8 ml-1">
          <b className="capitalize"> ...Ops!</b> {Error.message}
        </span>
        <button 
        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-8 outline-none focus:outline-none"
        onClick={()=>setError({failure:false,message:''})}>
          <span>×</span>
        </button>
      </div>
    )
  }
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            {renderError()}
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-5">
                <form onSubmit={(e)=>{e.preventDefault();  handleLogin()}}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Accedi
                    </button>
                    
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2"></div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
