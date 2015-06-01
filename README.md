# loyallock-node
LoyalLock Node.JS API


Installation
------------

    npm install loyallock


Quick Start
-----------

```javascript
var LoyalLock = require('loyallock');

// create an instance of the loyallock client
var llClient = new LoyalLock('YOUR_API_KEY');

// look up a promoter by email
llClient.findPromoterByEmail('promoter_email@example.org', function(err, promoter) {

});

// look up a promoter by refId
llClient.findPromoterByRefId('ABCD', function(err, promoter) {

});

// add a checkout
llClient.addCheckout({order_id: '1111', email: 'customer_email@example.org', total_price: '12.99', currency: 'USD'}, function(err, result) {

});


// confirm a pending checkout
llClient.confirmCheckout('1111', function(err, result) {

});


// cancel a pending checkout
llClient.cancelCheckout('1111', function(err, result) {

});

// get earned rewards newer than 1/1/2015 00:00 PST
llClient.getEarnedRewards({
  newer_than: 1420099200000
}, function(err, earnedRewards) {

});

