import axios from "axios";
import { useEffect } from "react";
import { v2BackendURL } from "../constant/url";
import { useUser } from "../context/UserContext";

const useGetConnectionData = () => {
  const { user, setConnectionData, connectionData } = useUser();
  useEffect(() => {
    async function getConnectionData() {
      try {
        const res = await axios.get(`${v2BackendURL}/list_apis`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        setConnectionData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getConnectionData();
  }, []);
};

export default useGetConnectionData;
