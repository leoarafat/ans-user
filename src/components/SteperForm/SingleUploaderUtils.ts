/* eslint-disable @typescript-eslint/ban-ts-comment */
import { imageURL } from "@/redux/api/baseApi";
import axios from "axios";
import AudioDetails from "../uploads/Single/AudioDetails";
import ReleaseInformation from "../uploads/Single/ReleaseInformation";
import TracksInformation from "../uploads/Single/TracksInformation";
import SingleReviewPage from "../uploads/Single/SingleReviewPage";
import ReleasePlatform from "../uploads/Single/ReleasePlatform";
export const prepareFormData = (formData: any) => {
  const data = new FormData();

  const releaseInfo = formData.releaseInformation;
  const trackDetails = formData.trackDetails;
  const audioData = formData.audio;

  // Append release information
  Object.entries({
    cLine: releaseInfo.cLine,
    subtitle: releaseInfo.version,
    catalogNumber: releaseInfo.catalogNumber,
    featuringArtists: releaseInfo.featuringArtists.join(","),
    format: releaseInfo.format,
    genre: releaseInfo.genre,
    label: releaseInfo.label,
    pLine: releaseInfo.pLine,
    primaryArtist: releaseInfo.primaryArtists.join(","),
    productionYear: releaseInfo.productionYear,
    releaseDate: releaseInfo.releaseDate,
    releaseTitle: releaseInfo.releaseTitle,
    subGenre: releaseInfo.subgenre,
    upc: releaseInfo.upc,
    variousArtists: releaseInfo.variousArtists,
  }).forEach(([key, value]) => data.append(key, value));

  // Append track details
  Object.entries({
    arranger: trackDetails.arranger,
    askToGenerateISRC: trackDetails.askToGenerateISRC,
    author: trackDetails.author,
    composer: trackDetails.composer,
    contentType: trackDetails.contentType,
    instrumental: trackDetails.instrumental,
    isrc: trackDetails.isrc,
    lyrics: trackDetails.lyrics,
    crbtTitle: trackDetails.crbtTitle,
    crbtTime: trackDetails.crbtTime,
    lyricsLanguage: trackDetails.lyricsLanguage,
    mood: trackDetails.mood,
    parentalAdvisory: trackDetails.parentalAdvisory,
    previewStart: trackDetails.previewStart,
    price: trackDetails.price,
    primaryTrackType: trackDetails.primaryTrackType,
    producer: trackDetails.producer,
    publisher: trackDetails.publisher,
    remixer: trackDetails.remixer,
    secondaryTrackType: trackDetails.secondaryTrackType,
    title: trackDetails.title,
    trackTitleLanguage: trackDetails.trackTitleLanguage,
  }).forEach(([key, value]) => data.append(key, value));

  // Append files and platform
  data.append("audio", audioData.audioFile);
  data.append("image", audioData.coverImage);
  data.append("platform", formData.platform);

  return data;
};

export const uploadFormData = async (formDataToSend: any, onProgress: any) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.post(
    `${imageURL}/single-music/upload`,
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
export const clearLocalStorage = () => {
  localStorage.removeItem("releaseFormData");
  localStorage.removeItem("tracksInformation");
  localStorage.removeItem("platform");
};

export const steps = [
  { title: "Release Information", component: ReleaseInformation },
  { title: "Audio & Cover", component: AudioDetails },
  { title: "Tracks Details", component: TracksInformation },
  { title: "Select Platform", component: ReleasePlatform },
  { title: "Review Details", component: SingleReviewPage },
];
