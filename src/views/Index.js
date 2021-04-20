/*eslint-disable*/
import Footer from "components/Footers/Footer.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import http from "../http/http";

export default function Index() {
  const isAuthenticated = !!sessionStorage.getItem("userSession");
  const location = useLocation();
    useEffect(() => {
      !!location?.state?.detail && setError({failure:true,message:location.state.detail})
   }, [location]);
  const [Error,setError]= React.useState({failure:false,message:''});
  const [state,setState]= React.useState({url:'',slug:'',shortened:false});
  const [copySuccess, setCopySuccess] = React.useState(false);
  const urlInputRef = React.useRef(null);
  const slugInputRef = React.useRef(null);
  const handleChange = event => {
    setState(prevState=>{
        return {
          ...prevState,
          shortened:false,
          [event.target.name]:event.target.value
        }
      });
  };
  const shorten= async ()=>{
    try{
      // const {data}= await http.post("/short-url",{
      //   fullurl:state.url
      // });
      const promise = !isAuthenticated
       ? 
       http.post("/short-url",{fullurl:state.url})
       :
       http.post("/short-url/slug",{fullurl:state.url,slug:state.slug},{
        headers: { Authorization: `Bearer ${sessionStorage.getItem('userSession')}` }
       })
      const {data} = await promise;
      setState({url:`${process.env.REACT_APP_PROJECTURL}/${data.shortUrl}`,shortened:true})
    } catch (e){
      setError({failure:true,message:e.response.data.errorMessage})
    }
  }
  const copyToClipboard = () => {
    urlInputRef.current.select();
    document.execCommand('copy');
    setCopySuccess(true)
  }
  const renderSuccessIfShortened=()=>{
    return copySuccess && (
      <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-emerald-500">
        <span className="text-xl inline-block mr-5 align-middle">
          <i className="far fa-check-circle"></i>
        </span>
        <span className="inline-block align-middle mr-8 ml-1">
          <b className="capitalize"> Fatto!</b> link copiato nella clipboard
        </span>
        <button 
        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-8 outline-none focus:outline-none"
        onClick={()=>setCopySuccess(false)}>
          <span>×</span>
        </button>
      </div>
    )
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
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                Urly, accorcia il tuo url!
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
               Gestisci i tuoi link come un professionista, non lasciare che i link ti limitino
              </p>
              <div className="mt-12 flex">
              <input 
                type="text"
                className="border-0 px-3 py-3 placeholder-LightBlue-800 text-LightBlue-600 bg-white rounded text-sm shadow w-full focus:outline-none focus:ring  ease-linear transition-all duration-150"
                placeholder="inserisci un super url"
                ref={urlInputRef}
                name="url"
                value={state.url}
                onChange={handleChange}
                    />
              {isAuthenticated && (<input 
                type="text"
                name="slug"
                ref={slugInputRef}
                value={state.slug}
                onChange={handleChange}
                className="border-0 px-3 py-3 placeholder-LightBlue-800 text-LightBlue-600 bg-white rounded text-sm shadow w-2 focus:outline-none focus:ring  ease-linear transition-all duration-150"
                placeholder="inserisci slug"
                    />)}
              <button 
              class="px-3 py-3   rounded-r-lg text-white font-bold rounded-l-none rounded outline-none focus:outline-none mr-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
              onClick={()=>state.shortened?copyToClipboard():shorten()}
              >{state.shortened? 'copia':'accorcia'}
              </button>
              </div>
              <div className="mt-12">
                {renderSuccessIfShortened()}
                {renderError()}
              </div>
            </div>
          </div>
        </div>

        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          src={require("assets/img/pattern_react.png").default}
          alt="..."
        />
      </section>

      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                <img
                  alt="..."
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-lightBlue-500 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                    Accorcia, accorcia e accorcia ancora!
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                  Gestisci i tuoi link in maniera semplice e veloce, non lasciare che i link ti limitino
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="w-full md:w-6/12 px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-shipping-fast"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Facile e Veloce!
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        Urly ti aiuta a creare con semplicità url davvero corti!
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-user"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Benefit con autenticazione
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        Se effettuerai il login ti spettano gli slug, crea i tuoi url scegliendo tu la parola con cui accorciarla!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-shield-alt"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Sicuro</h6>
                      <p className="mb-4 text-blueGray-500">
                        Urly è una piattaforma sicura, non condivide nessun dato ad altre terze parti
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-key"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Accessi Illimitati
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        I link che accorcerai non scadranno mai! accedi quando vuoi!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 bg-blueGray-200 relative pt-32">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10">
            <div className="w-full text-center lg:w-8/12">
              <p className="text-4xl text-center">
                <span role="img" aria-label="love">
                  😍
                </span>
              </p>
              <h3 className="font-semibold text-3xl">
                Ti piace urly?
              </h3>
              <p className="text-blueGray-500 text-lg leading-relaxed mt-4 mb-4">
                supporta lo sviluppatore con un buon caffe!  
                <span role="img" aria-label="support">
                  ☕
                </span>
              </p>
              <div className="sm:block flex flex-col mt-10">
              <p className="text-blueGray-500 text-lg leading-relaxed mt-4 mb-4">
                Coming soon..
              </p>
              </div>
              <div className="text-center mt-16"></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
