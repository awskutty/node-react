import React, { useEffect, useRef, useState } from "react";
import SideBar from "../../components/menu-elements/sidebar";
import Menu from "../../assets/icons/menu.png";
import "primeflex/primeflex.css";
import Add from "../../assets/icons/add.png";
import DynamicUi from "../../components/dynamicUi";
import { Dialog } from "primereact/dialog";
import AddSideBar from "../../components/menu-elements/addSideBar";
import AddNewTab from "../dashboard/container/addNewTab";
import { Button } from "primereact/button";

import AddSvg from "../../assets/svg/add.svg";
import Close from "../../assets/icons/close.png";
import edit from "../../assets/icons/edit.png";
import Tick from "../../assets/icons/check.png";
import { Graph } from "jsoncrack-react";

import jsonViewer from "../../assets/icons/eye.png";
import jsonCrack from "../../assets/icons/data-visualization.png";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

const Home = ({
  keys,
  defaultJSOn,
  updatedNodeConfig,
  nodeType,
  isAdmin,
}) => {
  const [tabHeader, setTabHeader] = useState([]);
  const [currentHeader, setCurrentHeader] = useState("");
  const [tabContent, setTabContent] = useState([]);
  const [currentContent, setCurrentContent] = useState("");
  const [path, setPath] = useState("");
  const [renderJson, setRenderJson] = useState(null);
  const [json, setJson] = useState(defaultJSOn);
  const [showJson, setShowJson] = useState(false);
  const [footer, setFooter] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showAddSidebar, setShowAddSidebar] = useState(false);
  const [iterate, setIterate] = useState(0);
  const [isAddNewTabSideBar, setIsAddNewTabSidebar] = useState(false);
  const [isGrapViewer, setIsGrapViewer] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState(null);
  const [selectedHeaderData, setSelectedHeaderData] = useState({
    path: "", newValue: ""
  });
  const [selectedcontent, setSelectedContent] = useState(null)
  const [selectedheadercontent, setSelectedheadercontent] = useState({ path: "", newValue: "" })



  const handleheadercontent = (e, path) => {
    setSelectedheadercontent({ path, newValue: e.target.value })
  }

  const handleHeaderUpdate = (e, path) => {
    setSelectedHeaderData({ path, newValue: e.target.value })
  }

  const handleUpdateContent = () => {
    if (selectedHeaderData.newValue && selectedHeaderData.path) {
      const updatedJson = { ...json };
      const pathKeys = selectedHeaderData.path.split(".");
      let currentNode = updatedJson;
      for (let i = 0; i < pathKeys.length - 1; i++) {
        currentNode = currentNode[pathKeys[i]];
      }
      const lastKey = pathKeys[pathKeys.length - 1];
      currentNode[lastKey] = selectedHeaderData.newValue;
      newJson(updatedJson);
      const keys = Object.keys(updatedJson);
      const tabHeaders = [];
      keys.forEach((elem) => {
        tabHeaders.push({
          header: updatedJson[elem].header,
          path: elem,
          footer: updatedJson[elem].footer,
        });
      });
      setTabHeader([...tabHeaders]);
      const tabContents = handleHeader(tabHeaders[0]);
      handleContent(tabContents[0]);
    }
  }


  const handletabcontent = () => {
    if (selectedheadercontent.path && selectedheadercontent.newValue) {
      const updatedJson = { ...json };
      const pathKeys = selectedheadercontent.path.split(".");
      let currentNode = updatedJson;
      for (let i = 0; i < pathKeys.length - 1; i++) {
        currentNode = currentNode[pathKeys[i]];
      }
      const lastKey = pathKeys[pathKeys.length - 1];
      delete Object.assign(currentNode, { [selectedheadercontent.newValue]: currentNode[lastKey] })[lastKey]
      newJson(updatedJson);
      const keys = Object.keys(updatedJson);
      const tabHeaders = [];
      keys.forEach((elem) => {
        tabHeaders.push({
          header: updatedJson[elem].header,
          path: elem,
          footer: updatedJson[elem].footer,
        });
      });
      setTabHeader([...tabHeaders]);
      const tabContents = handleHeader(tabHeaders[0]);
      handleContent(tabContents[0]);
    }
  }

  useEffect(() => {
    const keys = Object.keys(json);
    const tabHeaders = [];

    keys.forEach((elem) => {
      tabHeaders.push({
        header: json[elem].header,
        path: elem,
        footer: json[elem].footer,
      });
    });
    setTabHeader([...tabHeaders]);
    const tabContents = handleHeader(tabHeaders[0]);
    handleContent(tabContents[0]);
  }, []);

  const handleHeader = (data) => {
    // setSelectedHeader(null);
    setSelectedContent(null)
    console.log(data, "data");
    setCurrentContent("");
    setRenderJson(null);
    setCurrentHeader(data.header);
    setFooter(data.footer);
    const tabContents = [];
    Object.keys(json[data["path"]].content).map((item) => {
      tabContents.push({
        header: item,
        path: `${data["path"]}.content`,
        value: json[data["path"]].content,
      });
    });
    setTabContent([...tabContents]);
    return tabContents;
    // handleContent(tabContents[0])
  };

  const handleAddContent = () => {
    setShowAddSidebar(!showAddSidebar);
  };

  const handleDeleteContent = (path) => {
    const updatedJson = { ...json };
    const pathKeys = path.split(".");

    let currentNode = updatedJson;
    for (let i = 0; i < pathKeys.length - 1; i++) {
      currentNode = currentNode[pathKeys[i]];
    }
    const lastKey = pathKeys[pathKeys.length - 1];
    delete currentNode[lastKey];
    newJson(updatedJson);
    const keys = Object.keys(updatedJson);
    const tabHeaders = [];

    // keys.length > 0 &&
    //   keys.forEach((elem) => {
    //     tabHeaders.push({
    //       header: json[elem].header,
    //       path: elem,
    //       footer: json[elem].footer,
    //     });
    //   });
    // if (keys.length) {
    // if (Object.keys(updatedJson).length)
    keys.forEach((elem) => {
      tabHeaders.push({
        header: updatedJson[elem].header,
        path: elem,
        footer: updatedJson[elem].footer,
      });
    });
    // if (tabHeaders.length) {
    setTabHeader([...tabHeaders]);
    const tabContents = handleHeader(tabHeaders[0]);
    handleContent(tabContents[0]);
    // } else {
    //   setTabContent([]);
    //   setTabHeader([]);
    // }
    // }
  };

  const handleContent = (data) => {
    setSelectedHeader(null);
    // setSelectedContent(null)
    setCurrentContent(data.header);
    setPath(data.path + "." + data.header);
    setRenderJson(data.value[data.header]); // going to render the value of clicked data.header
  };
  const getCurrentPath = (path, key) => {
    // setCurrentPath(path + "." + key);
    return path + "." + key;
  };

  const handleAdded = (itemkey, obj, isheader = false) => {
    if (!isheader) {
      // setExpandedKeys([]);
      const updatedJson = { ...json };
      // const path = getCurrentPath(itemkey);
      const pathKeys = path.split(".");
      let currentNode = updatedJson;
      for (const key of pathKeys) {
        currentNode = currentNode[key];
      }
      if (obj.type == "group") {
        currentNode[obj.name] = {};
      } else {
        currentNode[obj.name] = obj;
      }
      // setCurrentJson(updatedJson);
      newJson(updatedJson);

      if (pathKeys.length == 2) {
        const keys = Object.keys(updatedJson);
        const tabHeaders = [];

        keys.forEach((elem) => {
          tabHeaders.push({
            header: json[elem].header,
            path: elem,
            footer: json[elem].footer,
          });
        });
        setTabHeader([...tabHeaders]);
        const tabContents = handleHeader(tabHeaders[0]);
        handleContent(tabContents[0]);
      }
    } else {
      const updatedJson = { ...json };
      updatedJson[obj.name] = {
        header: obj.header,
        content: { [obj.group]: {} },
        footer: obj.footer,
      };
      newJson(updatedJson);
      const keys = Object.keys(updatedJson);
      const tabHeaders = [];

      keys.forEach((elem) => {
        tabHeaders.push({
          header: updatedJson[elem].header,
          path: elem,
          footer: updatedJson[elem].footer,
        });
      });
      setTabHeader([...tabHeaders]);
      const tabContents = handleHeader(tabHeaders[0]);
      handleContent(tabContents[0]);
    }
  };



  const newJson = (newjson) => {
    setJson(newjson);
    updatedNodeConfig(newjson);
  };
  // const handleAdd = (key) => {
  //   setExpandedKeys([]);
  //   setShowAddSidebar(true);
  //   setKey(key);
  // };

  const toast = useRef(null);


  const showSuccess = (msg) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: `${msg}`,
      life: 1000,
    });
  };
  const showError = (msg) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 1000,
    });
  };


  return (
    <div
      className="p-grid p-justify-center h-screen w-full	"
    // style={{ backgroundColor: "#F1EFEF" }}
    >
      {/* <div> */}
      <div className="p-col-6 w-12" style={{ height: "100%" }}>
        <div
          className="flex flex-row justify-content-between align-items-center "
          style={{ width: "99%" }}
        >
          <div style={{ visibility: isAdmin.canAdd ? "visible" : "hidden" }}>
            <Button
              className="cursor-pointers"
              onClick={() => {
                if (isAdmin.canAdd) {
                  setIsAddNewTabSidebar(!isAddNewTabSideBar)
                }
              }}
            >
              Add Topic
            </Button>
          </div>
          <div
            className="flex justify-content-between"
            style={{ width: "20%" }}
            too
          >
            <img
              className=" cursor-pointer"
              src={jsonViewer}
              alt="menu"
              onClick={() => setShowJson(true)}
              style={{ height: "30px", width: "30px" }}
              title="View JSON"
            />
            <img
              className=" cursor-pointer"
              style={{ height: "30px", width: "30px" }}
              src={jsonCrack}
              alt="menu"
              onClick={() => setIsGrapViewer(true)}
              title="Visualize JSON"
            />
          </div>
        </div>

        <div
          className="flex align-items-center justify-content-between"
          style={{ backgroundColor: "white" }}
        >
          <div className="flex " >
            {Object.values(tabHeader).map((data, index) => {
              return (
                <div
                  key={index}
                  className="flex align-items-center justify-content-around"
                  style={{ height: "50px", minWidth: "150px" }}
                >
                  {(selectedHeader === data.header) ? <InputText type="text"
                    defaultValue={selectedHeaderData.value ? selectedHeaderData.value : selectedHeader}
                    onChange={(e) => handleHeaderUpdate(e, `${data.path}.header`)} style={{ maxWidth: "80px" }} /> : <p
                      className=" m-0 font-semibold cursor-pointer"
                      onClick={() => {
                        const tabContents = handleHeader(data);
                        handleContent(tabContents[0]);
                      }}
                      style={{
                        // borderBottom:
                        //   data.header === currentHeader && "1px solid red",
                        fontSize: "16px",

                        // textTransform: "capitalize",
                        color: data.header === currentHeader && "#4e78c3",
                      }}
                    >
                    {data && data.header ? data.header : ''}
                  </p>}
                  <div className="flex align-items-center">
                    {selectedHeader && selectedHeader === data.header ? <img
                      src={Tick}
                      alt="Tick"
                      style={{
                        width: "10px",
                        height: "10px",
                        marginLeft: "10px",
                        cursor: "pointer",
                        visibility: isAdmin.canDelete ? "visible" : "hidden",
                      }}
                      onClick={() => {
                        if (isAdmin.canDelete)
                          handleUpdateContent();
                      }}
                    /> : <img
                      src={edit}
                      alt="Update"
                      style={{
                        width: "10px",
                        height: "10px",
                        marginLeft: "10px",
                        cursor: "pointer",
                        visibility: isAdmin.canDelete ? "visible" : "hidden",
                      }}
                      onClick={() => {
                        if (isAdmin.canDelete) {
                          const tabContents = handleHeader(data);
                          handleContent(tabContents[0]);
                          setSelectedHeader(data.header)
                        }

                      }}
                    />
                    }
                    <div
                      role="button"
                      className="avatar flex align-items-center justify-content-center"
                      onClick={() => {
                        const tabContents = handleHeader(data);
                        setIterate(0);
                        setPath(tabContents[0].path);
                        handleAddContent();
                      }}
                      style={{
                        visibility: isAdmin.canAdd ? "visible" : "hidden",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "20px",
                          fontWeight: "500",
                          margin: "0",
                          marginLeft: "10px"
                        }}
                      >
                        +
                      </p>
                    </div>
                    <img
                      src={Close}
                      alt="Close"
                      style={{
                        width: "10px",
                        height: "10px",
                        marginRight: "10px",
                        marginLeft: "5px",
                        cursor: "pointer",
                        visibility: isAdmin.canDelete ? "visible" : "hidden",
                      }}
                      onClick={() => {
                        if (isAdmin.canAdd) {
                          setIterate(0);
                          // setPath(data.path);
                          Object.keys(tabHeader).length > 1 ? handleDeleteContent(data.path) :
                            // alert("Dont Delete");
                            showError("Dont Delete");
                        }
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
        <div className="flex pt-1 m-0" >
          {tabContent.map((data, index) => {
            return (
              <div
                className="flex"
                key={index}
                style={{ padding: "0 10px 0 5px" }}
              >
                {selectedcontent == data.header ?
                  <InputText type="text"
                    defaultValue={selectedheadercontent.value ? selectedheadercontent.value : selectedcontent}
                    onChange={(e) => handleheadercontent(e, `${data.path}.${data.header}`)} style={{ maxWidth: "100px" }} /> :
                  <p
                    className="flex  m-0 font-semibold cursor-pointer"
                    onClick={() => handleContent(data)}
                    style={{
                      borderBottom:
                        data.header === currentContent && "1px solid #4e78c3",
                      fontSize: "14px",
                      padding: "10px 5px 10px 5px",
                      // textTransform: "capitalize",
                      // backgroundColor:
                      //   data.header === currentContent && "#FBFBFB",
                    }}
                  >
                    {data.header.toLowerCase()}
                  </p>}
                <div className="flex align-items-center">
                  {selectedcontent && selectedcontent === data.header ? <img
                    src={Tick}
                    alt="Tick"
                    style={{
                      width: "10px",
                      height: "10px",
                      marginLeft: "10px",
                      cursor: "pointer",
                      visibility: isAdmin.canDelete ? "visible" : "hidden",
                    }}
                    onClick={() => {
                      if (isAdmin.canDelete) {
                        handletabcontent();
                      }
                    }}
                  /> : <img
                    src={edit}
                    alt="Update"
                    style={{
                      width: "10px",
                      height: "10px",
                      // marginRight: "10px",
                      cursor: "pointer",
                      visibility: isAdmin.canDelete ? "visible" : "hidden",
                    }}
                    onClick={() => {
                      if (isAdmin.canDelete) {
                        handleContent(data);
                        setSelectedContent(data.header)
                      }
                    }}
                  />
                  }
                  <div
                    role="button"
                    className="avatar flex align-items-center justify-content-center"
                    onClick={() => {
                      if (isAdmin.canAdd) {
                        setIterate(1);
                        handleContent(data);
                        handleAddContent();
                      }
                    }}
                    style={{
                      visibility: isAdmin.canAdd ? "visible" : "hidden",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "500",
                        margin: "0",
                      }}
                    >
                      +
                    </p>
                    {/* <img
                    src={Add}
                    alt="Add"
                    style={{
                      width: "10px",
                      height: "10px",
                      marginRight: "10px",
                    }}
                    onClick={() => {
                      setIterate(1);
                      handleContent(data);
                      handleAddContent();
                    }}
                  /> */}
                  </div>
                  <img
                    src={Close}
                    alt="Close"
                    style={{
                      width: "10px",
                      height: "10px",
                      marginRight: "10px",
                      cursor: "pointer",
                      visibility: isAdmin.canDelete ? "visible" : "hidden",
                    }}
                    onClick={() => {
                      if (isAdmin.canDelete) {
                        setIterate(0);
                        // setPath(data.path);
                        console.log("path", data.path);
                        Object.keys(tabContent).length > 1 ? handleDeleteContent(data.path + "." + data.header) :
                          // alert("Dont Delete");
                          showError("Dont Delete");
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <Dialog
          visible={isGrapViewer}
          style={{ width: "100vw", height: "100vh" }}
          onHide={() => {
            setIsGrapViewer(!isGrapViewer);
          }}
          maximizable
        >
          <Graph json={JSON.stringify(json)} style={{ height: "100%" }} />
        </Dialog>
        <div>
          {/* {tabContent.length ? ( */}
          <DynamicUi
            key={keys}
            json={json}
            data={renderJson}
            path={path}
            getJson={newJson}
            iteration={1}
            isAdmin={isAdmin}
          />

          {showJson && (
            <SideBar json={json} show={showJson} setShow={setShowJson} />
          )}
        </div>
        {/* </div> */}
        <p>{footer}</p>
      </div>
      {showAddSidebar && (
        <AddSideBar
          itemkey={path}
          handleAdded={handleAdded}
          showSideBar={showAddSidebar}
          setShowSideBar={setShowAddSidebar}
          iteration={iterate}
        />
      )}
      {isAddNewTabSideBar && (
        <AddNewTab
          itemkey={path}
          showSideBar={isAddNewTabSideBar}
          setShowSideBar={setIsAddNewTabSidebar}
          handleAdded={handleAdded}
        />
      )}
      <Toast ref={toast} />
    </div>
  );
};

export default Home;
