import { useEffect, useState } from "react";

const RenderJSON = ({ json, reset }) => {
  const [tabExpandRender, setTabExpandRender] = useState({
    path: null,
    details: {},
  });
  const handleClick = (event, key) => {
    event.preventDefault();
    if (typeof json.details[key] === "object") {
      setTabExpandRender({ path: json.path + key, details: json.details[key] });
    }
  };
  useEffect(() => {
    setTabExpandRender({
      path: null,
      details: {},
    });
  }, [json.path]);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width:"100px" }}>
        {json.details &&
          Object.keys(json.details).map((key) => {
            return (
              <p
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  return handleClick(e, key);
                }}
              >
                {key}
              </p>
            );
          })}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          border: "1px solid red",
          flexWrap: "wrap",
        }}
      >
        {tabExpandRender.path && <RenderJSON json={tabExpandRender} />}
      </div>
    </>
  );
};

export default RenderJSON;
