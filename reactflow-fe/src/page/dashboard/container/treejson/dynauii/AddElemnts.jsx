import React, { useState, useId } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { ToggleButton } from "primereact/togglebutton";
import { InputNumber } from "primereact/inputnumber";

const AddElements = ({
  type = null,
  functionality,
  json,
  options,
  setFunc,
  arrIndex = null,
}) => {
  const divkey = useId();
  const [checked, setChecked] = useState(false);
  const [keys, setKey] = useState(null);
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState(null);

  return (
    <div className="add-model " key={divkey}>
      <div className="dropdown-box">
        {type == "object" && (
          <>
            <InputText
              id="key"
              onChange={(e) => setKey(e.target.value)}
              placeholder="key"
              className="add-model-input"
            />
          </>
        )}

        <Dropdown
          id="dropdown"
          options={options}
          placeholder="Select an Option"
          value={selected}
          className="dropdown "
          onChange={(e) => setSelected(e.value)}
        />

        {selected === "string" && (
          <>
            <InputText
              id="value"
              onChange={(e) => setValue(e.target.value)}
              className="add-model-input"
              placeholder="Value"
            />
          </>
        )}

        {selected == "number" && (
          <>
            <InputNumber
              id="value"
              value={value}
              onValueChange={(e) => setValue(e.target.value)}
              placeholder="Value"
              className="h-2rem"
            />
          </>
        )}

        {selected == "boolean" && <></>}
        {selected == "string" && type == "object" && (
          <>
            <ToggleButton
              id="toggle"
              onLabel=""
              offLabel=""
              onIcon="pi pi-check"
              offIcon="pi pi-times"
              checked={checked}
              onChange={(e) => setChecked(e.value)}
              style={{ width: "28px", height: "28px" }}
            />
            <span htmlFor="toggle" className="heading-primary">
              IsHeader
            </span>
          </>
        )}
        <div
          className="model-buttons"
          // style={{ width: "10%" }}
          // className="flex flex-row gap-3 align-items-center justify-content-end"
        >
          <span
            className="save-btns"
            onClick={() => {
              functionality(
                "add",
                !json?.path || json?.path == "" || !json.hasOwnProperty("path")
                  ? `.${keys}`
                  : type == "array"
                  ? json.path + "." + arrIndex
                  : json.path + "." + keys,
                {
                  key: keys,
                  options: selected,
                  value: value,
                }
              );
              if (checked) {
                functionality(
                  "add",
                  !json?.path ||
                    json?.path == "" ||
                    !json.hasOwnProperty("path")
                    ? `.${keys}`
                    : type == "array"
                    ? json.path + "." + arrIndex
                    : json.path + "." + keys,
                  {
                    key: "isHeader",
                    options: "string",
                    value: keys,
                    // isHeader: true
                  }
                );
              }
              setFunc(null);
            }}
          >
            <i class="fa-solid fa-check model-check-btn-size"></i>
          </span>
          <span onClick={() => setFunc(null)}>
            <i class="fa-solid fa-xmark closebtns-model"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddElements;
