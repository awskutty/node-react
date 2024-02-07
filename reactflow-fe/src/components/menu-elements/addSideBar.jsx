import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import Add from "../../assets/icons/add.png";
import Close from "../../assets/icons/close.png";
import CustomInput from "../form-elements/input";
import { InputText } from "primereact/inputtext";
import CustomSelect from "../form-elements/select";
import { Dropdown } from "primereact/dropdown";

export default function AddSideBar({
  itemkey,
  handleAdded,
  showSideBar,
  setShowSideBar,
  iteration,
}) {
  const typeOptions =
    iteration == 0
      ? ["group"]
      : iteration < 2
        ? [
          "text",
          "number",
          "textarea",
          "combo-box",
          "checkbox",
          "radio",
          "group",
        ]
        : ["text", "number", "textarea", "combo-box", "checkbox", "radio"];
  const [obj, setObj] = useState({
    name: "",
    type: typeOptions[0],
    options: [""],
    value: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // if (value === "group") {
    //   setObj({ ...obj, [name]: {} });
    // } else
    setObj({ ...obj, [name]: value });
  };

  const handleClose = () => {
    setShowSideBar(false);
    if (obj.name && obj.type) {
      if (
        obj.type === "text" ||
        obj.type === "number" ||
        obj.type === "textarea"
      ) {
        delete obj.options;
        handleAdded(itemkey, obj);
      } else {
        handleAdded(itemkey, obj);
      }
    }
  };

  const handleAddOption = () => {
    if (obj.options[obj.options.length - 1] !== "") {
      setObj({
        ...obj,
        options: [...obj.options, ""],
      });
    }
  };

  const handleChangeOption = (e, index) => {
    const newOptions = [...obj.options];
    newOptions[index] = e.target.value;
    setObj({
      ...obj,
      options: newOptions,
    });
  };

  const handleCloseOption = (index) => {
    if (obj.options.length > 1) {
      const newOptions = [...obj.options];
      newOptions.splice(index, 1);
      setObj({
        ...obj,
        options: newOptions,
      });
    }
  };

  return (
    <div>
      <Sidebar
        visible={showSideBar}
        position="right"
        onHide={handleClose}
        style={{ backgroundColor: "#f1efef" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            height: "80px",
            // backgroundColor: "red",
            justifyContent: "space-around",
          }}
        >
          <label htmlFor="name">name</label>
          <InputText
            type="type"
            name="name"
            id="name"
            value={obj.name}
            onChange={handleChange}
            style={{ marginLeft: "10px", height: "33px" }}
          />
        </div>
        {/* <input
          type="text"
          name="name"
          id="name"
          value={obj.name}
          placeholder="name"
          onChange={handleChange}
        /> */}
        {/* <br /> */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "86%",
            height: "80px",
            // backgroundColor: "red",
            justifyContent: "space-around",
          }}
        >
          <label htmlFor="type">type</label>
          <Dropdown
            name="type"
            // defaultValue={iteration==0&&"group"}
            value={obj.type}
            options={typeOptions}
            onChange={handleChange}
            required
            optionLabel=""
            placeholder="Select Group"
            className="w-full "
            style={{
              paddingTop: "4px",
              paddingBottom: "4px",
              fontSize: "14px",
              marginLeft: "10px",
            }}
          />
        </div>

        {/* <CustomSelect
          name="type"
          value={obj.type}
          options={typeOptions}
          handleChange={handleChange}
        /> */}
        {/* <select name="type" id="type" value={obj.type} onChange={handleChange}>
          {typeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select> */}
        {/* <br /> */}
        {iteration != 0 && (
          <div>
            {obj.type !== "text" &&
              obj.type !== "number" &&
              obj.type !== "textarea" &&
              obj.type !== "group" ? (
              <div style={{ marginTop: "10px" }}>
                <label htmlFor="options">options</label> <br />
                {obj.options.map((option, index) => (
                  <div
                    key={index}
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    <InputText
                      type="text"
                      name="options"
                      id="options"
                      value={option}
                      placeholder={`option${index + 1}`}
                      onChange={(e) => handleChangeOption(e, index)}
                      style={{ marginLeft: "10px", height: "33px" }}
                    />
                    {/* <input
                  type="text"
                  name="options"
                  id="options"
                  value={option}
                  placeholder={`option${index + 1}`}
                  onChange={(e) => handleChangeOption(e, index)}
                /> */}
                    {/* {index === obj.options.length - 1 && ( */}
                    <img
                      src={Add}
                      alt="Add"
                      width={15}
                      height={15}
                      onClick={handleAddOption}
                      style={{
                        width: "10px",
                        height: "10px",
                        marginLeft: "6px",
                        cursor: "pointer",
                        visibility: `${index === obj.options.length - 1
                          ? "visible"
                          : "hidden"
                          }`,
                      }}
                    />
                    {/* )} */}
                    {index > 0 && (
                      <img
                        src={Close}
                        alt="Close"
                        style={{
                          width: "10px",
                          height: "10px",
                          marginLeft: "6px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleCloseOption(index)}
                      // style={{ marginLeft: "6px", cursor: "pointer" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "90%",
                  height: "80px",
                  // backgroundColor: "red",
                  justifyContent: "space-around",
                  visibility: `${obj.type !== "group" ? "visible" : "hidden"}`,
                }}
              >
                <label htmlFor="value">value</label>
                <InputText
                  type="text"
                  name="value"
                  id="value"
                  value={obj.value}
                  placeholder="value"
                  onChange={handleChange}
                  style={{ height: "33px", marginLeft: "10px" }}
                />
                {/* <input
              type="text"
              name="value"
              id="value"
              value={obj.value}
              placeholder="value"
              onChange={handleChange}
            /> */}
                {/* <br /> */}
              </div>
            )}
          </div>
        )}
      </Sidebar>
    </div>
  );
}
