import React from "react";

import { useState } from "react";
import { useEffect } from "react";

import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import Dyn from "./dynauii/dyn";
import DynObj from "./dynauii/DynObj";
import { useRef } from "react";

import TreeView from "./dynauii/TreeView";
import Side from "./dynauii/Side";
import _ from "lodash";
import curly from "./assets/dynicons/curly-brackets.png";
import arrow from "./assets/dynicons/arrow.png";
import "./tree.css";

import SingleObj from "./dynauii/SIngleObj";
import { Upload } from "./dynauii/UploadJson";

export default function Builder({
  keys,
  defaultJSOn,
  updatedNodeConfig,
  nodeType,
  isAdmin,
  controlPolicy,
  colorPolicy,
  showError,
  showSuccess,
}) {
  const [gDepth, setGDepth] = useState(0);
  const [render, setRender] = useState(true);

  const [totalOptions, setTotalOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [json, setJson] = useState({});
  const [dupJson, setDupJson] = useState({});
  const [toggle, setToggle] = useState(false);
  const [toggl, setToggl] = useState(false);
  const [selectedjson, setSelectedjson] = useState(null);

  const [collapse, setCollapse] = useState(false);
  const [path, setPath] = useState(null);
  const [func, setFunc] = useState(null);
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState(null);
  const [Key, setKey] = useState(null);
  const [selectedjsonPath, setSelectedjsonPath] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [totalColors, setTotalColors] = useState([]);
  const iRef = useRef(null);
  const [parentType, setParentType] = useState(null);
  const [title, setTitle] = useState(null);
  const [files, setFiles] = useState(null);
  // const [singlejs, setSinglejs] = useState(singleData);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (iRef.current && !iRef.current.contains(event.target)) {
        setContextMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const updateSinglejs = (js) => {
    updatedNodeConfig(js);
  };

  const settJson = (js, value = null) => {
    (async function () {
      try {
        setJson(js);

        const copiedObject = JSON.parse(JSON.stringify(js));
        await objectToPaths(copiedObject);

        if (selectedjson) {
          let result =
            selectedjsonPath.path == ""
              ? ["", selectedjsonPath.header]
              : selectedjsonPath.path.split(".");

          result.shift();
          result = result.join(".");
          const updatedselectedJs = _.get(copiedObject, result);

          setSelectedjson(updatedselectedJs);
        }

        setDupJson(copiedObject);
        updatedNodeConfig(js);
        setPath(null);
      } catch (err) {
        showError(err);
      }
    })();
  };
  const addFunction = (key, option, value, path) => {
    let updateValue =
      option === "string" || option === "number"
        ? value
        : option === "array"
        ? []
        : option === "boolean"
        ? false
        : {};
    let js = json;
    const upjs = _.set(js, path, updateValue);
    // _.update(js, path, function (n) {
    //   if (Array.isArray(n)) {
    //     let updateValue =
    //       option === "string" || option === "number"
    //         ? value
    //         : option === "array"
    //         ? []
    //         : option === "boolean"
    //         ? false
    //         : {};

    //     let arr = [...n];
    //     arr.push(updateValue);
    //     n = arr;
    //   } else {
    //     if (typeof n == "object") {
    //       let updateValue = {
    //         key: key,
    //         value:
    //           option === "string" || option === "number"
    //             ? value
    //             : option === "array"
    //             ? []
    //             : option === "boolean"
    //             ? false
    //             : {},
    //       };

    //       n[updateValue.key] = updateValue.value;
    //     } else {
    //       let updateValue = value;
    //       n[key] = updateValue;
    //     }
    //   }
    //   return n;
    // });

    settJson(upjs);
  };

  const functionality = (func, path, value = null) => {
    let result;

    result = path.split(".");
    result.shift();
    result = result.join(".");

    setPath(result);
    if (func == "add") {
      if (value) {
        addFunction(value.key, value.options, value.value, result);
      }
    }
    if (func == "edit") {
      if (value) {
        let path = _.toPath(result);
        let nestedObj = json;
        for (let i = 0; i < path.length - 1; i++) {
          nestedObj = nestedObj[path[i]];
        }

        nestedObj[value] = nestedObj[path[path.length - 1]];

        delete nestedObj[path[path.length - 1]];

        settJson(json);
      }
    }
    if (func == "update") {
      if (value) {
        const js = json;

        _.update(js, result, (n) => {
          // if (Array.isArray(n)) {
          //   console.log(n, "nArray");
          //   n.splice(value.key, 1, value.value);
          //   return n;
          // }

          n = value.value;
          return n;
        });
        settJson(js);
      }
    }
    if (func == "delete") {
      let js = json;
      let path = _.toPath(result);

      if (path.length) {
        for (let i = 0; i < path.length - 1; i++) {
          js = js[path[i]];
        }
        const indexToDelete = path[path.length - 1];
        const lastKey = path[path.length - 1];
        if (Array.isArray(js)) {
          js.splice(indexToDelete, 1);
        } else if (typeof js === "object") {
          delete js[lastKey];
        }

        settJson(json);
      } else {
        setSelectedjson(null);
        setJson({});
      }
    }
  };

  async function objectToPaths(data) {
    var validId = /^[a-z_$][a-z0-9_$]*$/i;
    doIt(data, "");
    function doIt(data, s) {
      if (data && typeof data === "object") {
        if (Array.isArray(data)) {
          for (var i = 0; i < data.length; i++) {
            if (data[i]) {
              doIt(data[i], s + "[" + i + "]");
              if (!Array.isArray(data[i]) && typeof data[i] === "object") {
                data[i].path = `${s}[${i}]`;
              }
            }
          }
        } else {
          for (var p in data) {
            if (!Array.isArray(data[p]) && typeof data[p] === "object") {
              data[p].path = s + "." + p;
            }
            if (validId.test(p)) {
              doIt(data[p], s + "." + p);
            } else {
              doIt(data[p], s + '["' + p + '"]');
            }
          }
        }
      }
    }
  }

  const getSelectedJson = (js, parentType, key) => {
    setParentType(parentType);
    setTitle(key);
    setSelectedjson(js);
  };
  function checkForNull(jsonData) {
    if (typeof jsonData === "object" && jsonData !== null) {
      if (Array.isArray(jsonData)) {
        jsonData.forEach((item) => checkForNull(item));
      } else {
        Object.values(jsonData).forEach((value) => checkForNull(value));
      }
    } else if (jsonData === null || jsonData === undefined) {
      return false;
    }

    return true;
  }
  useEffect(() => {
    if (files) {
      const error = checkForNull(JSON.parse(files));
      if (error) {
        setJson(JSON.parse(files));
        updatedNodeConfig(JSON.parse(files));
      } else {
        showError("key should not be null or undefined");
      }
    }
  }, [files]);

  const cycleObj = (
    json,
    totalOp,
    dp,
    totalco,
    parentType,
    title,
    single = null
  ) => {
    if (single) {
      return (
        <div>
          <DynObj
            title={title}
            isAdmin={isAdmin}
            json={json}
            collapse={collapse}
            functionality={functionality}
            depth={dp}
            totalOptions={totalOp}
            totalColors={totalco}
            parentType={parentType}
          />
        </div>
      );
    }
    if (typeof json == "object" && !Array.isArray(json)) {
      return (
        <div style={{ width: "100%" }}>
          <DynObj
            title={title}
            isAdmin={isAdmin}
            json={json}
            collapse={collapse}
            functionality={functionality}
            depth={dp}
            totalOptions={totalOp}
            settJson={settJson}
            totalColors={totalco}
            parentType={parentType}
          />
        </div>
      );
    }
    if (Array.isArray(json)) {
      return (
        <div style={{ width: "75%" }}>
          <Dyn
            title={title}
            isAdmin={isAdmin}
            data={json}
            className="col"
            collapse={collapse}
            path={selectedjsonPath.path}
            functionality={functionality}
            depth={dp}
            totalOptions={totalOp}
            totalColors={totalco}
          />
        </div>
      );
    }
  };

  useEffect(() => {
    let totalOption = [];

    if (Object.keys(controlPolicy).length == 0) {
      return setTotalOptions([]);
    } else {
      for (const [level, values] of Object.entries(controlPolicy)) {
        const levelOptions = values.map((value) => ({
          label: value.charAt(0).toUpperCase() + value.slice(1),
          value,
        }));

        totalOption.push({
          L: level.slice(5),
          options: levelOptions,
        });
      }
      setTotalOptions(totalOption);
      setOptions(totalOption[0].options);
      // console.log(options, "asd1111");
    }

    let totalColor = [];

    if (Object.keys(colorPolicy).length === 0) {
      return setTotalColors([]);
    } else {
      for (const [level, values] of Object.entries(colorPolicy)) {
        const levelOptions = {
          // label: values.charAt(0).toUpperCase() + values.slice(1),
          value: colorPolicy[level],
        };

        totalColor.push({
          L: level.slice(5),
          color: levelOptions.value,
        });
      }
      setTotalColors(totalColor);
    }
    settJson(defaultJSOn);
  }, [controlPolicy, colorPolicy, defaultJSOn]);

  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const copiedObject = JSON.parse(JSON.stringify(json));
  //       await objectToPaths(copiedObject);

  //       setDupJson(copiedObject);
  //     } catch (err) {
  //       showError(err.message);
  //     }
  //   })();
  // }, [json]);

  return (
    <>
      {totalOptions && totalOptions.length > 1 ? (
        <div className="home-page">
          <div className="tree-view ">
            <div id="myUL">
              <div className="json-container">
                <div className="json-title">
                  <div className="json-title" onClick={() => setToggl(!toggl)}>
                    <img
                      src={arrow}
                      alt="arrow"
                      class={toggl ? "arrow-caret caret-down " : "arrow-caret"}
                    />

                    <div
                      class="circle"
                      style={{ backgroundColor: `${totalColors[0]?.color}` }}
                    >
                      <i
                        class={`fa-solid fa-number fa-${totalOptions[0]?.L}`}
                      ></i>
                    </div>

                    <img
                      src={curly}
                      alt="curly-brackets"
                      style={{ width: "20px" }}
                    />
                  </div>

                  <span
                    ref={iRef}
                    style={{
                      display:
                        isAdmin?.canAdd || isAdmin?.canDelete
                          ? "inline"
                          : "none",
                    }}
                    onClick={(e) => {
                      if (contextMenu) {
                        setContextMenu(null);
                      } else setContextMenu(true);
                    }}
                  >
                    <i class="fa-solid fa-ellipsis caret-down"></i>
                  </span>

                  {contextMenu &&
                    contextMenu === true &&
                    options.length > 0 && (
                      <div className="overlap-panel josn-add-icons">
                        <span
                          style={{
                            visibility: isAdmin?.canAdd ? "visible" : "hidden",
                          }}
                          onClick={() => {
                            setFunc("add");
                          }}
                          className="first-add-btn"
                        >
                          <span
                            onClick={(e) => {
                              if (func === "add") {
                                setFunc(null);
                              } else setFunc("add");
                            }}
                          >
                            <i class="fa-solid fa-plus first-add-btn-img"></i>
                          </span>
                        </span>

                        <span
                          style={{
                            display: isAdmin?.canDelete ? "inline" : "none",
                          }}
                          htmlFor=""
                          onClick={() => {
                            setJson({});
                            setSelectedjson(null);
                          }}
                          className="first-add-btn trash-color"
                        >
                          <i class="fa-solid fa-trash first-add-btn-img"></i>
                        </span>
                      </div>
                    )}
                </div>

                {func && func === "add" && options.length > 0 && (
                  <div className="dots-container">
                    <InputText
                      id="key"
                      onChange={(e) => setKey(e.target.value)}
                      className="inputs"
                      placeholder="Enter key"
                    />

                    <Dropdown
                      id="dropdown"
                      options={options}
                      placeholder="Select an Option"
                      value={selected}
                      onChange={(e) => setSelected(e.value)}
                      className="w-10rem h-2rem flex align-items-center border-blue "
                    />
                    <div className="input-container">
                      {selected === "string" && (
                        <>
                          <InputText
                            id="value"
                            onChange={(e) => setValue(e.target.value)}
                            className="inputs"
                            placeholder="Enter value"
                          />
                        </>
                      )}
                    </div>
                    <div className="btns-container">
                      <div className="check-btn">
                        <span
                          onClick={() => {
                            settJson({
                              ...json,
                              [Key]:
                                selected === "string"
                                  ? value
                                  : selected === "array"
                                  ? []
                                  : {},
                            });
                            setFunc(null);
                          }}
                        >
                          <i class="fa-solid fa-check"></i>
                        </span>
                      </div>
                      <div className="check-btn close-btn">
                        <span onClick={() => setFunc(null)}>
                          <i class="fa-solid fa-xmark"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {Object.values(dupJson).map((element, index) => {
                  if (typeof element !== "object" && render) {
                    setRender(false);
                    if (selectedjson) {
                      setSelectedjson(null);
                    }
                  }
                })}
                {render && totalOptions.length > 2 && (
                  <TreeView
                    isAdmin={isAdmin}
                    json={dupJson}
                    iterator={Number(0)}
                    to={toggl}
                    getjson={getSelectedJson}
                    funtionality={functionality}
                    setToggle={setToggle}
                    setPath={setSelectedjsonPath}
                    totalOptions={totalOptions.length > 0 && totalOptions}
                    depth={1}
                    setDepth={setGDepth}
                    totalColors={totalColors.length > 0 && totalColors}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="panel-view">
            <div className="expand-btns">
              {(!render ||
                (selectedjson && Object.keys(selectedjson).length)) && (
                <span
                  className="expand-btn"
                  onClick={() => {
                    setCollapse(!collapse);
                  }}
                >
                  <i class="fa-solid fa-arrows-left-right-to-line caret-down"></i>
                </span>
              )}
              {!Object.keys(json).length && (
                <span className="fileUpload">
                  <Upload setFiles={setFiles} />
                </span>
              )}
            </div>

            {Object.keys(json).length && (
              <div className="json-viewer">
                <div
                  style={{ width: "90%" }}
                  className="flex flex-column align-items-center gap-2  border-round p-3  overflow-y-scroll"
                >
                  {totalColors.length > 2 &&
                    selectedjson !== null &&
                    cycleObj(
                      selectedjson,
                      totalOptions,
                      gDepth,
                      totalColors,
                      parentType,
                      title
                    )}

                  {(totalOptions.length <= 2 || !render) &&
                    cycleObj(dupJson, totalOptions, gDepth, totalColors)}
                </div>
              </div>
            )}
          </div>
          <Side
            toggle={toggle}
            setToggle={setToggle}
            func={func}
            path={path}
            json={json}
            setjs={settJson}
          />
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <SingleObj
            singlejson={json}
            options={options}
            updateSinglejs={updateSinglejs}
            isAdmin={isAdmin}
          />
        </div>
      )}
    </>
  );
}
