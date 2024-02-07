import React, { useEffect, useState } from "react";
import CustomSelect from "./form-elements/select";
import CustomInput from "./form-elements/input";
import { Card } from "primereact/card";
import Add from "../assets/icons/add.png";
import Close from "../assets/icons/close.png";
import AddSideBar from "./menu-elements/addSideBar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primeflex/primeflex.css";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";
import CloseWhite from "../assets/icons/cross.png";
import PluseWhite from "../assets/icons/plus (2).png";

const DynamicUi = ({ json, data, path, getJson, iteration, isAdmin }) => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [currentPath, setCurrentPath] = useState(path);
  const [currentJson, setCurrentJson] = useState(json);
  const [key, setKey] = useState(null);
  const [showAddSidebar, setShowAddSidebar] = useState(false);
  const [selectedParams, setSelectedParams] = useState(null);
  const [visible, setVisible] = useState(false);

  const toggleExpanded = (key) => {
    if (expandedKeys.includes(key)) {
      setExpandedKeys([]);
    } else {
      setExpandedKeys([key]);
    }
  };

  const getCurrentPath = (key) => {
    setCurrentPath(path + "." + key);
    return path + "." + key;
  };

  const handleAdd = (key) => {
    // setExpandedKeys([]);

    setShowAddSidebar(true);
    setKey(key);
  };

  const handleAdded = (itemkey, obj) => {
    // setExpandedKeys([]);
    const updatedJson = { ...json };
    const path = getCurrentPath(itemkey);
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

    setCurrentJson(updatedJson);
    getJson(updatedJson);
  };

  const handleDelete = (key) => {
    setExpandedKeys([]);
    const updatedJson = { ...json };
    const path = getCurrentPath(key);
    const pathKeys = path.split(".");
    let currentNode = updatedJson;
    for (let i = 0; i < pathKeys.length - 1; i++) {
      currentNode = currentNode[pathKeys[i]];
    }
    const lastKey = pathKeys[pathKeys.length - 1];
    delete currentNode[lastKey];
    setCurrentJson(updatedJson);
    getJson(updatedJson);
  };

  const handleUpdate = (newValue, fieldName) => {
    setExpandedKeys([]);
    const updatedJson = { ...json };
    const path = getCurrentPath(fieldName);
    let currentNode = updatedJson;
    const pathKeys = path.split(".");
    for (const key of pathKeys) {
      currentNode = currentNode[key];
    }
    currentNode.value = newValue;
    setCurrentJson(updatedJson);
    getJson(updatedJson);
  };

  const handleCheckboxUpdate = (event, fieldName) => {
    setExpandedKeys([]);
    const { value, checked } = event.target;
    const updatedJson = { ...currentJson };
    const path = getCurrentPath(fieldName);
    let currentNode = updatedJson;
    const pathKeys = path.split(".");
    for (const key of pathKeys) {
      currentNode = currentNode[key];
    }
    if (checked) {
      currentNode.value = [...currentNode.value, value];
    } else {
      currentNode.value = currentNode.value.filter((item) => item !== value);
    }
    setCurrentJson(updatedJson);
    getJson(updatedJson);
  };

  const handleAddOptions = (value, fieldName) => {
    setExpandedKeys([]);
    const updatedJson = { ...currentJson };
    const fieldPath = fieldName.split(".");
    const path = getCurrentPath(`${fieldPath[0]}.options`);
    let currentNode = updatedJson;
    const pathKeys = path.split(".");
    for (const key of pathKeys) {
      currentNode = currentNode[key];
    }
    currentNode.push(value);
    setCurrentJson(updatedJson);
    getJson(updatedJson);
  };

  const handleUpdateOptions = (arr, options, fieldName) => {
    if (
      options.rowData.key &&
      options.rowData.value &&
      options.rowIndex == arr.length - 1
    ) {
      handleAddOptions(
        {
          key: "",
          value: "",
        },
        fieldName
      );
    }
    setExpandedKeys([]);
    const updatedJson = { ...currentJson };
    const path = getCurrentPath(fieldName);
    let currentNode = updatedJson;
    const pathKeys = path.split(".");
    for (let i = 0; i < pathKeys.length - 1; i++) {
      if (pathKeys[i].includes("[")) {
        const [keyName, index] = pathKeys[i].split("[");
        const arrayIndex = index.replace("]", "");
        currentNode = currentNode[keyName][arrayIndex];
      } else {
        currentNode = currentNode[pathKeys[i]];
      }
    }
    currentNode[options.field] = options.newValue;
    setCurrentJson(updatedJson);
    getJson(updatedJson);
  };

  const handleAddValues = (newValue, fieldName) => {
    setExpandedKeys([]);
    const updatedJson = { ...currentJson };
    const path = getCurrentPath(fieldName);
    let currentNode = updatedJson;
    const pathKeys = path.split(".");
    for (const key of pathKeys) {
      currentNode = currentNode[key];
    }
    currentNode["value"] = newValue;
    setCurrentJson(updatedJson);
    getJson(updatedJson);
  };

  const cellEditor = (options) => {
    return (
      <InputText
        value={options.value}
        onChange={(e) => {
          options.editorCallback(e.target.value);
        }}
      />
    );
  };

  const SelectionChange = (event, fieldName) => {
    setSelectedParams(event.value);
    handleAddValues(event.value, fieldName);
  };

  useEffect(() => { }, [currentPath]);

  return (
    <div className="flex ">
      <div
        className="flex "
        style={{
          width: "300px",
          borderRight: "1px solid #d3d3d3",
          minWidth: "300px",
        }}
      // style={{ backgroundColor: data && "#FBFBFB" }}
      >
        <div className="flex flex-column p-2 pt-4" style={{ width: "100%" }}>
          {data && Object.values(data).length > 0 && (
            <>
              {/* <Card
              className=" flex  justify-content-center  p-3 min-w-max overflow-y-scroll "
              style={{
                minHeight: "300px",
                maxHeight: "300px",
                backgroundColor: "#F1EFEF",
              }}
            > */}
              {typeof data === "object" &&
                Object.keys(data).map((fieldName, index) => {
                  const field = data[fieldName];
                  if (!Object.keys(field).includes("type")) {
                    return (
                      <div
                        className="flex justify-content-between mb-5 groupBorder"
                        key={fieldName}
                        style={{
                          backgroundColor:
                            expandedKeys.includes(fieldName) && "#8AAAE5",
                          borderTopLeftRadius: "7px",
                          borderBottomRightRadius: "7px",
                          paddingLeft: "7px",
                          paddingRight: "7px",
                          display: "flex",
                          alignItems: "center",
                          height: "40px",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpanded(fieldName);
                          getCurrentPath(fieldName);
                          setKey(fieldName);
                        }}
                      >
                        <label
                          style={{
                            lineHeight: 2,
                            color: expandedKeys.includes(fieldName) && "white",
                            cursor: !Object.keys(field).includes("type")
                              ? "pointer"
                              : "text",
                            fontWeight: !Object.keys(field).includes("type")
                              ? "bold"
                              : "900",
                            textTransform: "capitalize",
                            fontSize: "14px",
                          }}
                        // onClick={(e) => {
                        //   e.stopPropagation();
                        //   toggleExpanded(fieldName);
                        //   getCurrentPath(fieldName);
                        //   setKey(fieldName);
                        // }}
                        >
                          {fieldName}
                        </label>
                        <div className=" cursor-pointer">
                          <img
                            src={
                              expandedKeys.includes(fieldName)
                                ? PluseWhite
                                : Add
                            }
                            alt="Add"
                            style={{
                              width: "10px",
                              height: "10px",
                              marginRight: "10px",
                              visibility: isAdmin.canAdd ? "visible" : "hidden",
                            }}
                            onClick={(event) => {
                              if (isAdmin.canAdd) {
                                event.stopPropagation();
                                handleAdd(fieldName);
                              }
                            }}
                          />
                          <img
                            src={
                              expandedKeys.includes(fieldName)
                                ? CloseWhite
                                : Close
                            }
                            alt="Close"
                            style={{
                              width: "10px",
                              height: "10px",
                              visibility: isAdmin.canDelete
                                ? "visible"
                                : "hidden",
                            }}
                            onClick={() => {
                              if (isAdmin.canDelete)
                                handleDelete(fieldName);
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={index} style={{}}>
                      {field.type && (
                        <div
                          className={`mb-5 w-full flex flex-column justify-content-between`}
                        >
                          <div className="flex flex-end justify-content-between w-full">
                            <label
                              style={{
                                textTransform: "capitalize",
                                fontSize: "12px",
                                fontWeight: "600",
                              }}
                            >
                              {fieldName.toLocaleLowerCase()}
                            </label>
                            <img
                              className="cursor-pointer"
                              src={Close}
                              alt="Close"
                              style={{
                                width: "10px",
                                height: "10px",
                                visibility: isAdmin.canDelete
                                  ? "visible"
                                  : "hidden",
                              }}
                              onClick={(e) => {
                                if (isAdmin.canDelete)
                                  handleDelete(fieldName);
                              }}
                            />
                          </div>
                          {field.type === "combo-box" ? (
                            <CustomSelect
                              name={fieldName}
                              value={field.value}
                              options={field.options}
                              handleChange={handleUpdate}
                            />
                          ) : field.type === "checkbox" &&
                            typeof field.options == "object" ? (
                            field.options.map((opt, index) => {
                              return (
                                <div
                                  key={index}
                                  style={{
                                    marginTop: "10px",
                                    paddingTop: "10px",
                                    marginLeft: "10px",
                                  }}
                                >
                                  <Checkbox
                                    value={opt}
                                    name={field.name}
                                    onChange={(e) =>
                                      handleCheckboxUpdate(e, fieldName)
                                    }
                                    checked={field.value.includes(opt)}
                                  />
                                  <label
                                    htmlFor={field.name}
                                    style={{
                                      marginLeft: "10px",
                                      fontSize: "14px",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {opt}
                                  </label>
                                </div>
                              );
                            })
                          ) : field.type === "radio" ? (
                            typeof field.options == "object" &&
                            field.options.map((opt, index) => (
                              <div
                                key={index}
                                className="flex align-items-center"
                                style={{
                                  // marginTop: "10px",
                                  paddingTop: "10px",
                                  marginLeft: "5px",
                                }}
                              >
                                <RadioButton
                                  name={field.name}
                                  value={opt}
                                  onChange={(e) =>
                                    handleUpdate(e.target.value, fieldName)
                                  }
                                  checked={field.value === opt}
                                />
                                {/* <input
                                  type={field.type}
                                  name={field.name}
                                  value={opt}
                                  checked={
                                    field.type === "checkbox"
                                      ? field.value.includes(opt)
                                      : field.value === opt
                                  }
                                  onChange={(e) =>
                                    field.type === "checkbox"
                                      ? handleCheckboxUpdate(e, fieldName)
                                      : handleUpdate(e.target.value, fieldName)
                                  }
                                /> */}
                                <label
                                  htmlFor={field.name}
                                  style={{
                                    marginLeft: "10px",
                                    fontSize: "14px",
                                  }}
                                >
                                  {opt}
                                </label>
                              </div>
                            ))
                          ) : field.type === "textarea" ? (
                            <div key={fieldName} style={{ paddingTop: "10px" }}>
                              <InputTextarea
                                name={fieldName}
                                value={field.value}
                                onChange={(e) =>
                                  handleUpdate(e.target.value, fieldName)
                                }
                                rows={5}
                                cols={25}
                              />
                            </div>
                          ) : field.type === "key-value" ? (
                            <div
                              style={{ paddingTop: "10px", marginLeft: "5px" }}
                            >
                              <p
                                className="cursor-pointer m-0"
                                onClick={() => setVisible(!visible)}
                              >
                                Open
                                <span
                                  style={{
                                    textTransform: "capitalize",
                                    fontSize: "14px",
                                    marginLeft: "5px",
                                  }}
                                  className="font-semibold"
                                >
                                  {fieldName.toLocaleLowerCase()}
                                </span>
                              </p>
                              <Dialog
                                visible={visible}
                                style={{ width: "66vw" }}
                                onHide={() => {
                                  setVisible(!visible);
                                }}
                                header="Configuration"
                                headerStyle={{ textAlign: "center" }}
                              >
                                <DataTable
                                  value={field.options}
                                  showGridlines
                                  editMode="cell"
                                  selection={selectedParams}
                                  onSelectionChange={(e) =>
                                    SelectionChange(e, fieldName)
                                  }
                                >
                                  <Column selectionMode="multiple" />
                                  <Column
                                    field="key"
                                    header="KEY"
                                    editor={(options) => cellEditor(options)}
                                    onCellEditComplete={(options) => {
                                      handleUpdateOptions(
                                        field.options,
                                        options,
                                        `${fieldName}.options[${options.rowIndex}].${options.field}`
                                      );
                                    }}
                                    style={{ fontSize: "14px" }}
                                  ></Column>
                                  <Column
                                    field="value"
                                    header="VALUE"
                                    editor={(options) => cellEditor(options)}
                                    onCellEditComplete={(options) => {
                                      handleUpdateOptions(
                                        field.options,
                                        options,
                                        `${fieldName}.options[${options.rowIndex}].${options.field}`
                                      );
                                    }}
                                    style={{ fontSize: "14px" }}
                                  ></Column>
                                </DataTable>
                              </Dialog>
                            </div>
                          ) : (
                            <div style={{ paddingTop: "10px" }}>
                              <CustomInput
                                type={field.type}
                                name={fieldName}
                                value={field.value}
                                handleChange={handleUpdate}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              {/* </Card> */}
            </>
          )}
        </div>

        <div>
          {showAddSidebar && (
            <AddSideBar
              itemkey={key}
              handleAdded={handleAdded}
              showSideBar={showAddSidebar}
              setShowSideBar={setShowAddSidebar}
              iteration={iteration}
            />
          )}
        </div>
      </div>
      <div>
        {data && key && expandedKeys.includes(key) && (
          <DynamicUi
            json={currentJson}
            data={data[key]}
            path={currentPath}
            getJson={getJson}
            iteration={iteration + 1}
            isAdmin={isAdmin}
          />
        )}
      </div>
    </div>
  );
};

export default DynamicUi;
