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
};

LoyalLock.prototype._urlFor = function(path) {
  return this.endpoint + path;
};

LoyalLock.prototype._doPost = function(path, data, callback) {
  var self = this;
  this.client({
    url: this._urlFor(path),
    method: 'POST',
    json: data
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

LoyalLock.prototype._doGet = function(path, data, callback) {
  var self = this;
  this.client({
    url: this._urlFor(path),
    qs: data,
    json: true
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


LoyalLock.prototype.getEarnedRewards = function(options, callback) {
  this._doGet('/earned_rewards', options, callback);
};


LoyalLock.prototype.findPromoterByEmail = function(email, callback) {
  this._doGet('/promoter', {email: email}, callback);
};

LoyalLock.prototype.findPromoterByRefId = function(refId, callback) {
  this._doGet('/promoter', {refId: refId}, callback);
};

LoyalLock.prototype.addCheckout = function(checkoutData, callback) {
  this._doPost('/checkouts', checkoutData, callback);
};


LoyalLock.prototype.confirmCheckout = function(orderId, callback) {
  this._doPost('/checkouts/confirm', {order_id: orderId}, callback);
};


LoyalLock.prototype.cancelCheckout = function(orderId, callback) {
  this._doPost('/checkouts/cancel', {order_id: orderId}, callback);
};



module.exports = LoyalLock;

