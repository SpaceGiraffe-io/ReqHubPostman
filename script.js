const CryptoJs = require('crypto-js');

// keys
const publicKey = pm.collectionVariables.get('publicKey');
const privateKey = pm.collectionVariables.get('privateKey');

// timestamp
const timestamp = Date.now();

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
pm.request.headers.upsert('ClientToken', token);
pm.request.headers.upsert('ClientTimestamp', timestamp);
pm.request.headers.upsert('ClientNonce', nonce);
pm.request.headers.upsert('ClientKey', publicKey);
pm.request.headers.upsert('ClientUrl', requestUrl);

