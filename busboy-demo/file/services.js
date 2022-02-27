module.exports.checkFileTypes = (validTypes, filename) => {
  var ext = filename.substring(filename.lastIndexOf(".") + 1);
  if (validTypes.indexOf(ext) == -1) {
    return false;
  } else {
    return true;
  }
};
