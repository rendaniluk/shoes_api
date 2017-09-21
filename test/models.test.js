const assert = require('assert');
const Models = require('../models');
describe('models should be able to: ', function() {
  var models = Models("mongodb://localhost/shoe-test");

  beforeEach(function(done) {
    models.shoesApi.remove({}, function(err) {
      done(err);
    })
  })

  it('store shoes_data in mongoDB', function() {
    var shoes = [{
      id: 100,
      color: 'blue',
      brand: 'Mike',
      price: 350,
      size: 7,
      in_stock: 5
    }, {
      id: 110,
      color: 'blue',
      brand: 'Mike',
      price: 350,
      size: 7,
      in_stock: 5
    }];

    models.shoesApi
      .create(shoes, function(err) {
        models.shoesApi.find({
          id: 100,
          color: 'blue',
          brand: 'Mike',
          price: 350,
          size: 7,
          in_stock: 5
        }, function(err, shoes) {
          assert.equal(1, shoes.length);
          done(err)
        })
      });
  })

})
