const imgArray = [];

document.getElementById('image-input').addEventListener('change', onImageChange, false);


function onImageChange() {
  let files = document.querySelector('#image-input').files;
  if (files) {
    const fileArray = [...files];
    if(fileArray.length >= 3) return alert('限制兩張圖片以下'); 
    fileArray.forEach(file => readAndPreview(file, fileArray.length));
  }
}

function readAndPreview(file, fileLength) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    console.log('data:URL before', reader.result);
    const fileSize = Math.round(file.size / 1024 / 1024);
    compress(reader.result, fileSize, fileLength);
  });
  reader.readAsDataURL(file);
};

function compress(dataURL, fileSize, fileLength) {
  const previewField = document.querySelector('.preview-field');
  const maxW = 320;
  const img = new Image();
  img.addEventListener("load", () => {
    const cvs = document.createElement('canvas');
    const ctx = cvs.getContext('2d');
    if (img.width > maxW) {
      img.height *= maxW / img.width; img.width = maxW;
    }
    cvs.width = img.width; cvs.height = img.height;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const dataUrl = cvs.toDataURL('image/jpeg', getCompressRate(1, fileSize));
    previewField.appendChild(img);
    imgArray.push(dataUrl);
    console.log('data:URL after', dataUrl);
    if (imgArray.length === fileLength) console.log('POST data here!', imgArray);
  });
  img.src = dataURL;
};

function getCompressRate(allowMaxSize, fileSize) {
  let compressRate;
  if (fileSize / allowMaxSize > 4) {
    compressRate = 0.5;
  } else if (fileSize / allowMaxSize > 3) {
    compressRate = 0.6;
  } else if (fileSize / allowMaxSize > 2) {
    compressRate = 0.7;
  } else if (fileSize > allowMaxSize) {
    compressRate = 0.8;
  } else {
    compressRate = 0.9;
  }
  return compressRate;
}