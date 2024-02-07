import { useEffect, useState } from "react";
import { Checkbox } from "primereact/checkbox";

import { Ripple } from "primereact/ripple";

import AddSingleElement from "./AddSingleElement";

import check from "../assets/dynicons/checked.png";

import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

import { Dialog } from "primereact/dialog";

const SingleObj = ({ singlejson, options, updateSinglejs, isAdmin }) => {
  const [json, setJson] = useState({});
  const [checkedtype, setCheckedtype] = useState([]);
  const [showsidebar, setShowsidebar] = useState(false);
  const [selectedinput, setSelectedinput] = useState(null);
  const [selectedkey, setSelectedkey] = useState(null);
  const [keyvalue, setKeyvalue] = useState(null);
  const [objvalue, setObjValue] = useState(null);
  const [checked, setChecked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [keyjson, setKeyjson] = useState(null);
  const [valuejson, setValuejson] = useState(null);
  const [showarr, setShowarr] = useState(null);

  const handlekey = (e) => {
    setKeyvalue(e.target.value);
  };

  useEffect(() => {
    setJson(singlejson);
  }, [singlejson]);

  const handleCheckbox = (e, key) => {
    let chjs = {
      ...json,
      [key]: e.checked,
    };
    setJson(chjs);
    updateSinglejs(chjs);
  };

  const handleselectkey = (e) => {
    setSelectedkey(e);
  };

  const handleselectvalue = (e) => {
    setSelectedinput(e);
  };
  const handleChange = (e, element, type = null) => {
    const updatedValue = e.target.value;
    setObjValue(updatedValue);
    handleEditvalue(element, updatedValue);
  };

  const handlearrayadd = (element) => {
    let js = { ...json };
    js[element].push("");
    setJson(js);
    updateSinglejs(js);
  };
  const handlearray = (e, element, index) => {
    let js = json;
    js[element].splice(index, 1, e.target.value);
    setJson(js);
    updateSinglejs(js);
  };

  const handlearraydel = (element) => {
    let js = { ...json };
    js[element].pop();
    setJson(js);
    updateSinglejs(js);
    if (js[element].length === 0) {
      setShowarr("");
    }
  };

  const handlearraydelete = (element, index) => {
    let js = {
      ...json,
      [element]: json[element].filter((_, i) => i !== index),
    };

    setJson(js);
    updateSinglejs(js);
  };

  const handleEditkey = (key) => {
    let updatedJs = {};
    updatedJs = {
      ...json,
      [keyvalue]: json[key],
    };
    delete updatedJs[key];

    setJson({ ...updatedJs });
    updateSinglejs({ ...updatedJs });
  };
  const handleEditvalue = (key, value, type = null) => {
    const updatedJs = {
      ...json,
      [key]: type && type === "number" ? Number(value) : value,
    };
    setJson(updatedJs);
    updateSinglejs(updatedJs);
  };

  const handledelete = (key) => {
    let deljs = { ...json };
    delete deljs[key];
    setJson(deljs);
    updateSinglejs(deljs);
  };

  const handleeditvaluejson = (e, element, ele) => {
    let val = {
      ...json,
      [element]: {
        ...json[element],
        [ele]: e.target.value,
      },
    };
    setJson(val);
    updateSinglejs(val);
  };

  const handleeditjson = (element, ele) => {
    let edjs = { ...json };
    edjs[element][keyjson] = edjs[element][ele];
    delete edjs[element][ele];
    setKeyjson("");
    setJson(edjs);
    updateSinglejs(edjs);
  };

  const handledeletejson = (element, ele) => {
    let dejs = { ...json };
    delete dejs[element][ele];
    setJson(dejs);
    updateSinglejs(dejs);
  };
  const handlesidebar = (type = null) => {
    setShowsidebar(!showsidebar);
  };

  const getjson = (js) => {
    {
      setJson(js);
      updateSinglejs(js);
    }
  };

  const template = (options) => {
    const toggleIcon = options.collapsed
      ? "pi pi-chevron-down"
      : "pi pi-chevron-up";
    const className = `${options.className} justify-content-start`;
    const titleClassName = `${options.titleClassName} ml-2 text-primary`;
    const style = { fontSize: "1.25rem" };

    return (
      <div className={className} style={{ display: "flex", gap: "20px" }}>
        <button
          className={options.togglerClassName}
          onClick={options.onTogglerClick}
        >
          <span className={toggleIcon}></span>
          <Ripple />
        </button>
        <span className={titleClassName} style={style}></span>
      </div>
    );
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="  single-obj"
          onToggle={(e) => setExpanded(e.currentTarget.open)}
        >
          <div className="summary-title" style={{ padding: "10px" }}>
            <div className="heading-primary form-title">
              {/* {expanded ? (
                <img src={arrow} alt="" className="arrow-caret caret-down" />
              ) : (
                <img src={arrow} alt="" className="arrow-caret" />
              )} */}

              {json.hasOwnProperty("isHeader") &&
                json["isHeader"].toUpperCase()}
            </div>
            <span
              style={{
                display: isAdmin?.canAdd ? "inline" : "none",
              }}
              className="first-add-btn postion-class"
              onClick={handlesidebar}
            >
              <i class="fa-solid fa-plus first-add-btn-img"> </i>
            </span>
          </div>
          <div className="scrollbar">
            <div className="positon-classs">
              <Dialog
                header="Add"
                visible={showsidebar}
                style={{ minWidth: "25%" }}
                onHide={() => setShowsidebar(false)}
              >
                <AddSingleElement
                  json={json}
                  getjson={getjson}
                  setShowsidebar={setShowsidebar}
                  options={options}
                />
              </Dialog>
            </div>
            {Object.keys(json).map((element) => {
              if (element !== "isHeader") {
                if (typeof json == "object") {
                  if (typeof json[element] == "string") {
                    return (
                      <div key={element} className="text-row">
                        {selectedkey == element ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "5px",
                            }}
                          >
                            <div>
                              <input
                                type="text"
                                defaultValue={element}
                                // value={keys}
                                onChange={(e) => {
                                  handlekey(e);
                                }}
                                className="inputs"
                              />
                            </div>
                            <span
                              className="save-btns"
                              onClick={() => handleEditkey(element)}
                            >
                              <i class="fa-solid fa-check model-check-btn-size"></i>
                            </span>
                          </div>
                        ) : (
                          <>
                            <span className="label-names">
                              {element}:
                              <i
                                style={{
                                  display: isAdmin?.canAdd ? "inline" : "none",
                                }}
                                class="fa-regular fa-pen-to-square first-add-btn-img"
                                onClick={() => {
                                  handleselectkey(element);
                                }}
                              ></i>
                            </span>
                          </>
                        )}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            alignItems: "center",
                            marginRight: "80px",
                            marginBottom: "20px",
                          }}
                        >
                          {selectedkey == element ? (
                            <span>{json[element]}</span>
                          ) : (
                            <>
                              <span>
                                {isAdmin?.canEdit ? (
                                  <input
                                    type="text"
                                    value={json[element]}
                                    onChange={(e) => handleChange(e, element)}
                                    className="inputs"
                                  />
                                ) : (
                                  <span>{json[element]}</span>
                                )}
                              </span>
                              <span
                                style={{
                                  display: isAdmin?.canDelete
                                    ? "inline"
                                    : "none",
                                }}
                                onClick={() => {
                                  handledelete(element);
                                }}
                              >
                                <i class="fa-solid fa-trash first-add-btn-delete"></i>
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  }
                  if (typeof json[element] == "boolean") {
                    return (
                      <>
                        {selectedkey == element ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "20px",
                            }}
                          >
                            <div>
                              <input
                                type="text"
                                defaultValue={element}
                                // value={keys}
                                onChange={(e) => {
                                  handlekey(e);
                                }}
                                className="inputs"
                              />
                            </div>
                            <span
                              className="save-btns"
                              onClick={() => handleEditkey(element)}
                            >
                              <i class="fa-solid fa-check model-check-btn-size"></i>
                            </span>
                          </div>
                        ) : (
                          <>
                            <span className="label-names">
                              {element}:
                              <i
                                style={{
                                  display: isAdmin?.canAdd ? "inline" : "none",
                                }}
                                class="fa-regular fa-pen-to-square first-add-btn-img"
                                onClick={() => {
                                  handleselectkey(element);
                                }}
                              ></i>
                            </span>
                          </>
                        )}
                        <span>
                          <span className="check-box">
                            <span>
                              {isAdmin?.canEdit ? (
                                <Checkbox
                                  onChange={(e) => handleCheckbox(e, element)}
                                  checked={json[element]}
                                ></Checkbox>
                              ) : (
                                "false"
                              )}
                              <span
                                style={{
                                  display: isAdmin?.canDelete
                                    ? "inline"
                                    : "none",
                                }}
                                onClick={() => {
                                  handledelete(element);
                                }}
                              >
                                <i class="fa-solid fa-trash first-add-btn-delete"></i>
                              </span>
                            </span>
                          </span>
                        </span>
                      </>
                    );
                  }
                  if (typeof json[element] == "number") {
                    return (
                      <div>
                        {selectedkey == element ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",

                              gap: "5px",
                            }}
                          >
                            <div>
                              <input
                                type="text"
                                defaultValue={element}
                                // value={keys}
                                onChange={(e) => {
                                  handlekey(e);
                                }}
                                className="inputs"
                              />
                            </div>
                            <span
                              className="save-btns"
                              onClick={() => handleEditkey(element)}
                            >
                              <i class="fa-solid fa-check model-check-btn-size"></i>
                            </span>
                          </div>
                        ) : (
                          <>
                            <span className="label-names">
                              {element}:
                              <span
                                style={{
                                  display: isAdmin?.canAdd ? "inline" : "none",
                                }}
                                onClick={() => {
                                  handleselectkey(element);
                                }}
                              >
                                <i class="fa-regular fa-pen-to-square first-add-btn-img"></i>
                              </span>
                            </span>
                          </>
                        )}

                        {selectedkey == element ? (
                          <span>{json[element]}</span>
                        ) : (
                          <>
                            <span>
                              <div className="number-row">
                                {isAdmin?.canEdit ? (
                                  <InputNumber
                                    value={json[element]}
                                    onValueChange={(e) => {
                                      handleChange(e, element, "number");
                                    }}
                                  />
                                ) : (
                                  <span> {json[element]}</span>
                                )}

                                <span
                                  style={{
                                    display: isAdmin?.canDelete
                                      ? "inline"
                                      : "none",
                                  }}
                                  onClick={() => {
                                    handledelete(element);
                                  }}
                                >
                                  <i class="fa-solid fa-trash first-add-btn-delete"></i>
                                </span>
                              </div>
                            </span>
                          </>
                        )}
                      </div>
                    );
                  }
                  if (
                    Array.isArray(json[element]) &&
                    json[element].length > 0
                  ) {
                    return (
                      <>
                        <div className="table-head">
                          <span
                            style={{
                              display: isAdmin?.canEdit ? "inline" : "none",
                            }}
                          >
                            <span>
                              {isAdmin?.canAdd && (
                                <span
                                  style={{
                                    width: "7%",
                                  }}
                                  onClick={() => {
                                    handlearrayadd(element);
                                  }}
                                  className="second-add-btn"
                                >
                                  <i class="fa-solid fa-plus second-add-btn-img"></i>
                                </span>
                              )}
                            </span>
                          </span>

                          <table className=" content-table">
                            <tr
                              style={{
                                backgroundColor: "#0069d9",
                                fontSize: "13px",
                                color: "#fff",
                              }}
                            >
                              <th
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                Index
                              </th>
                              <th
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                Value
                              </th>
                              <th
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                delete
                              </th>
                            </tr>

                            {json[element].map((data, index) => {
                              return (
                                typeof data !== "object" && (
                                  <tbody>
                                    <tr>
                                      <td key={index}>{index}</td>

                                      <td key={data}>
                                        <InputText
                                          defaultValue={data}
                                          onChange={(e) => {
                                            handlearray(e, element, index);
                                          }}
                                          className="inputs"
                                        />
                                      </td>
                                      <td>
                                        <i
                                          style={{
                                            display: isAdmin?.canDelete
                                              ? "inline"
                                              : "none",
                                          }}
                                          class="fa-solid fa-trash first-add-btn-delete"
                                          onClick={() => {
                                            handlearraydelete(element, index);
                                          }}
                                        ></i>
                                      </td>
                                    </tr>
                                  </tbody>
                                )
                              );
                            })}
                          </table>
                        </div>
                      </>
                    );
                  }

                  if (typeof json[element] == "object") {
                    return (
                      <div>
                        {Object.keys(json[element]).map((ele) => {
                          return (
                            <div key={ele}>
                              {selectedkey == ele ? (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px",
                                  }}
                                >
                                  <div>
                                    <input
                                      type="text"
                                      defaultValue={ele}
                                      // value={keys}
                                      onChange={(e) => {
                                        setKeyjson(e.target.value);
                                      }}
                                      className="inputs"
                                    />
                                  </div>
                                  <div>
                                    <img
                                      src={check}
                                      alt="check"
                                      width={15}
                                      height={20}
                                      onClick={() =>
                                        handleeditjson(element, ele)
                                      }
                                    />
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <span className="label-names">
                                    {ele}:
                                    <i
                                      style={{
                                        display: isAdmin?.canAdd
                                          ? "inline"
                                          : "none",
                                      }}
                                      class="fa-regular fa-pen-to-square first-add-btn-img"
                                      onClick={() => {
                                        handleselectkey(ele);
                                      }}
                                    ></i>
                                  </span>
                                </>
                              )}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "10px",
                                  alignItems: "center",
                                  marginBottom: "20px",
                                  marginRight: "80px",
                                }}
                              >
                                {selectedkey == ele ? (
                                  <span>{json[element][ele]}</span>
                                ) : (
                                  <>
                                    <span>
                                      {isAdmin?.canEdit ? (
                                        <input
                                          type="text"
                                          defaultValue={json[element][ele]}
                                          onChange={(e) => {
                                            handleeditvaluejson(
                                              e,
                                              element,
                                              ele
                                            );
                                          }}
                                          className="inputs"
                                        />
                                      ) : (
                                        <span>{json[element][ele]}</span>
                                      )}
                                    </span>
                                    <span
                                      style={{
                                        display: isAdmin?.canDelete
                                          ? "inline"
                                          : "none",
                                      }}
                                      onClick={() => {
                                        handledeletejson(element, ele);
                                      }}
                                    >
                                      <i class="fa-solid fa-trash first-add-btn-delete"></i>
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                }
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default SingleObj;
