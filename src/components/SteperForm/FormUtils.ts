export interface ReleaseInformation {
  cLine: string;
  version: string;
  catalogNumber: string;
  featuringArtists: string[];
  format: string;
  genre: string;
  label: string;
  pLine: string;
  primaryArtists: string[];
  productionYear: string;
  releaseDate: string;
  releaseTitle: string;
  subgenre: string;
  upc: string;
  variousArtists: string;
}

export interface TrackDetails {
  arranger: string;
  askToGenerateISRC: string;
  crbtTitle: string;
  crbtTime: string;
  author: string;
  composer: string;
  contentType: string;
  instrumental: string;
  isrc: string;
  lyrics: string;
  lyricsLanguage: string;
  mood: string;
  parentalAdvisory: string;
  previewStart: string;
  price: string;
  primaryTrackType: string;
  producer: string;
  publisher: string;
  remixer: string;
  secondaryTrackType: string;
  title: string;
  trackTitleLanguage: string;
}

export interface AudioDetails {
  audioFile: File;
  coverImage: File;
}

export type FormData = {
  audio: AudioDetails;
  releaseInformation: ReleaseInformation;
  trackDetails: TrackDetails;

  previewPage: Record<string, unknown>;
  platform: string;
};
