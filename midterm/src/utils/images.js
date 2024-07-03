const baseUrl = 'https://image.tmdb.org/t/p/';
const detailSize = 'w780';
const searchSize = 'w92';

const getDetailImageUrl = (filename) => `${baseUrl}${detailSize}${filename}`;
const getSearchImageUrl = (filename) => `${baseUrl}${searchSize}${filename}`;

module.exports = {
  getDetailImageUrl,
  getSearchImageUrl,
};
