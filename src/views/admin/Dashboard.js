import CardBarChart from "components/Cards/CardBarChart.js";
// components
import CardLineChart from "components/Cards/CardLineChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import React, { useEffect, useState } from "react";
import http from '../../http/http';


export default function Dashboard() {
  const [datasets,setDatasets]= useState(undefined)
  const [datasetsBar,setDatasetsBar]= useState(undefined) // for barChart
  const [links,setLinks]= useState([]);
  const [devices,setDevices]= useState([])
  useEffect(() =>{
    async function fetchData(){
      try{
        const bToken= `Bearer ${sessionStorage.getItem('userSession')}`;
        const config = {
          headers: { Authorization: bToken }
      };
        const {data} = await http.get("/short-url/statistics",config);
        const {data:deviceStatistics} = await http.get("/short-url/statistics/devices",config);
        const {data:links} = await http.get("/short-url/limit/5",config);
        const {data:devices} = await http.get("/short-url/statistics/devices/mostused",config);
        console.log({data})
        setDatasets(data);
        setDatasetsBar(deviceStatistics);
        setLinks(links);
        setDevices(devices);
      } catch(e){
        console.log(e);
      }
    }
    fetchData()
  },[])
 
  const formatDatasetStatistics= (dataset)=>{
    return {
      fill: false,
      backgroundColor: "#fff",
      borderColor: "#fff",
      label:dataset[0]._id.year,
      data:dataset[0].monthlyusage
      .sort((a,b)=>a.month-b.month)
      .map(data=>{
        return data.totalMonth
      })
    }
  }
  const formatLabelsStatistics=(dataset)=>{
    return dataset[0].monthlyusage.sort((a,b)=>a.month-b.month).map(data=>data.monthString)
  }
  const formatDatasetBarStatistics= (dataset)=>{
    return dataset.map(data=>{
      const randomColor=Math.floor(Math.random()*16777215).toString(16);
        return {
          fill: false,
          backgroundColor: `#${randomColor}`,
          borderColor: `#${randomColor}`,
          label:data._id.deviceType,
          barThickness: 8,
          data:data.monthlyusage
          .sort((a,b)=>a.month-b.month)
          .map(dataBar=>{
            return dataBar.totalMonth
          })
        }
    })
  }
  
  const formatLabelsBarStatistics=(dataset)=>{
   
    const monthlyusagesArr=dataset.map(({monthlyusage})=>monthlyusage);
    const monthlyusagesLengths =monthlyusagesArr.map(l=>l.length);
    const monthsIndex=monthlyusagesArr.findIndex(arr=>arr.length===Math.max(...monthlyusagesLengths)); //index of the array who contains all the monthsArr
    return dataset[monthsIndex].monthlyusage
    .sort((a,b)=>a.month-b.month)
    .map(data=>data.monthString)
  
  }
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {!!datasets && (
            <CardLineChart datasets={formatDatasetStatistics(datasets)} labels={formatLabelsStatistics(datasets)}/>
          )}
        </div>
        <div className="w-full xl:w-4/12 px-4">
          {!!datasetsBar && (
            <CardBarChart datasets={formatDatasetBarStatistics(datasetsBar)} labels={formatLabelsBarStatistics(datasetsBar)}/>
          )}
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits links={links}/>
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic devices={devices}/>
        </div>
      </div>
    </>
  );
}
