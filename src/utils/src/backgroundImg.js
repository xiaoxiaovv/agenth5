export default (url, size) => {
  let backgroundImgurl = {
    'background-image': `url(${url})`,
    'background-repeat': 'no-repeat',
    'background-size': size
  }
  return backgroundImgurl
}
