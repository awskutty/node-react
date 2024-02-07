import { InputText } from "primereact/inputtext";
import React from "react";

const CustomInput = (props) => {
  const { label, type, value, name, handleChange, placeholder, checked } =
    props;
  return (
    <div style={{marginLeft: "5px"}}>
      {/* <label>{label}</label> */}
      {/* <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => handleChange(e.target.value, name)}
        placeholder={placeholder}
        checked={checked}
      /> */}
      <InputText
        name={name}
        value={value}
        onChange={(e) => handleChange(e.target.value, name)}
        placeholder={placeholder}
        style={{height:"34px", width:"90%"}}
      />
    </div>
  );
};

export default CustomInput;
