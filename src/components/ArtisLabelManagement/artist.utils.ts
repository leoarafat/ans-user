export const extractAppleId = (input: string): string => {
  try {
    const url = new URL(input);
    const pathSegments = url.pathname.split("/");
    const id = pathSegments[pathSegments.length - 1];
    if (/^\d{10}$/.test(id)) {
      return id;
    }
    return input.trim();
  } catch (error) {
    return input.trim();
  }
};

export const extractSpotifyId = (input: string): string => {
  try {
    const url = new URL(input);
    const pathSegments = url.pathname.split("/");
    const id = pathSegments[pathSegments.length - 1];
    if (/^[A-Za-z0-9]{22}$/.test(id)) {
      return id;
    }
    return input.trim();
  } catch (error) {
    return input.trim();
  }
};
