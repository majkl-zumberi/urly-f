import { createPopper } from "@popperjs/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";
const IndexDropdown = () => {
  const history = useHistory();
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const logout= ()=>{
    sessionStorage.removeItem("userSession")
    sessionStorage.removeItem("isAdmin")
    history.push({
      pathname: '/',
  });
  }
  const isAdmin=!!sessionStorage.getItem("userSession") && !!JSON.parse(sessionStorage.getItem("isAdmin"));
  const renderAuthLoginLogout=()=>{
    if(!(!!sessionStorage.getItem("userSession"))){
      return (
        <>
        <Link
          to="/auth/login"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Login
        </Link>
        <Link
          to="/auth/register"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Registrati
        </Link>
        </>
      )
    } else {
      return (
        <a href="#logout" className={
          "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        } onClick={()=>logout()}>Logout</a>
      )
    }
  }
  return (
    <>
      <a
        className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        Urly panel
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        {isAdmin && (
          <>
          <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          }
        >
          Admin
        </span>
        <Link
          to="/admin/dashboard"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/tables"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Links Accorciati
        </Link>
          </>
        )}
        <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          }
        >
          Autenticazione
        </span>
        {renderAuthLoginLogout()}
        <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
      </div>
    </>
  );
};

export default IndexDropdown;
