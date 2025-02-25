// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const OAuthCallback = () => {
//   const [message, setMessage] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Extract 'code' from the URL query parameters
//     const queryParams = new URLSearchParams(window.location.search);
//     const authCode = queryParams.get("code");

//     if (authCode) {
//       // Exchange the code for the access token
//       exchangeCodeForToken(authCode);
//     } else {
//       setMessage("Authorization code not found in URL.");
//     }
//   }, []);

//   const exchangeCodeForToken = async (code) => {
//     try {
//       // Construct the URL for token exchange
//       const tokenUrl = `http://v2back.smartcardai.com/login/oauth/token?code=${code}&redirect_uri=http://yourapp.com/callback&client_id=YOUR_GOOGLE_CLIENT_ID&client_secret=YOUR_GOOGLE_CLIENT_SECRET&grant_type=authorization_code`;

//       // Send a request to exchange the code for an access token
//       const response = await axios.get(tokenUrl);
//       const { access_token, token_type } = response.data;

//       // Store the tokens (localStorage or context management)
//       localStorage.setItem("access_token", access_token);
//       localStorage.setItem("token_type", token_type);

//       setMessage("Google login successful!");
//       setTimeout(() => {
//         setMessage(null);
//       }, 5000);

//       navigate("/home");
//     } catch (error) {
//       console.error("Error exchanging code for access token:", error);
//       setMessage("Google login failed.");
//       setTimeout(() => {
//         setMessage(null);
//       }, 5000);
//     }
//   };

//   return (
//     <div>
//       <h2>Processing Google Login...</h2>
//       {message && <div>{message}</div>}
//     </div>
//   );
// };

// export default OAuthCallback;
