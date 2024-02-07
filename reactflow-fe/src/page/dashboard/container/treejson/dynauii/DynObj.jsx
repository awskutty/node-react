import React, { useRef } from "react";
import { useEffect } from "react";
import { useState, useId } from "react";
import Dyn from "./dyn";

import InputTxt from "./InputTxt";

import AddElements from "./AddElemnts";
import object from "../assets/dynicons/curly-brackets.png";
import arrow from "../assets/dynicons/arrow.png";

export default function DynObj({
  title,
  json,
  collapse,
  functionality,
  totalOptions,
  depth,
  settJson,
  isAdmin,
  totalColors,
  parentType,
}) {
  const [obj, setObj] = useState();
  const ref = useRef(null);
  const [func, setFunc] = useState(null);
  const [options, setOptions] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [value, setValue] = useState(null);
  const [Key, setKey] = useState(null);

  const [selected, setSelected] = useState(true);

  const [expanded, setExpanded] = useState(false);
  let too = true;
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
  const divKey = useId();
  useEffect(() => {
    if (json) {
      setObj(json);
      // console.log(json, "jsons234");
      setOptions(totalOptions[depth]?.options);

      return () => {
        setFunc(null);
      };
    }
  }, [json, collapse, depth, totalOptions, totalColors]);
  return (
    <>
      {totalOptions.length > depth && (
        <div className="obj-container" key={divKey}>
          <details
            open={collapse}
            className=" obj-box"
            onToggle={(e) => setExpanded(e.currentTarget.open)}
          >
            <summary className="summary-title">
              <div className="heading-primary ">
                {expanded ? (
                  <img src={arrow} alt="" className="arrow-caret caret-down" />
                ) : (
                  <img src={arrow} alt="" className="arrow-caret" />
                )}
                <div
                  class="circle"
                  style={{ backgroundColor: `${totalColors[depth]?.color}` }}
                >
                  <span class="text">{totalOptions[depth]?.L}</span>
                </div>

                {parentType == "object"
                  ? title
                  : json.hasOwnProperty("isHeader")
                  ? json[json["isHeader"]]
                  : title}

                <img src={object} alt="" style={{ width: "20px" }} />
              </div>

              <>
                <div className="top-right-dot-icon">
                  <div
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
                  </div>
                  {contextMenu && (
                    <div className="overlap-panels">
                      <span
                        style={{
                          display: isAdmin?.canAdd ? "inline" : "none",
                        }}
                        className="first-add-btn"
                        onClick={(e) => {
                          setFunc("add");
                          e.preventDefault();
                        }}
                      >
                        <i class="fa-solid fa-plus first-add-btn-img"> </i>
                      </span>

                      <span
                        style={{
                          display: isAdmin?.canDelete ? "inline" : "none",
                        }}
                        htmlFor=""
                        className="first-add-btn trash-color"
                        onClick={() =>
                          functionality(
                            "delete",
                            json.hasOwnProperty("path") ? json.path : "."
                          )
                        }
                      >
                        <i class="fa-solid fa-trash first-add-btn-img"></i>
                      </span>
                    </div>
                  )}
                </div>
              </>
            </summary>
            <div className="obj-model">
              {func && func == "add" && (
                <AddElements
                  type={"object"}
                  functionality={functionality}
                  setFunc={setFunc}
                  json={json}
                  options={options}
                />
              )}
            </div>
            {obj && (
              <>
                <div className="home-page-view">
                  {Object.keys(obj).map((key) => {
                    if (key !== "isHeader" && key !== "path") {
                      if (
                        !Array.isArray(obj[key]) &&
                        typeof obj[key] === "object"
                      ) {
                        return (
                          <div style={{ flexGrow: 1 }}>
                            <DynObj
                              title={key}
                              json={obj[key]}
                              collapse={collapse}
                              functionality={functionality}
                              totalOptions={totalOptions}
                              depth={depth + 1}
                              isAdmin={isAdmin}
                              totalColors={totalColors}
                              parentType={"object"}
                            />
                          </div>
                        );
                      }
                      if (Array.isArray(obj[key])) {
                        return (
                          <>
                            <Dyn
                              data={obj[key]}
                              title={key}
                              collapse={collapse}
                              path={obj.path == "" ? key : obj.path}
                              functionality={functionality}
                              depth={depth + 1}
                              totalOptions={totalOptions}
                              isAdmin={isAdmin}
                              totalColors={totalColors}
                            />
                          </>
                        );
                      }
                      return (
                        <>
                          <InputTxt
                            isAdmin={isAdmin}
                            key={obj.path}
                            keys={key}
                            obj={obj}
                            functionality={functionality}
                          />
                        </>
                      );
                    }
                  })}
                </div>
              </>
            )}
          </details>
        </div>
      )}
    </>
  );
}
