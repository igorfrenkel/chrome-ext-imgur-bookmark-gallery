var _idMatcher = /[^\/]+/g;
var _gallery;
var _thumbUrl = function(url) {
  var id = url.match(_idMatcher).pop(),
    thumbUrl = "http://imgur.com/" + id + ".jpg";
  return thumbUrl;
};

var gallery = function() {
  _gallery = _gallery || document.getElementById("gallery");
  return _gallery;
};

var addUrlToPopup = function(imgUrl, thumbUrl) {
  var link = document.createElement("a"),
    thumb = document.createElement("img");
  link.href = imgUrl;
  link.target = "_blank";
  thumb.src = thumbUrl;
  link.appendChild(thumb);
  gallery().appendChild(link);
};

var drawGalleryFrom = function(urls) {
  urls.forEach(function(imgUrl) {
    var thumbUrl = _thumbUrl(imgUrl);
    addUrlToPopup(imgUrl, thumbUrl);
  });
};

document.addEventListener('DOMContentLoaded', function () {
  var urls = [];
  chrome.bookmarks.search("http://imgur.com/", function(results) { 
    results.forEach(function(result) { 
      if (result.url)
        urls.push(result.url);
    });
    drawGalleryFrom(urls);
  });  
});
