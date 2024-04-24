export const converterValue = (data) => {
  if (data >= 1000000) {
    return Math.floor(data / 1000000) + 'M';
  } else if (data >= 1000) {
    return Math.floor(data / 1000) + 'K';
  } else {
    return data;
  }
};
