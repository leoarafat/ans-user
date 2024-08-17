import { imageURL } from "@/redux/api/baseApi";
import axios from "axios";

export const getArtistsByIds = async (ids: string[]) => {
  try {
    const response = await axios.post(
      `${imageURL}/primary-artist/all-by-ids`,
      {
        ids,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching artists:", error);
    throw error;
  }
};
export const getFeatureArtistsByIds = async (ids: string[]) => {
  try {
    const response = await axios.post(
      `${imageURL}/primary-artist/feature-by-ids`,
      {
        ids,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching artists:", error);
    throw error;
  }
};
