import CardTable from "components/Cards/CardTable.js";
import React, { useEffect, useState } from "react";
import http from "../../http/http";

export default function Tables() {
  const [links,setLinks] =useState([]);
  const fetchData = React.useCallback(async () =>{
    const bToken= `Bearer ${sessionStorage.getItem('userSession')}`;
        const config = {
          headers: { Authorization: bToken }
      };
      const {data} = await http.get("/short-url",config);
      setLinks(data);
  },[])
  useEffect(() =>{
    fetchData();
  },[fetchData])
  const deleteLink = async(id) =>{
    console.log("elimino ",id);
    const bToken= `Bearer ${sessionStorage.getItem('userSession')}`;
        const config = {
          headers: { Authorization: bToken }
      };
    const data = await http.delete(`/short-url/${id}`,config);
    fetchData()
  }
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable links={links} onDelete={deleteLink}/>
        </div>
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" links={links} />
        </div> */}
      </div>
    </>
  );
}
