import axios from "axios";
import { useEffect } from "react";
import { v2BackendURL } from "../constant/url";
import { useUser } from "../context/UserContext";

const useGetFIlesAndFolders = () => {
  const { user, filesAndFoldersData, setFilesAndFoldersData } = useUser();
  useEffect(() => {
    async function getDbData() {
      try {
        const res = await axios.get(`${v2BackendURL}/list_contents`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        setFilesAndFoldersData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDbData();
  }, []);
};

export default useGetFIlesAndFolders;
