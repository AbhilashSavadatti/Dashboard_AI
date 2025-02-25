import React from "react";
import DbAccordion from "./Accordiation-Modal/DbAccordion";
import ApiAccordion from "./Accordiation-Modal/ApiAccordion";
import FilesAndFolderAccordion from "./Accordiation-Modal/FilesAndFolderAccordion";

const DataSourceModel = () => {
  return (
    <>
      <FilesAndFolderAccordion />
      <ApiAccordion />
      <DbAccordion />
    </>
  );
};

export default DataSourceModel;
