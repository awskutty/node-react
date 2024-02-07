import React from "react";
import menuIcon from "../img/menu.png";
import backIcon from "../img/arrows.png";
import Torus from "../img/torus.png";
import { FaMoon, FaSun } from "react-icons/fa";
const MenuDetailsComponent = ({ MENU_DETAILS, toside, role,setToside ,  darkmode,  toggleDarkmode,}) => {
  const onDragStart = (
    event,
    nodeType,
    nodeName = "start",
    rolesColor,
    roles
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/name", nodeName);
    event.dataTransfer.setData("application/roleColor", rolesColor);
    event.dataTransfer.setData("application/roles", roles);
    event.dataTransfer.effectAllowed = "move";
  };
  const handleclick=()=>{
    toggleDarkmode()
  }

  return (
    <>
      <div className={toside ? "bigContainer" : "smallContainer"}>
        <div
          className="flex flex-column justify-content-between align-items-center"
          style={{ width: "100%", height: "100%" }}
        >
          <div
            style={{ height: "10%", width: "100%", paddingLeft: "18px" }}
            className="flex justify-content-start align-items-center"
          >
            <div
              onClick={() => {
                setToside(!toside);
              }}
            >
              {toside ? (
                <img
                  src={backIcon}
                  className="opacity-80"
                  style={{ width: "20px" }}
                />
              ) : (
                <img src={menuIcon} style={{ width: "20px" }} />
              )}
            </div>
          </div>
          <div
            className="flex flex-column w-full"
            style={{
              height: "69%",
              gap: "20px",
              overflow: "scroll",
              maxHeight: "400px",
            }}
          >
            {MENU_DETAILS.map((node, index) => {
              return (
                <div
                  key={index}
                  className={
                    toside
                      ? " w-full flex justify-content-center align-items-center border-round "
                      : "w-full flex justify-content-center align-items-center  "
                  }
                  id={`${toside ? "asasas" : ""}`}
                  style={{
                    height: `${toside ? "60px" : "60px"}`,
                    // border: `${toside ? "1px solid #d3d3d3" : ""}`,
                  }}
                  onDragStart={(event) =>
                    onDragStart(
                      event,
                      node.type,
                      node.name,
                      role[Object.keys(role)[Object.keys(role).length - 1]],
                      Object.keys(role)[Object.keys(role).length - 1]
                    )
                  }
                  draggable
                >
                  {toside ? (
                    <p
                      className="font-semibold"
                      style={{
                        fontSize: "15px",
                        color: "#808080",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src={node.icons}
                        className="opacity-80"
                        alt={node.name}
                        title={node.name}
                      />
                      <span>{node.name}</span>
                    </p>
                  ) : (
                    <img
                      src={node.icons}
                      title={node.name}
                      className="opacity-80"
                    />
                  )}
                </div>
              );
            })}
          </div>
         
          <span onClick={handleclick}  >
                {
                  darkmode? <FaSun /> : <FaMoon />
                }
          </span>
     
          <div style={{ marginTop: "27px" ,  }}>


           <a href="https://www.gsstechgroup.com/">

            <img
              src={Torus}
              alt="torus"
              style={{
                height: `${!toside ? "50px" : "80px"}`,
                width: `${!toside ? "50px" : "80px"}`,
                
              }}
            />
           </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuDetailsComponent;
