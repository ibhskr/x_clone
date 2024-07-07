import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";

const useGetProfile = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
          withCredentials: true,
        });
        dispatch(getMyProfile(res.data.user));
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Handle errors (e.g., show error message to user)
      }
    };

    if (!id) {
      console.error("User ID is undefined or null");
      return;
    } else {
      fetchMyProfile();
    }
  }, [id, dispatch]); // Ensure dispatch is included in the dependency array

  console.log("id:", id); // Example logging for debugging purposes
};

export default useGetProfile;
