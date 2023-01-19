

export const smallSize = (url) => {
  let imageUrl = url + "?imageView2/2/w/100/ignore-error/1";
  return imageUrl;
};

export const mediumSize = (url) => {
  let imageUrl = url + "?imageView2/2/w/240/ignore-error/1";
  return imageUrl;
};

export const bigSize = (url) => {
  let imageUrl = url + "?imageView2/2/w/400/ignore-error/1";
  return imageUrl;
};

export const superBigSize = (url) => {
  let imageUrl = url + "?imageView2/2/w/720/ignore-error/1";
  return imageUrl;
};
