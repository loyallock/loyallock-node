var request = require('request');

function LoyalLock(apiKey) {
  this.endpoint = 'https://loyallock.com/api/v1';
  this.updateApiKey(apiKey);
}

LoyalLock.prototype.updateApiKey = function(apiKey) {
  this.apiKey = apiKey;
  this.client = request.defaults({
    headers: {
      'X-LoyalLock-Api-Key': apiKey
    }
  });
}

LoyalLock.prototype.urlFor = function(path) {
  return this.endpoint + path;
};

LoyalLock.prototype.addCheckout = function(checkoutData, callback) {
  var self = this;
  this.client({
    url: this.urlFor('/checkouts'),
    method: 'POST',
    json: checkoutData,
  }, function(e, r, b) {
    if (e) {
      return callback(e);
    }
    if (r.statusCode !== 200) {
      return callback(new Error('API Error: ' + r.statusCode + ' ' + b));
    }
    callback(null, b);
  });
};

module.exports = LoyalLock;

