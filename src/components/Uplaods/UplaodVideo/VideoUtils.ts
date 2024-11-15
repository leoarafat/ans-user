/* eslint-disable @typescript-eslint/ban-ts-comment */
import { imageURL } from "@/redux/api/baseApi";
import axios from "axios";

export const prepareVideoFormData = (
  formData: any,
  thumbnail: any,
  videoFile: any,
  selectedGenre: any,
  selectedSubgenre: any,
  isrc: any,
  primaryArtists: any,
  featureArtists: any
) => {
  const data = new FormData();
  console.log(formData);
  const keywordsString = Array.isArray(formData.keywords)
    ? formData.keywords.join(", ")
    : formData.keywords;

  const formattedPrimaryArtists = primaryArtists?.map(
    (artist: any) => artist._id
  );
  const formattedFeatureArtists = featureArtists?.map(
    //@ts-ignore
    (artist) => artist.name
  );
  Object.entries({
    version: formData.version,
    title: formData.title,
    label: formData.label,
    genre: selectedGenre,
    subGenre: selectedSubgenre,
    isrc: isrc,
    primaryArtist: JSON.stringify(formattedPrimaryArtists),
    featuringArtists: JSON.stringify(formattedFeatureArtists),
    upc: formData.upc,
    description: formData.description,
    storeReleaseDate: formData.storeReleaseDate,
    releaseDate: formData.releaseDate,
    explicit: formData.explicit,
    isKids: formData.isKids,
    audioIsrc: isrc,
    vevoChannel: formData.vevoChannel,
    keywords: keywordsString || "",
    copyright: formData.copyright,
    copyrightYear: formData.copyrightYear,
    youtubePremiere: formData.youtubePremiere || "No",
    countdownTheme: formData.countdownTheme || "Default",
    countdownLength: formData.countdownLength || "1 Minute",
    territoryPolicy: formData.territoryPolicy || "Monetize Worldwide",
    visibility: formData.visibility || "Default",
    repertoireOwner: formData.repertoireOwner || "",
    alreadyHaveAnVevoChannel: formData.alreadyHaveAnVevoChannel || "No",
    videoLink: formData.videoLink,
    assetId: formData.assetId,
    writer: formData.writer,
    composer: formData.composer,
    producer: formData.producer,
    editor: formData.editor,
    musicDirector: formData.musicDirector,
  }).forEach(([key, value]) => data.append(key, value));

  data.append("video", videoFile);
  data.append("image", thumbnail);

  return data;
};
export const requiredVideoFields = {
  releaseInformation: [
    "title",
    "explicit",
    "genre",
    "subGenre",
    "pLine",
    "primaryArtist",
    "vevoChannel",
    "releaseDate",
    "audioIsrc",
  ],
};
export const uploadVideoFormData = async (
  formDataToSend: any,
  onProgress: any
) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.post(
    `${imageURL}/video/upload`,
    formDataToSend,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        //@ts-ignore
        const progress = Math.round(
          //@ts-ignore
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(progress);
      },
    }
  );

  return response.data;
};
