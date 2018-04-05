export function compress(file, quality, callback) {
  if (!window.FileReader || !window.Blob) {
    return errorHandler('您的浏览器不支持图片压缩')();
  }

  var reader = new FileReader();
  var mimeType = file.type || 'image/jpeg';

  reader.onload = createImage;
  reader.onerror = errorHandler('图片读取失败！');
  reader.readAsDataURL(file);

  function createImage() {
    var dataURL = this.result;
    var image = new Image();
    image.onload = compressImage;
    image.onerror = errorHandler('图片加载失败');
    image.src = dataURL;
  }

  function compressImage() {
    var canvas = document.createElement('canvas');
    var ctx;
    var dataURI;
    var result;

    canvas.width = this.naturalWidth;
    canvas.height = this.naturalHeight;
    ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0, 0);
    dataURI = canvas.toDataURL(mimeType, quality);
    // result = dataURIToBlob(dataURI);
    result = dataURLtoFile(dataURI,file.name);

    callback(null, result);
  }

  /**
   * 转为Blob对象
   * @param dataURI
   * @returns {Blob}
   */
  function dataURIToBlob(dataURI) {
    var type = dataURI.match(/data:([^;]+)/)[1];
    var base64 = dataURI.replace(/^[^,]+,/, '');
    var byteString = atob(base64);

    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: type});
  }

  /**
   * 转为File对象
   * @param dataurl
   * @param filename
   * @returns {File}
   */
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  function errorHandler(message) {
    return function () {
      var error = new Error('Compression Error:', message);
      callback(error, null);
    };
  }
}
