export const IMAGE_PATH_URI = `https://image.tmdb.org/t/p/w500`;
export const IMAGE_PATH_URI_1024 = `https://image.tmdb.org/t/p/w1024`;

interface Size {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

const size: Size = {
  xs: "400px", // for small screen mobile
  sm: "600px", // for mobile screen
  md: "900px", // for tablets
  lg: "1280px", // for laptops
  xl: "1440px", // for desktop / monitors
  xxl: "1920px", // for big screens
};

export const device = {
  xs: `(max-width: ${size.xs})`,
  sm: `(max-width: ${size.sm})`,
  md: `(max-width: ${size.md})`,
  lg: `(max-width: ${size.lg})`,
  xl: `(max-width: ${size.xl})`,
  xxl: `(max-width: ${size.xxl})`,
};
