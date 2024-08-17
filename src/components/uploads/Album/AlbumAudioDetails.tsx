/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Box,
  Container,
  Typography,
  IconButton,
} from "@material-ui/core";
import { MdClose } from "react-icons/md";
import { BsCloudUpload } from "react-icons/bs";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Autocomplete from "@mui/material/Autocomplete";
import { genres } from "@/MockData/MockData";
import {
  useGetArtistsQuery,
  useGetApprovedLabelsQuery,
} from "@/redux/slices/ArtistAndLabel/artistLabelApi";

const formats = ["CD", "Vinyl"];

const years = Array.from(
  new Array(50),
  (val, index) => new Date().getFullYear() - index
).map(String);

const AlbumAudioDetails = ({ data, onChange }: any) => {
  const [audioFiles, setAudioFiles] = useState<
    Array<{ file: File; id: number }>
  >([]);
  const [songs, setSongs] = useState<any[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  useEffect(() => {
    if (audioFiles.length > 0) {
      setSongs((prevSongs) => {
        return audioFiles.map((audioFile) => {
          const existingSong = prevSongs.find(
            (song) => song.id === audioFile.id
          );
          return existingSong
            ? existingSong
            : {
                id: audioFile.id,
                file: audioFile.file,
                title: "",
                version: "",
                primaryArtists: [""],
                featuringArtists: [""],
                writers: [""],
                composers: [""],
                directors: [""],
                producers: [""],
                variousArtists: false,
                genre: "",
                subgenre: "",
                label: "",
                format: "",
                releaseDate: "",
                publisher: "",
                language: "",
                productionYear: "",
                isrc: "",
                youtube: "",
                lyrics: "",
              };
        });
      });
    }
  }, [audioFiles]);

  // useEffect(() => {
  //   const storedSongs = localStorage.getItem("albumSongs");
  //   if (storedSongs) {
  //     setSongs(JSON.parse(storedSongs));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("albumSongs", JSON.stringify(songs));
  //   onChange("audios", songs);
  // }, [songs]);
  useEffect(() => {
    onChange("audios", songs);
  }, [songs]);
  const { data: labelData } = useGetApprovedLabelsQuery({});
  const { data: artistData } = useGetArtistsQuery({});

  const artistOptions =
    //@ts-ignore
    artistData?.data?.data?.map((artist: any) => artist.primaryArtistName) ||
    [];

  const labelOptions =
    //@ts-ignore
    labelData?.data?.data?.map((label: any) => label.labelName) || [];

  const handleGenreChange = (songId: number, newValue: any) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId ? { ...song, genre: newValue } : song
      )
    );
  };

  const handleSubgenreChange = (
    songId: number,

    newValue: string | null
  ) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId ? { ...song, subgenre: newValue } : song
      )
    );
  };

  const getSubgenres = (songId: number) => {
    const selectedSong = songs.find((song) => song.id === songId);
    const selectedGenre = selectedSong ? selectedSong.genre : null;
    const genreObj = genres.find((genre) => genre.name === selectedGenre);
    return genreObj ? genreObj.subgenres : [];
  };

  const handleCoverImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type === "image/jpeg") {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width === 1500 && img.height === 1500) {
          setCoverImage(file);
          onChange("coverImage", { coverImage: file });
        } else {
          alert("Image must be 1500x1500 pixels.");
        }
      };
    } else {
      alert("Only JPG format is accepted.");
    }
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newAudioFile = { file, id: Date.now() };
      setAudioFiles((prev) => [...prev, newAudioFile]);
      setSongs((prev) => [
        ...prev,
        {
          id: newAudioFile.id,
          file: newAudioFile.file,
          title: "",
          version: "",
          primaryArtists: [""],
          featuringArtists: [""],
          writers: [""],
          composers: [""],
          directors: [""],
          producers: [""],
          variousArtists: false,
          genre: "",
          subgenre: "",
          label: "",
          format: "",
          releaseDate: "",
          publisher: "",
          language: "",
          productionYear: "",
          isrc: "",
          youtube: "",
          lyrics: "",
        },
      ]);
    }
  };

  const handleCoverImageRemove = () => {
    setCoverImage(null);
    onChange("coverImage", { coverImage: null });
  };

  const handleAudioRemove = (id: number) => {
    setAudioFiles((prev) => prev.filter((audio) => audio.id !== id));
    setSongs((prev) => prev.filter((song) => song.id !== id));
  };

  const addPrimaryArtist = (songId: number) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? { ...song, primaryArtists: [...song.primaryArtists, ""] }
          : song
      )
    );
  };

  const addFeaturingArtist = (songId: number) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? { ...song, featuringArtists: [...song.featuringArtists, ""] }
          : song
      )
    );
  };
  const addWriter = (songId: number) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId ? { ...song, writers: [...song.writers, ""] } : song
      )
    );
  };

  const addComposer = (songId: number) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? { ...song, composers: [...song.composers, ""] }
          : song
      )
    );
  };
  const addDirectors = (songId: number) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? { ...song, directors: [...song.directors, ""] }
          : song
      )
    );
  };

  const addProducer = (songId: number) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? { ...song, producers: [...song.producers, ""] }
          : song
      )
    );
  };
  const removeWriter = (songId: number, index: number) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? {
              ...song,
              writers: song.writers.filter(
                (_: string, i: number) => i !== index
              ),
            }
          : song
      )
    );
  };

  const removeComposer = (songId: number, index: number) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? {
              ...song,
              composers: song.composers.filter(
                (_: string, i: number) => i !== index
              ),
            }
          : song
      )
    );
  };
  const removeDirector = (songId: number, index: number) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? {
              ...song,
              directors: song.directors.filter(
                (_: string, i: number) => i !== index
              ),
            }
          : song
      )
    );
  };

  const removeProducer = (songId: number, index: number) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? {
              ...song,
              producers: song.producers.filter(
                (_: string, i: number) => i !== index
              ),
            }
          : song
      )
    );
  };
  const removePrimaryArtist = (songId: number, index: number) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? {
              ...song,
              primaryArtists: song.primaryArtists.filter(
                (_: string, i: number) => i !== index
              ),
            }
          : song
      )
    );
  };

  const removeFeaturingArtist = (songId: number, index: number) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? {
              ...song,
              featuringArtists: song.featuringArtists.filter(
                (_: string, i: number) => i !== index
              ),
            }
          : song
      )
    );
  };

  const handlePrimaryArtistChange = (
    songId: number,
    index: number,
    value: string
  ) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? {
              ...song,
              primaryArtists: song.primaryArtists.map((artist: any, i: any) =>
                i === index ? value : artist
              ),
            }
          : song
      )
    );
  };

  const handleFeaturingArtistChange = (
    songId: number,
    index: number,
    value: string
  ) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? {
              ...song,
              featuringArtists: song.featuringArtists.map(
                (artist: any, i: any) => (i === index ? value : artist)
              ),
            }
          : song
      )
    );
  };
  const handleProducersChange = (
    songId: number,
    index: number,
    value: string
  ) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? {
              ...song,
              producers: song.producers.map((artist: any, i: any) =>
                i === index ? value : artist
              ),
            }
          : song
      )
    );
  };
  const handleDirectorsChange = (
    songId: number,
    index: number,
    value: string
  ) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? {
              ...song,
              directors: song.directors.map((artist: any, i: any) =>
                i === index ? value : artist
              ),
            }
          : song
      )
    );
  };
  const handleWriterChange = (songId: number, index: number, value: string) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? {
              ...song,
              writers: song.writers.map((writer: any, i: any) =>
                i === index ? value : writer
              ),
            }
          : song
      )
    );
  };

  const handleComposerChange = (
    songId: number,
    index: number,
    value: string
  ) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? {
              ...song,
              composers: song.composers.map((composer: any, i: any) =>
                i === index ? value : composer
              ),
            }
          : song
      )
    );
  };

  const handleSongChange = (songId: number, field: string, value: any) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId ? { ...song, [field]: value } : song
      )
    );
  };

  return (
    <Container>
      <Box mt={3}>
        {/* <Box mt={3} className="flex justify-center items-center w-full">
          
          <Box className="image_upload flex items-center justify-center flex-col p-3">
            <Typography variant="h6" gutterBottom>
              Upload Cover Image
            </Typography>
            {coverImage ? (
              <Box position="relative" display="inline-block">
                <img
                  src={URL.createObjectURL(coverImage)}
                  alt="COVER IMAGE"
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  style={{ position: "absolute", top: 0, right: 0 }}
                  onClick={handleCoverImageRemove}
                >
                  <MdClose />
                </IconButton>
              </Box>
            ) : (
              <label
                htmlFor="cover-image-upload"
                className="upload hover:bg-green-100 transition flex justify-center shadow-md rounded-md p-12 text-5xl cursor-pointer"
              >
                <BsCloudUpload style={{ fontSize: 100 }} />
                <input
                  id="cover-image-upload"
                  type="file"
                  accept="image/jpeg"
                  style={{ display: "none" }}
                  onChange={handleCoverImageUpload}
                />
              </label>
            )}
          </Box>

          
          <Box className="image_upload flex items-center justify-center flex-col p-3">
            <Typography variant="h6" gutterBottom>
              Upload Audio Files
            </Typography>
            <label
              htmlFor="audio-upload"
              className="upload hover:bg-green-100 transition flex justify-center shadow-md rounded-md p-12 text-5xl cursor-pointer"
            >
              <AudiotrackIcon style={{ fontSize: 100 }} />
              <input
                id="audio-upload"
                type="file"
                accept="audio/*"
                style={{ display: "none" }}
                onChange={handleAudioUpload}
              />
            </label>
          </Box>
        </Box> */}
        <Box mt={3} className="flex justify-center items-center w-full">
          {/* Cover Image Uploader */}
          <Box className=" flex items-center justify-center flex-col p-3">
            <Typography variant="h6" gutterBottom>
              Upload Cover Image
            </Typography>
            {coverImage ? (
              <Box>
                <img
                  src={URL.createObjectURL(coverImage)}
                  alt="COVER IMAGE"
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    position: "relative",
                  }}
                />
                <IconButton
                  style={{
                    position: "absolute",
                    // top: -0,
                    // left: 0,
                    // right: 8,
                    backgroundColor: "rgba(255, 0, 0, 0.7)",
                    color: "white",
                  }}
                  onClick={handleCoverImageRemove}
                >
                  <MdClose />
                </IconButton>
              </Box>
            ) : (
              <label
                htmlFor="cover-image-upload"
                className="upload hover:bg-green-100 transition flex justify-center shadow-md rounded-md p-12 text-5xl cursor-pointer"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "300px",
                  height: "300px",
                  border: "2px dashed #ccc",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                <BsCloudUpload style={{ fontSize: 60 }} />
                <input
                  id="cover-image-upload"
                  type="file"
                  accept="image/jpeg"
                  style={{ display: "none" }}
                  onChange={handleCoverImageUpload}
                />
              </label>
            )}
          </Box>

          {/* Audio File Uploader */}
          <Box className="image_upload flex items-center justify-center flex-col p-3">
            <Typography variant="h6" gutterBottom>
              Upload Audio Files
            </Typography>
            <label
              htmlFor="audio-upload"
              className="upload hover:bg-green-100 transition flex justify-center shadow-md rounded-md p-12 text-5xl cursor-pointer"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "300px",
                height: "300px",
                border: "2px dashed #ccc",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <AudiotrackIcon style={{ fontSize: 60 }} />
              <input
                id="audio-upload"
                type="file"
                accept="audio/*"
                style={{ display: "none" }}
                onChange={handleAudioUpload}
              />
            </label>
          </Box>
        </Box>

        {songs?.map((song, index) => (
          <Box mt={4} key={song.id} border={1} borderRadius={5} padding={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">
                {song?.file?.name} {index + 1}
              </Typography>
              <IconButton onClick={() => handleAudioRemove(song.id)}>
                <MdClose />
              </IconButton>
            </Box>
            <audio
              controls
              style={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}
            >
              <source src={URL.createObjectURL(song.file)} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
            <Box mt={2}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Release Title"
                    variant="outlined"
                    value={song.title}
                    onChange={(e) =>
                      handleSongChange(song.id, "title", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Version/Subtitle"
                    variant="outlined"
                    value={song.version}
                    onChange={(e) =>
                      handleSongChange(song.id, "version", e.target.value)
                    }
                  />
                </Grid>
                {song.primaryArtists.map((artist: any, artistIndex: any) => (
                  <Grid
                    item
                    xs={6}
                    key={artistIndex}
                    container
                    alignItems="center"
                    // spacing={1}
                  >
                    <Grid item xs={12}>
                      <Autocomplete
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        options={artistOptions}
                        value={artist}
                        onChange={(event, newValue) =>
                          handlePrimaryArtistChange(
                            song.id,
                            artistIndex,
                            newValue
                          )
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Primary Artist"
                            variant="outlined"
                          />
                        )}
                        freeSolo
                      />
                      <IconButton
                        onClick={() =>
                          removePrimaryArtist(song.id, artistIndex)
                        }
                        disabled={song.primaryArtists.length === 1}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                      {artistIndex === song.primaryArtists.length - 1 && (
                        <IconButton onClick={() => addPrimaryArtist(song.id)}>
                          <AddCircleOutlineIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                ))}
                {/* featuringArtists */}
                {song.featuringArtists.map((artist: any, artistIndex: any) => (
                  <Grid
                    item
                    xs={6}
                    key={artistIndex}
                    container
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <TextField
                        label="Featuring"
                        variant="outlined"
                        value={artist}
                        onChange={(event) =>
                          handleFeaturingArtistChange(
                            song.id,
                            artistIndex,
                            event.target.value
                          )
                        }
                        fullWidth
                      />
                      <IconButton
                        onClick={() =>
                          removeFeaturingArtist(song.id, artistIndex)
                        }
                        disabled={song.featuringArtists.length === 1}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                      {artistIndex === song.featuringArtists.length - 1 && (
                        <IconButton onClick={() => addFeaturingArtist(song.id)}>
                          <AddCircleOutlineIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                ))}
                {/* featuringArtists */}
                {/* Producers */}
                {song.producers.map((producer: any, producerIndex: any) => (
                  <Grid
                    item
                    xs={6}
                    key={producerIndex}
                    container
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <TextField
                        label="Producers"
                        variant="outlined"
                        value={producer}
                        onChange={(event) =>
                          handleProducersChange(
                            song.id,
                            producerIndex,
                            event.target.value
                          )
                        }
                        fullWidth
                      />
                      <IconButton
                        onClick={() => removeProducer(song.id, producerIndex)}
                        disabled={song.producers.length === 1}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                      {producerIndex === song.producers.length - 1 && (
                        <IconButton onClick={() => addProducer(song.id)}>
                          <AddCircleOutlineIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                ))}
                {/* Producers */}
                {/* Directors */}
                {song.directors.map((director: any, directorIndex: any) => (
                  <Grid
                    item
                    xs={6}
                    key={directorIndex}
                    container
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <TextField
                        label="Directors"
                        variant="outlined"
                        value={director}
                        onChange={(event) =>
                          handleDirectorsChange(
                            song.id,
                            directorIndex,
                            event.target.value
                          )
                        }
                        fullWidth
                      />
                      <IconButton
                        onClick={() => removeDirector(song.id, directorIndex)}
                        disabled={song.directors.length === 1}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                      {directorIndex === song.directors.length - 1 && (
                        <IconButton onClick={() => addDirectors(song.id)}>
                          <AddCircleOutlineIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                ))}
                {/* Directors */}

                <Grid item xs={6}>
                  {song.writers.map((writer: any, index: any) => (
                    <Grid container spacing={1} alignItems="center" key={index}>
                      <Grid item xs={12}>
                        <TextField
                          label="Writer"
                          variant="outlined"
                          value={writer}
                          onChange={(event) =>
                            handleWriterChange(
                              song.id,
                              index,
                              event.target.value
                            )
                          }
                          fullWidth
                        />
                        <IconButton
                          onClick={() => removeWriter(song.id, index)}
                          disabled={song?.writers?.length === 1}
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                        {index === song?.writers?.length - 1 && (
                          <IconButton onClick={() => addWriter(song.id)}>
                            <AddCircleOutlineIcon />
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                <Grid item xs={6}>
                  {song.composers.map((composer: any, index: any) => (
                    <Grid container spacing={1} alignItems="center" key={index}>
                      <Grid item xs={12}>
                        <TextField
                          label="Composer"
                          variant="outlined"
                          value={composer}
                          onChange={(event) =>
                            handleComposerChange(
                              song.id,
                              index,
                              event.target.value
                            )
                          }
                          fullWidth
                        />
                        <IconButton
                          onClick={() => removeComposer(song.id, index)}
                          disabled={song?.composers?.length === 1}
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                        {index === song?.composers?.length - 1 && (
                          <IconButton onClick={() => addComposer(song.id)}>
                            <AddCircleOutlineIcon />
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                </Grid>

                <Grid item xs={12} md={6}>
                  <Autocomplete
                    options={genres?.map((genre: any) => genre.name) || []}
                    value={song.genre}
                    onChange={(event, newValue) =>
                      handleGenreChange(song.id, newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Genre"
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Autocomplete
                    options={getSubgenres(song.id)}
                    value={song.subgenre || ""}
                    onChange={(event, newValue) =>
                      handleSubgenreChange(song.id, newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Subgenre"
                        variant="outlined"
                        required
                        fullWidth
                        disabled={!song.subgenre}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    options={labelOptions}
                    value={song.label}
                    onChange={(event, newValue) =>
                      handleSongChange(song.id, "label", newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Label Name"
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    options={formats}
                    value={song.format}
                    onChange={(event, newValue) =>
                      handleSongChange(song.id, "format", newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Format"
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Physical/Original Release Date"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={song.releaseDate}
                    onChange={(e) =>
                      handleSongChange(song.id, "releaseDate", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Publisher"
                    variant="outlined"
                    value={song.publisher}
                    onChange={(e) =>
                      handleSongChange(song.id, "publisher", e.target.value)
                    }
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Autocomplete
                    fullWidth
                    options={["English", "Spanish", "French", "German"]}
                    renderInput={(params) => (
                      <TextField
                        value={song.language}
                        {...params}
                        label="Lyrics Language"
                        variant="outlined"
                        onChange={(e) =>
                          handleSongChange(song.id, "language", e.target.value)
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    options={years}
                    value={song.productionYear}
                    onChange={(event, newValue) =>
                      handleSongChange(song.id, "productionYear", newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Production Year"
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="ISRC"
                    variant="outlined"
                    value={song.isrc}
                    onChange={(e) =>
                      handleSongChange(song.id, "isrc", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Youtube URL"
                    variant="outlined"
                    value={song.youtube}
                    onChange={(e) =>
                      handleSongChange(song.id, "youtube", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Lyrics"
                    multiline
                    onChange={(e) =>
                      handleSongChange(song.id, "lyrics", e.target.value)
                    }
                    rows={4}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default AlbumAudioDetails;
