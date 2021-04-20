/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react'
import {useParams, useHistory} from "react-router-dom";
import http from "../http/http";
const ShortUrl = () => {
    const { shorturl } = useParams();
    const history = useHistory();
    useEffect(() =>{
        async function fetchData() {
            // You can await here
            try {
              console.log({shorturl})
              const {data} = await http.get(`/short-url/${shorturl}`);
               console.log({data});
               window.location.replace(data.redirectUrl);
            } catch (e){
                
              console.log({e})
              history.push({
                pathname: '/',
                state: { detail: e.response.data.errorMessage }
            });
            }
          }
          fetchData();
    },[shorturl,history])
    return (null)
}

export default ShortUrl
