var CryptoJS = require('components/core.js');
require('components/sha256.js');
require('components/hmac.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function generateSeed(input) {
  var seed = CryptoJS.SHA256(input).toString();
  for (var i = 0; i < 1000; i++) {
    seed = CryptoJS.SHA256(seed).toString();
  }
  return seed;
}

module.exports = {
  formatTime: formatTime,
  generateSeed: generateSeed,

}
