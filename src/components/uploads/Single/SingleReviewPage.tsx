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
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useEffect, useState } from "react";
import { getArtistsByIds, getFeatureArtistsByIds } from "../Album/fetchArtist";
import { useGetSingleLabelQuery } from "@/redux/slices/ArtistAndLabel/artistLabelApi";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
const SingleTrackReviewPage = ({ data, onChange }: any) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
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
      setAudioUrl(URL.createObjectURL(audio.audioFile));
    }

    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audio]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistIds = releaseInformation?.primaryArtists;
        const fetchedArtists = await getArtistsByIds(artistIds);
        setArtists(fetchedArtists);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, [releaseInformation?.primaryArtists]);

  useEffect(() => {
    const fetchFeatureArtists = async () => {
      try {
        const artistIds = releaseInformation?.featuringArtists;
        const fetchedFeatureArtists = await getFeatureArtistsByIds(artistIds);
        setFeatureArtists(fetchedFeatureArtists);
      } catch (error) {
        console.error("Error fetching featuring artists:", error);
      }
    };

    fetchFeatureArtists();
  }, [releaseInformation?.featuringArtists]);

  if (!audio || !audio.audioFile) {
    return (
      <div className="text-center">
        <p className="text-red-800 text-[30px]">Missing!</p>
        <p>No audio file selected.</p>
      </div>
    );
  }
  const renderWarning = (field: any, message: string) => {
    return !field ? (
      <Tooltip title={message}>
        <WarningAmberIcon color="warning" sx={{ ml: 1 }} />
      </Tooltip>
    ) : null;
  };
  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Card sx={{ borderRadius: 4, boxShadow: 3, marginBottom: 4 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "secondary.main", color: "white" }}>
              <PlayCircleOutlineIcon />
            </Avatar>
          }
          title={trackDetails?.title}
          subheader={`${releaseInformation?.releaseTitle} - ${releaseInformation?.version}`}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          sx={{ backgroundColor: "primary.main", color: "white" }}
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={
                  audio && audio.coverImage
                    ? URL.createObjectURL(audio.coverImage)
                    : "/default-cover.jpg"
                }
                alt={trackDetails?.title}
                sx={{ borderRadius: 2, boxShadow: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <List sx={{ width: "100%" }}>
                <ListItem>
                  <ListItemText
                    primary="Artists"
                    secondary={
                      //@ts-ignore
                      artists?.data
                        ? //@ts-ignore
                          artists.data
                            .map(
                              (artist: { primaryArtistName: string }) =>
                                artist.primaryArtistName
                            )
                            .join(", ")
                        : "N/A"
                    }
                  />
                  {renderWarning(
                    //@ts-ignore
                    artists?.data,
                    "Artists information missing"
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Featuring Artists"
                    secondary={
                      //@ts-ignore
                      featureArtists?.data
                        ? //@ts-ignore
                          featureArtists.data
                            .map(
                              (artist: { primaryArtistName: string }) =>
                                artist.primaryArtistName
                            )
                            .join(", ")
                        : "N/A"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Genre"
                    secondary={`${releaseInformation?.genre} / ${releaseInformation?.subgenre}`}
                  />
                  {renderWarning(
                    releaseInformation?.genre,
                    "Genre information missing"
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Label"
                    secondary={
                      isLoading ? "Loading..." : labelData?.data?.labelName
                    }
                  />
                  {renderWarning(labelData?.data?.labelName, "Label missing")}
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Release Date"
                    secondary={releaseInformation?.releaseDate}
                  />
                  {renderWarning(
                    releaseInformation?.releaseDate,
                    "Release date missing"
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Price"
                    secondary={`$${trackDetails?.price}`}
                  />
                  {renderWarning(trackDetails?.price, "Price missing")}
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
                  {renderWarning(trackDetails?.author, "Author missing")}
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Composer"
                    secondary={trackDetails?.composer}
                  />
                  {renderWarning(trackDetails?.composer, "Composer missing")}
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
                  {renderWarning(releaseInformation?.pLine, "P Line missing")}
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="C Line"
                    secondary={releaseInformation?.cLine}
                  />
                  {renderWarning(releaseInformation?.cLine, "C Line missing")}
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
                  {/* {renderWarning(trackDetails?.isrc, "ISRC missing")} */}
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Preview Start"
                    secondary={trackDetails?.previewStart}
                  />
                  {/* {renderWarning(
                    trackDetails?.previewStart,
                    "Preview Start missing"
                  )} */}
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Track Title Language"
                    secondary={trackDetails?.trackTitleLanguage}
                  />
                  {renderWarning(
                    trackDetails?.trackTitleLanguage,
                    "Track Title Language missing"
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Lyrics Language"
                    secondary={trackDetails?.lyricsLanguage}
                  />
                  {renderWarning(
                    trackDetails?.lyricsLanguage,
                    "Lyrics Language missing"
                  )}
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 4 }}>
            <audio controls style={{ width: "100%" }}>
              <source
                //@ts-ignore
                src={audioUrl}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
        <CardHeader
          title="Additional Details"
          sx={{ backgroundColor: "primary.main", color: "white" }}
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" color="text.primary">
                <strong>Content Type:</strong> {trackDetails?.contentType}{" "}
                {renderWarning(
                  trackDetails?.contentType,
                  "Content Type missing"
                )}
              </Typography>
              <Typography variant="body1" color="text.primary">
                <strong>Track Type:</strong> {trackDetails?.primaryTrackType}
                {renderWarning(
                  trackDetails?.primaryTrackType,
                  "primaryTrackType missing"
                )}
              </Typography>
              <Typography variant="body1" color="text.primary">
                <strong>Instrumental:</strong> {trackDetails?.instrumental}
                {renderWarning(
                  trackDetails?.instrumental,
                  "instrumental missing"
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" color="text.primary">
                <strong>ISRC:</strong> {trackDetails?.isrc}
              </Typography>
              <Typography variant="body1" color="text.primary">
                <strong>Catalogue Number:</strong>
                {releaseInformation?.catalogNumber}
              </Typography>
              <Typography variant="body1" color="text.primary">
                <strong>Parental Advisory:</strong>
                {trackDetails?.parentalAdvisory}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 4, boxShadow: 3, marginTop: 4 }}>
        <CardHeader
          title="Additional Information"
          sx={{ backgroundColor: "primary.main", color: "white" }}
        />
        <CardContent>
          <Typography variant="body1" color="text.primary">
            <strong>Description:</strong>{" "}
            {trackDetails?.description || "No description available"}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SingleTrackReviewPage;
