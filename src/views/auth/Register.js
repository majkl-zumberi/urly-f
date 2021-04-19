import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import http from '../../http/http';

export default function Register() {
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
  const handleSignUp = () => {
    console.log("dssd")
    http.post("/auth/signUp",{
      ...credentials
    }).then((response) => {
      console.log({response});
      history.push({
        pathname: '/auth/login',
      });
    }).catch((error) => {
      console.log({error})
      setError({failure:true,message:error.response.data.errorMessage})
    })
  }
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
             
              <div className="flex-auto px-4 lg:px-10 py-10 pt-5">
                <form onSubmit={(e)=>{e.preventDefault();  handleSignUp()}}>
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
                      Crea Account
                    </button>
                    <div className="text-blueGray-700 text-center mt-3 mb-2 font-bold">
                    <Link to="/auth/login">
                     <small>Oppure Accedi</small>
                     </Link>
                     </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
