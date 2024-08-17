/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  CardMedia,
  CardHeader,
  Avatar,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useEffect, useState } from "react";
import { getArtistsByIds, getFeatureArtistsByIds } from "../Album/fetchArtist";
import { useGetSingleLabelQuery } from "@/redux/slices/ArtistAndLabel/artistLabelApi";

const SingleTrackReviewPage = ({ data, onChange }: any) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [artists, setArtists] = useState<any[]>([]);
  const [featureArtists, setFeatureArtists] = useState<any[]>([]);

  const trackDetails = data?.trackDetails;
  const releaseInformation = data?.releaseInformation;
  const { data: labelData, isLoading } = useGetSingleLabelQuery(
    releaseInformation?.label
  );
  const audio = data?.audio;

  useEffect(() => {
    if (audio && audio.audioFile) {
      //@ts-ignore
      setAudioUrl(URL.createObjectURL(audio.audioFile));
    }

    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audio]);
  useEffect(() => {
    const storedData = localStorage.getItem("tracksInformation");
    if (storedData) {
      onChange("trackDetails", JSON.parse(storedData).trackDetails);
      onChange("releaseInformation", JSON.parse(storedData).releaseInformation);
      // onChange("audio", JSON.parse(storedData).audio);
    }
  }, []);
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistIds = releaseInformation?.primaryArtists;

        const fetchedArtists = await getArtistsByIds(artistIds);
        // console.log(featureArtists);
        setArtists(fetchedArtists);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, [releaseInformation?.primaryArtists]);
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistIds = releaseInformation?.featuringArtists;

        const fetchedArtists = await getFeatureArtistsByIds(artistIds);
        // console.log(featureArtists);
        setFeatureArtists(fetchedArtists);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, [releaseInformation?.featuringArtists]);

  if (!audio || !audio.audioFile) {
    return <div>No audio file selected.</div>;
  }
  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Card style={{ marginBottom: "20px" }}>
        <CardHeader
          avatar={
            <Avatar aria-label="track">
              <PlayCircleOutlineIcon />
            </Avatar>
          }
          title={trackDetails?.title}
          subheader={`${releaseInformation?.releaseTitle} - ${releaseInformation?.version}`}
          style={{ backgroundColor: "#f5f5f5" }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} style={{ padding: "10px" }}>
              <CardMedia
                component="img"
                image={
                  audio &&
                  audio?.coverImage &&
                  URL.createObjectURL(audio?.coverImage)
                }
                alt={trackDetails?.title}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            </Grid>
            <Grid item xs={12} sm={8} style={{ padding: "10px" }}>
              <List style={{ width: "100%" }}>
                <ListItem>
                  <ListItemText
                    primary="Artists"
                    secondary={
                      artists?.data
                        ? artists.data
                            .map(
                              (artist: { primaryArtistName: any }) =>
                                artist.primaryArtistName
                            )
                            .join(", ")
                        : ""
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Featuring Artists"
                    secondary={
                      featureArtists?.data
                        ? featureArtists.data
                            .map(
                              (artist: { primaryArtistName: any }) =>
                                artist.primaryArtistName
                            )
                            .join(", ")
                        : ""
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Genre"
                    secondary={`${releaseInformation?.genre} / ${releaseInformation?.subgenre}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Label"
                    secondary={
                      isLoading ? "Loading.." : labelData?.data?.labelName
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Release Date"
                    secondary={releaseInformation?.releaseDate}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Price"
                    secondary={`$${trackDetails?.price}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Producer"
                    secondary={trackDetails?.producer}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Lyrics"
                    secondary={trackDetails?.lyrics}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Remixer"
                    secondary={trackDetails?.remixer}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Author"
                    secondary={trackDetails?.author}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Composer"
                    secondary={trackDetails?.composer}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Arranger"
                    secondary={trackDetails?.arranger}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="P Line"
                    secondary={releaseInformation?.pLine}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Production Year"
                    secondary={releaseInformation?.productionYear}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Publisher"
                    secondary={trackDetails?.publisher}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="ISRC" secondary={trackDetails?.isrc} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Preview Start"
                    secondary={trackDetails?.previewStart}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Track Title Language"
                    secondary={trackDetails?.trackTitleLanguage}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Lyrics Language"
                    secondary={trackDetails?.lyricsLanguage}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <audio controls style={{ width: "100%", marginTop: "20px" }}>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </CardContent>
      </Card>
      <Card style={{ marginBottom: "20px" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6} style={{ padding: "10px" }}>
              <Typography variant="body1">
                <strong>Content Type:</strong> {trackDetails?.contentType}
              </Typography>
              <Typography variant="body1">
                <strong>Track Type:</strong> {trackDetails?.primaryTrackType}
              </Typography>
              <Typography variant="body1">
                <strong>Instrumental:</strong> {trackDetails?.instrumental}
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ padding: "10px" }}>
              <Typography variant="body1">
                <strong>ISRC:</strong> {trackDetails?.isrc}
              </Typography>
              <Typography variant="body1">
                <strong>Catalogue Number:</strong>{" "}
                {releaseInformation?.catalogNumber}
              </Typography>
              <Typography variant="body1">
                <strong>Parental Advisory:</strong>{" "}
                {trackDetails?.parentalAdvisory}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card style={{ marginBottom: "20px" }}>
        <CardHeader
          title="Release Information"
          style={{ backgroundColor: "#f5f5f5" }}
        />
        <CardContent>
          <List style={{ width: "100%" }}>
            <ListItem>
              <ListItemText
                primary="Release Title"
                secondary={releaseInformation?.releaseTitle}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Version Subtitle"
                secondary={releaseInformation?.version}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Primary Artists"
                secondary={
                  artists?.data
                    ? artists.data
                        .map(
                          (artist: { primaryArtistName: any }) =>
                            artist.primaryArtistName
                        )
                        .join(", ")
                    : ""
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Featuring Artists"
                secondary={releaseInformation?.featuringArtists.join(", ")}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Various Artists Compilation"
                secondary={
                  releaseInformation?.variousArtistsCompilation ? "Yes" : "No"
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Genre"
                secondary={`${releaseInformation?.genre} / ${releaseInformation?.subgenre}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Label"
                secondary={isLoading ? "Loading.." : labelData?.data?.labelName}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Format"
                secondary={releaseInformation?.format}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Physical Release Date"
                secondary={releaseInformation?.releaseDate}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="P Line"
                secondary={releaseInformation?.pLine}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="C Line"
                secondary={releaseInformation?.cLine}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Production Year"
                secondary={releaseInformation?.productionYear}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="UPC/EAN"
                secondary={releaseInformation?.upc}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Producer Catalogue Number"
                secondary={releaseInformation?.catalogNumber}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SingleTrackReviewPage;
