import FooterAdmin from "components/Footers/FooterAdmin.js";
import HeaderStats from "components/Headers/HeaderStats.js";
// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import React, { useEffect, useState } from "react";
import { Redirect, Switch } from "react-router-dom";
// views
import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
//guards
import GuardedRouteAdmin from "../guards/GuardedRouteAdmin";
import http from '../http/http';




export default function Admin() {
  const isAdmin=!!sessionStorage.getItem("userSession") && !!JSON.parse(sessionStorage.getItem("isAdmin"));
  console.log(!!sessionStorage.getItem("userSession"))
  console.log(!!JSON.parse(sessionStorage.getItem("isAdmin")))
  console.log({isAdmin: isAdmin})
  const [stats,setStats] = useState({shortened:0,users:0,clicks:0,mostUsed:''})
  useEffect(() =>{
    async function fetchData() {
      const bToken= `Bearer ${sessionStorage.getItem('userSession')}`;
        const config = {
          headers: { Authorization: bToken }
      };
      const {data:{totalShortened}} = await http.get("/short-url/statistics/shortened",config);
      const {data:totalClicks} = await http.get("/short-url/statistics/clicks",config);
      const {data:{totalUsers}} = await http.get("/auth/statistics/users",config);
      const {data} = await http.get("/short-url/statistics/devices/mostused",config);
      const deviceMaxTotal=Math.max(...data.map(({total})=>total));
      const mostusedDevice=data.find(device=>device.total===deviceMaxTotal)._id;
      setStats({
        shortened:totalShortened+'',
        users:totalUsers+'',
        clicks:totalClicks[0].totalClicksAverageRounded+'',
        mostused:mostusedDevice
      });
      console.log({stats});
    };
    fetchData();
  },[])
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats {...stats}/>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <GuardedRouteAdmin path='/admin/dashboard' exact component={Dashboard} auth={isAdmin}/>
            <GuardedRouteAdmin path='/admin/maps' exact component={Maps} auth={isAdmin}/>
            <GuardedRouteAdmin path='/admin/settings' exact component={Settings} auth={isAdmin}/>
            <GuardedRouteAdmin path='/admin/tables' exact component={Tables} auth={isAdmin}/>
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
