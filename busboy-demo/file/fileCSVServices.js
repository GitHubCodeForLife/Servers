function getFileCSVData(fileData) {
  const fileString = Buffer.concat(fileData).toString();
  const lines = fileString.split("\r\n" || "\n");
  const headers = lines[0].split(",");
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].split(",");
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = line[j];
    }
    data.push(obj);
  }
  return { data, headers };
}
exports.getFileCSVData = getFileCSVData;
