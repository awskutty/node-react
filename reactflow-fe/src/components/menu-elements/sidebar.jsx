import React from "react";
import { Sidebar } from "primereact/sidebar";

const SideBar = ({ json, show, setShow }) => {
  return (
    <div className="surface-section font-bold   ">
  
    <Sidebar className=" border-500 hover:border-700 border-3 border-round  surface-overlay  text-bluegray-400 hover:text-bluegray-900 "
        visible={show}
        position="right"
        onHide={setShow}
       
      >
        <div className= "overflow-x-scroll overflow-y-scroll" >
          <pre>{JSON.stringify(json, null, 2)}</pre>
        </div>
      </Sidebar>
    </div>
  
  );
};

export default SideBar;
