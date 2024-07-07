import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOtherUser } from "../redux/userSlice";

const useOtherUser = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        // Uncomment below line for debugging
        // console.log(`Fetching user with id: ${id}`);

        const res = await axios.get(`${USER_API_END_POINT}/otherusers/${id}`, {
          withCredentials: true,
        });

        dispatch(getOtherUser(res.data.otherUser));
      } catch (error) {
        console.error("Failed to fetch other user:", error);
        // Handle errors (e.g., show error message to user)
      }
    };
    if (!id) {
      console.error("User ID is undefined or null");
      return;
    } else {
      fetchOtherUsers();
    }
  }, [id, dispatch]); // Ensure dispatch and id are included in the dependency array
};

export default useOtherUser;
