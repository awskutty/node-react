import React, { useRef } from "react";
import { useEffect, useState, useId } from "react";
import DynObj from "./DynObj";

import AddElements from "./AddElemnts";
import bracket from "../assets/dynicons/bracket.png";
import check from "../assets/dynicons/checked.png";

import InputTxt from "./InputTxt";

export default function Dyn({
  data,
  collapse,
  title,
  path,
  functionality,
  totalOptions,
  depth,
  isAdmin,
  totalColors,
}) {
  const [func, setFunc] = useState(null);
  const [currentJson, setCurrentJson] = useState([]);
  const [options, setOptions] = useState([]);
  const [key, setKey] = useState(null);
  const [value, setValue] = useState(null);
  const [selected, setSelected] = useState(null);
  const [type, setType] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const iRef = useRef(null);

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

  const handlekey = (e) => {
    setValue(e.target.value);
  };
  const divKey = useId();
  useEffect(() => {
    setOptions(totalOptions[depth]?.options);
    setCurrentJson(data);
    // let keys = Array.from(
    //   new Set(data.flatMap((method) => Object.keys(method)))
    // );
    // console.log(keys);
    // setKey(keys);
  }, [data, totalOptions, depth, totalColors]);
  return (
    <>
      {totalOptions.length > depth && (
        <div className="list-array-obj" key={divKey}>
          <div className="array-title-box ">
            <div className="array-title">
              <div className="array-titles flex  ">
                {selected ? (
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
                        defaultValue={title}
                        // value={keys}
                        onChange={(e) => {
                          handlekey(e);
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
                        onClick={(e) => {
                          functionality("edit", `${path}.${title}`, value);
                          setSelected(null);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <span>
                      <div
                        class="circle"
                        style={{
                          backgroundColor: ` ${totalColors[depth]?.color}`,
                        }}
                      >
                        <span class="text">{totalOptions[depth]?.L}</span>
                      </div>
                    </span>
                    {title} :{" "}
                    <img src={bracket} alt="array" width={20} height={20} />
                  </>
                )}
                {/* <img src={dots} width={20} height={20} className="caret-down" alt="" />  */}
                <div className="top-right-dot-icon">
                  <span
                    className=""
                    style={{
                      display:
                        isAdmin?.canAdd || isAdmin?.canDelete
                          ? "inline"
                          : "none",
                    }}
                  >
                    {options.length !== 0 && (
                      <span
                        ref={iRef}
                        onClick={(e) => {
                          e.preventDefault();
                          if (contextMenu) {
                            setContextMenu(null);
                          } else setContextMenu(true);
                        }}
                      >
                        <i class="fa-solid fa-ellipsis caret-down"></i>
                      </span>
                    )}
                  </span>
                  {contextMenu && (
                    <div className="overlap-panels array-overlap">
                      <span
                        style={{
                          display: isAdmin?.canAdd ? "inline" : "none",
                        }}
                        className="second-add-btn"
                        onClick={() => setFunc("add")}
                      >
                        <i class="fa-solid fa-plus second-add-btn-img"> </i>
                        {/* <i  onClick={(e) => {
                        if (func === "add") {
                          setFunc(null);
                        } else setFunc("add");
                      }} class="fa-solid fa-plus first-add-btn-img"></i> */}
                      </span>
                      <span
                        style={{
                          display: isAdmin?.canEdit ? "inline" : "none",
                        }}
                        htmlFor=""
                        onClick={(e) => setSelected(`${path}.${title}`)}
                        className="second-add-btn"
                      >
                        <i class="fa-regular fa-pen-to-square second-add-btn-img"></i>
                      </span>
                      <span
                        style={{
                          display: isAdmin?.canDelete ? "inline" : "none",
                        }}
                        htmlFor=""
                        className="second-add-btn trash-color"
                        onClick={() =>
                          functionality("delete", `${path}.${title}`)
                        }
                      >
                        <i class="fa-solid fa-trash second-add-btn-img"></i>
                      </span>
                    </div>
                  )}
                </div>

                {/* <span
              className="second-add-btn "
              onClick={() => {
                // functionality("add", `${path}.${title}`, null);
                setFunc("add");
              }}
            >
              <img src={plus} alt="" className="second-add-btn-img" />
            </span> */}
                {/* <span
              className="second-add-btn"
              onClick={() => functionality("delete", `${path}.${title}`)}
            >
              <img src={x} alt="" className="second-add-btn-img" />{" "}
            </span> */}
              </div>
            </div>
          </div>
          {func && func == "add" && currentJson && (
            <AddElements
              type={"array"}
              functionality={functionality}
              setFunc={setFunc}
              json={{ path: `${path}.${title}` }}
              options={options}
              arrIndex={currentJson.length}
            />
          )}

          <div className="object-list">
            {currentJson.map((Element, index) => {
              if (!Array.isArray(Element) && typeof Element === "object") {
                return (
                  <div style={{ flexGrow: 1 }}>
                    <DynObj
                      title={title + " - " + "[ " + index + " ]"}
                      isAdmin={isAdmin}
                      json={Element}
                      collapse={collapse}
                      functionality={functionality}
                      depth={depth + 1}
                      totalOptions={totalOptions}
                      totalColors={totalColors}
                      parentType={"array"}
                    />
                  </div>
                );
              }

              if (Array.isArray(Element)) {
                return (
                  <tr className="array-box">
                    <Dyn
                      isAdmin={isAdmin}
                      data={Element}
                      collapse={collapse}
                      functionality={functionality}
                      title={index}
                      path={path}
                      totalOptions={totalOptions}
                      depth={depth + 1}
                      totalColors={totalColors}
                    />
                  </tr>
                );
              }
              return (
                <>
                  <InputTxt
                    functionality={functionality}
                    isAdmin={isAdmin}
                    keys={index}
                    obj={{ arr: Element, path: `${path}.${title}.${index}` }}
                    key={index + "fs"}
                    type={"array"}
                  />
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
