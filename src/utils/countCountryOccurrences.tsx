export const countCountryOccurrences = (countryList: string) => {
  const countryCounts = countryList
    ?.split(",")
    ?.reduce((acc: { [key: string]: number }, countryCode: string) => {
      if (acc[countryCode]) {
        acc[countryCode]++;
      } else {
        acc[countryCode] = 1;
      }
      return acc;
    }, {});

  return Object.keys(countryCounts).map((countryCode) => ({
    countryCode,
    count: countryCounts[countryCode],
  }));
};
