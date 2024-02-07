import React, { useEffect, useRef, useState } from "react";
import DynamicUi from "../components/dynamicUi";
// import JSON from "../utils/data.json";
import SideBar from "../components/menu-elements/sidebar";
import Menu from "../assets/icons/menu.png";
import 'primeflex/primeflex.css';


const Home = ({keys,JSON}) => {
  const [tabHeader, setTabHeader] = useState([]);
  const [currentHeader, setCurrentHeader] = useState("");
  const [tabContent, setTabContent] = useState([]);
  const [currentContent, setCurrentContent] = useState("");
  const [path, setPath] = useState("");
  const [renderJson, setRenderJson] = useState({});
  const [json, setJson] = useState(JSON);
  const [showJson, setShowJson] = useState(false);
  const[footer, setFooter]= useState(null)
 

  useEffect(() => {
    const keys = Object.keys(JSON);  
    const tabHeaders = [];

    keys.forEach((elem) => {
      tabHeaders.push({ header: JSON[elem].header, path: elem , footer: JSON[elem].footer});

    });
    setTabHeader([...tabHeaders]);
  }, []);
  const handleHeader = (data) => {
    setCurrentContent("")
    setRenderJson({});
    setCurrentHeader(data.header);
    setFooter(data.footer)
    const tabContents = [];
    Object.keys(JSON[data["path"]].content).map((item) => {
      tabContents.push({
        header: item, 
        path: `${data["path"]}.content`, // api.content
        value: JSON[data["path"]].content, // api.content.fields
      });
  
    });
    setTabContent([...tabContents]);
  };

  const handleContent = (data) => {
    setCurrentContent(data.header);
    setPath(data.path + "." + data.header);
    setRenderJson(data.value[data.header]); // going to render the value of clicked data.header
   
  };

  const newJson = (newjson) => {
    setJson(newjson);
  };

  return (
    <div  className="p-grid p-justify-center h-screen	">
    <div>
      <div  className="p-col-6 w-12" >
        <div class= "flex flex-row-reverse ">
          <img class = "h-1rem w-1rem cursor-pointer"
            src={Menu}
            alt="menu"
            onClick={() => setShowJson(true)}
          />
        </div>
        <div class= "flex"
          style={{
            borderBottom: currentHeader && "2px solid #D3D3D3",
          }}
        >
          {Object.values(tabHeader).map((data) => {
            return (
              <div key={data} >
                <p class= "p-3 m-0 font-bold cursor-pointer"
                  onClick={() => handleHeader(data)}
                  style={{
                    borderBottom:
                      data.header === currentHeader && "2px solid red",
                  }}
                >
                  
                  {data.header}
                </p>
              </div>
            );
          })}
        </div>
        <div class= "flex pt-1 m-0"
          style={{
            borderBottom: tabContent && "2px solid #D3D3D3",
          }}
        >
          {tabContent.map((data) => {
            return (
              <div key={data}>
                <p class= "flex p-2 m-0 font-bold cursor-pointer"
                  onClick={() => handleContent(data)}
                  style={{
                    borderBottom:
                      data.header === currentContent && "2px solid #42adf5",
                  }}
                >
                  {data.header}
                </p>
              </div>
            );
          })}
        </div>
        <DynamicUi
        key={keys}
          json={JSON}
          data={renderJson}
          path={path}
          getJson={newJson}
        />
        {showJson && (
          <SideBar json={json} show={showJson} setShow={setShowJson} />
        )}
      </div>
          <p>{footer}</p>
    </div>
    </div>
  );
};

export default Home;
