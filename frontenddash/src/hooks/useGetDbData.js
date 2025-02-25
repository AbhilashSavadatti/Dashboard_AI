import axios from "axios";
import { useEffect } from "react";
import { v2BackendURL } from "../constant/url";
import { useUser } from "../context/UserContext";

const useGetDdData = () => {
  const { user, setDbData, dbData } = useUser();
  useEffect(() => {
    async function getDbData() {
      try {
        const res = await axios.get(`${v2BackendURL}/list_db_connectors`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        setDbData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDbData();
  }, []);
};

export default useGetDdData;
