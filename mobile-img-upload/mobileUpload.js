let imgArray = [];
const imageInput = document.querySelector('#mobile-upload');
const inputField = document.querySelector('.upload-field');
const previewField = document.querySelector('.preview-field');
const submitField = document.querySelector('.submit-field');

imageInput.addEventListener('change', onImageChange);


function onImageChange() {
  let files = document.querySelector('#image-input').files;
  if (files && files.length != 0) {
    const fileArray = [...files];
    if(fileArray.length > 3) return alert('限制三張圖片以下');
    imageInput.classList.add('uploaded', 'uploading');
    fileArray.forEach(file => readImage(file, fileArray.length));
  }
};

function readImage(file, fileLength) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    console.log('before', reader.result);
    const fileSize = Math.round(file.size / 1024 / 1024);
    compressAndPreview(reader.result, fileSize, fileLength);
  });
  reader.readAsDataURL(file);
};

// 壓縮檔案並預覽 後儲存於陣列
function compressAndPreview(dataURL, fileSize, fileLength) {
  const previewField = document.querySelector('.preview-field');
  const maxW = 540;
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
    previewField.appendChild(cvs);
    const dataUrl = cvs.toDataURL('image/jpeg', getCompressRate(1, fileSize));
    imgArray.push(dataUrl);
    console.log('after', dataUrl);
    if (imgArray.length === fileLength) {
      imageInput.classList.remove('uploading');
      showSubmit();
    };
  });
  img.src = dataURL;
};

// 依圖檔大小改變壓縮比
function getCompressRate(allowMaxSize, fileSize) {
  let compressRate;
  if (fileSize / allowMaxSize > 4) {
    compressRate = 0.4;
  } else if (fileSize / allowMaxSize > 3) {
    compressRate = 0.5;
  } else if (fileSize / allowMaxSize > 2) {
    compressRate = 0.6;
  } else if (fileSize > allowMaxSize) {
    compressRate = 0.7;
  } else {
    compressRate = 0.8;
  }
  return compressRate;
};

function showSubmit() {
  const submitButton = document.createElement('button');
  submitButton.classList.add('submit-btn');
  submitButton.innerText = '確認上傳';
  submitButton.addEventListener('click', submitImage);
  document.querySelector('.submit-field').append(submitButton);
  const cancelButton = document.createElement('button');
  cancelButton.classList.add('cancel-btn');
  cancelButton.innerText = '取消';
  cancelButton.addEventListener('click', clearImage);
  document.querySelector('.submit-field').append(cancelButton);
};

function submitImage() {
  console.log('Submit Image!');
  clearImage();
};

// 清除圖片預覽 提交按鈕 圖檔輸入欄資料 圖檔陣列資料
function clearImage() {
  while(previewField.firstElementChild) {previewField.removeChild(previewField.firstElementChild)};
  while(submitField.firstElementChild) {submitField.removeChild(submitField.firstElementChild)};
  imageInput.classList.remove('uploaded');
  inputField.reset();
  imgArray.length = 0;
  console.log('cleared');
};


