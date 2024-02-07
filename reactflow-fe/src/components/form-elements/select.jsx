import { Dropdown } from "primereact/dropdown";
import React from "react";

const CustomSelect = ({ name, value, options, handleChange }) => {
  return (
    <div style={{marginLeft: "5px", paddingTop: "10px"}}>
      <Dropdown
        value={value}
        onChange={(e) => handleChange(e.target.value, name)}
        options={options}
        optionLabel=""
        placeholder={name}
        className=" md:w-14rem "
        style={{paddingTop: "4px", paddingBottom:"4px", fontSize:"14px", width:"90%"}}
      />
    </div>
  );
};

export default CustomSelect;
