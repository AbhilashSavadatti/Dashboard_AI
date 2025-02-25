// import React from "react";
// import { useParams } from "react-router-dom";
// import Dashboard from "./Dashboard/Dashboard";

// export const DashBoardMainLayout = () => {
//   // const { name : folderId } = useParams();

//   // // Function to get the string after an underscore
//   // function getStringAfterUnderscore(input) {
//   //   if (!input) return ""; // Handle cases where input is undefined
//   //   const underscoreIndex = input.indexOf("_");
//   //   if (underscoreIndex !== -1) {
//   //     return input.slice(underscoreIndex + 1);
//   //   }
//   //   return input; // Return the original input if no underscore is found
//   // }

//   // // Process id to extract the meaningful part
//   // const processedId = getStringAfterUnderscore(id);

//   // // Use `name` if it exists; otherwise, use `processedId`
//   // const actualName = folderId || "Default Dashboard";
//   // console.log("actualName", actualName);

//   return (
//     <div>
//       <div>
//         {/* <h3>Dashboard: {actualName}</h3> */}
//         <Dashboard DbName={actualName} />
//       </div>
//     </div>
//   );
// };
