import React, { useState, useEffect, useRef } from "react";
import { useReactFlow } from "reactflow";
import editSVG from "../../../img/edit.png";
import deleteSVG from "../../../img/delete.png";
import settingPNG from "../../../img/settings.png";

import { Dialog } from "primereact/dialog";

import Editor from "@monaco-editor/react";

import Builder from "./treejson/builder.jsx";

import { getControlPolicy } from "../../../api/index.js";
import entity from "../../../utils/entity.json";
import vs from "../../../img/vs.png";

export default function ContextMenu({
  sideT,
  setToogle,
  deleteNode,
  setMenu,
  id,
  top,
  left,
  right,
  bottom,
  type,
  updatedNodeConfig,
  isAdmin,
  nodeConfig,
  controlPolicyApi,
  showerror,
  showsuccess,
  ...props
}) {
  const [visible, setVisible] = useState(false);
  const { getNode } = useReactFlow();
  const node = getNode(id);
  const [json, setJson] = useState({});
  const [newJson, setNewJson] = useState({});
  const [toggle, setToggle] = useState(false);
  const [vsdialog, setvsdialog] = useState(false);

  const [controlPolicy, setControlPolicy] = useState(null);
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    alert(editorRef.current.getValue());
  }

  const getNodeConfig = (jsonb) => {
    setNewJson(jsonb);
  };

  const getConfig = (jsons) => {
    setJson(jsons);
    console.log(jsons, "jsons");
  };
  useEffect(() => {
    (async () => {
      if (!node) return;
      const result = await getControlPolicy(node.type);
      console.log(result, "result");
      setControlPolicy(result);
    })();
    return () => {
      setJson({});
    };
  }, [node]);

  const handlevscode = () => {
    setvsdialog(true);
  };

  const handleDropDown = (controlpolicy, flowType) => {
    if (flowType === "WF") {
      if (nodeConfig.hasOwnProperty(`workflow.${node.id}`)) {
        setNewJson(nodeConfig[`workflow.${node.id}`]);
        setToggle(!toggle);
      } else if (
        nodeConfig.hasOwnProperty(`${node.id}.${node.property.name}.WF`)
      ) {
        setNewJson(nodeConfig[`${node.id}.${node.property.name}.WF`]);
        setToggle(!toggle);
      } else {
        setToggle(!toggle);

        setNewJson(entity);
      }
    }
    if (flowType === "CP") {
      if (nodeConfig.hasOwnProperty(`config.${node.id}`)) {
        setJson(nodeConfig[`config.${node.id}`]);
        setVisible(!visible);
      } else if (
        nodeConfig.hasOwnProperty(`${node.id}.${node.property.name}.config`)
      ) {
        setJson(nodeConfig[`${node.id}.${node.property.name}.config`]);
        setVisible(!visible);
      } else {
        setVisible(!visible);

        setJson({});
      }
    }
  };

  return (
    <>
      {node &&  (
        <>
          {controlPolicy && (
            <>
              {node &&
                node.type !== "startNode" &&
                node.type !== "endNode" &&
                controlPolicy && (
                  <Dialog
                    visible={visible}
                    style={{ height: "90vh", width: "66vw" }}
                    onHide={() => {
                      setVisible(!visible);
                      setMenu(null);
                      updatedNodeConfig(
                        { [`config.${node?.id}`]: { ...json } },
                        "config"
                      );
                    }}
                    maximizable
                    header={`${node?.property.name}`}
                    headerStyle={{
                      textAlign: "center",
                      textTransform: "capitalize",
                    }}
                    modal={true}
                    resizable={true}
                  >
                    <Builder
                      keys={node?.id}
                      defaultJSOn={json}
                      updatedNodeConfig={getConfig}
                      nodeType={node?.type}
                      isAdmin={isAdmin}
                      controlPolicy={controlPolicy.configControlpolicy}
                      colorPolicy={controlPolicy.configColorpolicy}
                      showError={showerror}
                      showSuccess={showsuccess}
                    />
                  </Dialog>
                )}

              {vsdialog && (
                <Dialog
                  visible={vsdialog}
                  style={{ height: "100vh", width: "100vw" }}
                  onHide={() => {
                    setvsdialog(!vsdialog);
                    setMenu(null);
                    showValue();
                  }}
                  maximizable
                  header={`${node?.property.name}`}
                  headerStyle={{
                    textAlign: "center",
                    textTransform: "capitalize",
                  }}
                  modal={true}
                  resizable={true}
                >
                  {/* 
              <Landing /> */}
                  {/* <iframe
              keys={node?.id}
              nodeType={node?.type}
                src={`http://192.168.2.163:8089/`}
                style={{ height: "100%", width: "100%" }}
              ></iframe> */}
{/* 
                  <Editor
                    defaultPath={`${node?.id}`}
                    theme="vs-dark"
                    defaultLanguage="javascript"
                    onMount={handleEditorDidMount}
                  /> */}

                   <iframe 
                src="http://192.168.2.163:8089/"
                style={{ height: "100%", width: "100%" }}
              ></iframe> 
                  {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/5oH9Nr3bKfw?si=jJGGG9aiFTERGqu4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                </Dialog>
              )}

              {controlPolicy && (
                <>
                  <Dialog
                    visible={toggle}
                    style={{ height: "100vh", width: "80vw" }}
                    onHide={() => {
                      setToggle(!toggle);
                      setMenu(null);
                      updatedNodeConfig(
                        { [`workflow.${node?.id}`]: { ...newJson } },
                        "workflow"
                      );
                    }}
                    maximizable
                    header={`${node?.property.name}`}
                    headerStyle={{
                      height: "40px",
                      textAlign: "center",
                      textTransform: "capitalize",
                    }}
                    modal={true}
                    resizable={true}
                  >
                    <Builder
                      keys={node?.id}
                      defaultJSOn={newJson}
                      updatedNodeConfig={getNodeConfig}
                      nodeType={node?.type}
                      isAdmin={isAdmin}
                      controlPolicy={controlPolicy.workflowControlpolicy}
                      colorPolicy={controlPolicy.workflowColorpolicy}
                      showError={showerror}
                      showSuccess={showsuccess}
                    />
                  </Dialog>

                  <div
                    style={{ top, left, right, bottom }}
                    className="context-menu"
                  >
                    <div className="context-menu-header">
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          textTransform: "capitalize",
                          marginBottom: "10px",
                        }}
                      >
                        {node?.data.label}
                      </p>
                    </div>

                    <div className="context-menu-div">
                      <div className="context-menu-button-div" id="divbtn">
                        <img src={editSVG} alt="editIcon" />
                        <button
                          onClick={() => {
                            handleDropDown(
                              controlPolicy.configControlpolicy,
                              "CP"
                            );
                          }}
                        >
                          <span style={{ cursor: "pointer" }}>
                            Configuration
                          </span>
                        </button>
                      </div>
                      <div className="context-menu-button-div">
                        <img src={editSVG} alt="deleteIcon" />
                        <button
                          onClick={() => {
                            handleDropDown(
                              controlPolicy.workflowControlpolicy,
                              "WF"
                            );
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          WorkFlow
                        </button>
                      </div>
                      <div className="context-menu-button-div">
                        <img src={vs} alt="deleteIcon" />
                        <button
                          onClick={() => {
                            handlevscode();
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          Custom Code
                        </button>
                      </div>

                      <div
                        className="context-menu-button-div"
                        style={{
                          cursor: !isAdmin.canEdit ? "not-allowed" : "pointer",
                        }}
                      >
                        <img src={settingPNG} alt="settingPng" />
                        <button
                          onClick={() => {
                            if (isAdmin.canEdit) {
                              sideT();
                              setToogle(node);
                              setMenu(null);
                            }
                          }}
                          disabled={!isAdmin.canEdit}
                          style={{
                            cursor: !isAdmin.canEdit
                              ? "not-allowed"
                              : "pointer",
                          }}
                        >
                          <span> Edit Node </span>
                        </button>
                      </div>
                      <div
                        className="context-menu-button-div"
                        style={{
                          cursor: !isAdmin.canEdit ? "not-allowed" : "pointer",
                        }}
                      >
                        <img src={deleteSVG} alt="deleteIcon" />
                        <button
                          onClick={() => {
                            if (isAdmin.canDelete) deleteNode(id, node);
                          }}
                          disabled={!isAdmin.canDelete}
                          style={{
                            cursor: !isAdmin.canEdit
                              ? "not-allowed"
                              : "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
