## ReqHubPostman

Make ReqHub requests with Postman.

## Quickstart

You can download our [collection template](https://reqhubprod.blob.core.windows.net/public/tools/postman/ReqHub%20API%20Template.postman_collection.json), which is already configured with the pre-request script. After importing the collection, all you need to do is add your client keys and you're good to go &#x1f389;

To update your client keys, edit the collection and select the 'Variables' tab.

![Postman variables](https://reqhubprod.blob.core.windows.net/public/docs/postman-variables.png)

For more details about setup and usage, keep reading!

## Set up the pre-request script

In Postman, create a new collection or request and edit the pre-request script. Paste the following text, [which is also available in GitHub](https://github.com/SpaceGiraffe-io/ReqHubPostman/blob/master/script.js):

```js
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
```

It should look something like this:

![Pre-request script](https://reqhubprod.blob.core.windows.net/public/docs/postman-script.png)

Next you'll need to set up variables for your API keys.

## Add your client keys

Copy the client keys for the API you want to call. You can use our official [public test API](https://reqhub.io/SpaceGiraffe/Public-test-API), and see the [Quickstart guide](http://localhost:3000/#/getting-started/quickstart?id=consuming-an-api) on adding an API to your account.

![Subscribing to an API](https://reqhubprod.blob.core.windows.net/public/docs/client-keys.png)

In Postman, switch to the 'Variables' tab and create a variable called `publicKey` and another called `privateKey`. Then paste the corresponding client keys into the 'INITIAL VALUE' field.

When you're done, it should look something like this:

![Variables setup](https://reqhubprod.blob.core.windows.net/public/docs/postman-variables-setup.png)

Save your changes, and you should be all set to start making requests.

## Make a request

Once you've completed the setup, you can create requests in Postman as normal.

For example, if you're using our official [public test API](https://reqhub.io/SpaceGiraffe/Public-test-API), you can make a `GET` request to `https://public-test-api.spacegiraffe.io/test`.

Send it!

![Postman request](https://reqhubprod.blob.core.windows.net/public/docs/postman-request.png)

If something isn't set up correctly, you should see the error response from ReqHub:

![ReqHub error](https://reqhubprod.blob.core.windows.net/public/docs/postman-error.png)

In this case we used an incorrect value for one of our keys. If you receive a different error, your ReqHub setup is probably correct but you may have to check your request setup or read the documentation for the API you're using.

Note that the API may respond with a different status code than ReqHub.
If ReqHub encounters an error processing the request, it will return a 400 response, which may cause the API's ReqHub middleware to return a different status code.

## Contributing
Go for it! If we're missing something or you're running into a problem, either let us know in an issue or send us a pull request.
We think we're pretty reasonable &#x1f618;

## License
MIT &#x1f389;
