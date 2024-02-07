import React, { useState } from "react";
import FILE_SYNC from "../img/data-transfer.png";
import { Dropdown } from "primereact/dropdown";
import deleteIcon from "../assets/icons/delete (1).png";
const ModuleDetails = ({
  children,
  isAdmin,
  syncFileSys,
  selectedApplication,
  setApplication,
  applicationName,
  processFlow,
  setProcessFlow,
  selectedProcessFlow,
  selectedAppVersion,
  setSelectedAppVersion,
  updateVersion,
  versions,
  nodes,
  showError,
  setsavejs,
  setVisible,
  deleteApplicationApi
}) => {
  const deleteIconTemplate = (option, index) => {
    return (
      <div className="flex  align-items-center justify-content-between" >
        <div>{option.application}</div>
        <img
          alt={option}
          src={deleteIcon}
          style={{ width: "18px" }}
          onClick={(event) => {
            if (isAdmin.canDelete) {
              event.stopPropagation();
              deleteApplicationApi(option.application);
            }
          }}
          hidden={!isAdmin.canDelete}
        />
      </div>
    );
  };
  return (
    <div
      className="flex flex-column "
      style={{ width: "100%", height: "100vh" }}
    >
      <div
        // absolute z-10
        className=" w-full flex flew-row justify-content-end gap-4 align-items-center"
        style={{ height: "10vh", borderBottom: "1px solid #d3d3d3" }}
      >
        <div
          role="button"
          className=" flex justify-content-center align-items-center "
          style={{
            width: "56px",
            height: "37px",
            borderRadius: "5px",
            border: "1px solid #ced4da",
            cursor: isAdmin.canAdd ? "pointer" : "not-allowed",
            opacity: isAdmin.canAdd ? "100%" : "50%",
            marginLeft: "10px",
          }}
          title="File Sync"
          onClick={() => {
            if (isAdmin.canAdd) {
              syncFileSys();
            }
          }}
        >
          <img
            src={FILE_SYNC}
            alt="file sync"
            style={{ width: "25px", height: "25px" }}
            title="Click to sync file system"
          />
        </div>
        <Dropdown
          value={selectedApplication}
          onChange={setApplication}
          options={applicationName}
          optionLabel="application"
          itemTemplate={deleteIconTemplate}
          placeholder="Modules"
          className=" flex align-items-center"
          style={{ height: "35px", width: "200px" }}
        />
        <Dropdown
          value={selectedProcessFlow}
          onChange={setProcessFlow}
          options={processFlow}
          optionLabel="processFlow"
          placeholder="Process Flow"
          className=" flex align-items-center"
          style={{ height: "35px", width: "200px" }}
          disabled={
            (processFlow && processFlow.length) || selectedProcessFlow
              ? false
              : true
          }
        />
        <Dropdown
          value={selectedAppVersion}
          onChange={(event) => {
            setSelectedAppVersion(event.value);
            updateVersion(event.value);
          }}
          options={versions}
          optionLabel=""
          placeholder="Version"
          className=" flex align-items-center"
          style={{ height: "35px", width: "150px" }}
          disabled={versions.length ? false : true}
        />
        <div
          title="Create New Module"
          role="button"
          className=" flex justify-content-center align-items-center "
          style={{
            width: "150px",
            height: "32px",
            borderRadius: "10px",
            border: "1px solid #5A47B0",
            backgroundColor: "#5A47B0",
            cursor: isAdmin.canAdd ? "pointer" : "not-allowed",
            opacity: isAdmin.canAdd ? "100%" : "50%",
          }}
          onClick={() => {
            if (isAdmin.canAdd) {
              if (nodes.length) {
                let checkNode = nodes.findIndex(
                  (ele) => ele.type == "startNode"
                );
                let checkendnode = nodes.findIndex(
                  (ele) => ele.type == "endNode"
                );

                if (checkNode !== -1 && checkendnode !== -1) {
                  setVisible(true);
                } else {
                  showError(
                    checkNode <= -1 && checkendnode <= -1
                      ? "Add Start Node and End Node"
                      : checkNode == -1
                      ? "Add Start Node"
                      : checkendnode == -1 && "Add End Node"
                  );
                }
              } else {
                showError("Create a ProcessFlow");
              }
            }
          }}
        >
          <p style={{ color: "white", fontSize: "15px",   borderRadius: "50px", border:"none" }}>Create Module</p>
        </div>
        <div
          className="flex justify-content-center align-items-center "
          style={{
            width: "200px",
            height: "32px",
            borderRadius: "10px",
            border: "1px solid #5A47B0",
            backgroundColor: "#5A47B0",
            cursor: isAdmin.canEdit ? "pointer" : "not-allowed",
            opacity: isAdmin.canEdit ? "100%" : "50%",
          }}
          onClick={() => {
            if (isAdmin.canEdit) {
              if (nodes.length) {
                let checkNode = nodes.findIndex(
                  (ele) => ele.type == "startNode"
                );
                let checkendnode = nodes.findIndex(
                  (ele) => ele.type == "endNode"
                );
                if (checkNode !== -1 && checkendnode !== -1) {
                  setsavejs("update");
                } else {
                  showError(
                    checkNode == -1 && checkendnode == -1
                      ? "Add Start Node and End Node"
                      : checkNode == -1
                      ? "Add Start Node"
                      : checkendnode == -1 && "Add End Node"
                  );
                }
              } else {
                showError("Create a ProcessFlow");
              }
            }
          }}
        >
          <p style={{  color: "white", fontSize: "15px",   borderRadius: "50px", border:"none"  }}>
            Update (Current Version)
          </p>
        </div>
        <div
          className="flex justify-content-center align-items-center"
          style={{
            width: "150px",
            height: "32px",
            marginRight: "15px",
            borderRadius: "10px",
            border: "1px solid #5A47B0",
            backgroundColor: "rgba(90, 71, 176, 0.98)",
            cursor: isAdmin.canEdit ? "pointer" : "not-allowed",
            opacity: isAdmin.canEdit ? "100%" : "50%",
          }}
          onClick={() => {
            if (isAdmin.canEdit) {
              if (nodes.length) {
                let checkNode = nodes.findIndex(
                  (ele) => ele.type == "startNode"
                );
                let checkendnode = nodes.findIndex(
                  (ele) => ele.type == "endNode"
                );
                if (checkNode !== -1 && checkendnode !== -1) {
                  setsavejs("create");
                } else {
                  showError(
                    checkNode == -1 && checkendnode == -1
                      ? "Add Start Node and End Node"
                      : checkNode == -1
                      ? "Add Start Node"
                      : checkendnode == -1 && "Add End Node"
                  );
                }
              } else {
                showError("Create a ProcessFlow");
              }
            }
          }}
        >
          <p style={{  color: "white", fontSize: "15px",   borderRadius: "50px", border:"none" }}>Save (New Version)</p>
        </div>
        {/* <Button
            label="Save"
            onClick={() => setsavejs("create")}
            severity="info"
          /> */}
      </div>
      <div className="w-full" style={{ height: "90vh" }}>
        {children}
      </div>
    </div>
  );
};

export default ModuleDetails;
