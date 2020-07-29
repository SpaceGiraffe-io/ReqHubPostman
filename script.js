const CryptoJs = require('crypto-js');

// keys
const publicKey = pm.collectionVariables.get('publicKey');
const privateKey = pm.collectionVariables.get('privateKey');

// timestamp
const timestamp = Date.now().toString();

// nonce
const nonceData = CryptoJS.lib.WordArray.random(20);
const nonce = CryptoJS.enc.Base64.stringify(nonceData);

// request url
const requestUrl = '/' + pm.request.url.path.join('/');

// create the token
const secret = `${privateKey}${timestamp}${nonce}${requestUrl}`;
const hmacsha256 = CryptoJS.HmacSHA256(publicKey, secret);
const token = CryptoJS.enc.Base64.stringify(hmacsha256);

// add headers
pm.request.headers.add(token, 'ClientToken');
pm.request.headers.add(timestamp, 'ClientTimestamp');
pm.request.headers.add(nonce, 'ClientNonce');
pm.request.headers.add(publicKey, 'ClientKey');
pm.request.headers.add(requestUrl, 'ClientUrl');

