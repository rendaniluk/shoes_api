'use strict'
module.exports = function(models) {

  // const index = function(req, res) {
  //   res.render('pages/index')
  // }

  const dbUpdates = function(req, res, next) {
    var id = req.body.id;
    var color = req.body.color;
    var brand = req.body.brand;
    var price = req.body.price;
    var size = req.body.size;
    var in_stock = req.body.in_stock;


    var shoes = [{
      id: id,
      color: color,
      brand: brand,
      price: price,
      size: size,
      in_stock: in_stock
    }]

    models.shoesApi.create(shoes, function(err, addShoe) {
      if (err) {
        return next(err)
      } else {
        res.redirect("/")
      }
    })
  }
  const shoes = function(req, res, next) {
    models.shoesApi.find({}, {
      _id: 0,
      __v: 0
    }, function(err, all_shoes) {
      if (err) {
        return next(err);
      } else {
        res.json(all_shoes)
      }
    })
  };

  const brands = function(req, res, next) {
    var brandname = req.params.brandname;
    models.shoesApi.find({
      brand: brandname
    }, {
      _id: 0,
      __v: 0
    }, function(err, all_brands) {
      if (err) {
        return next(err);
      } else {
        res.json(all_brands)
      }
    })
  }

  const sizes = function(req, res, next) {
    var sizes = req.params.sizes
    models.shoesApi.find({
      size: sizes
    }, {
      _id: 0,
      __v: 0
    }, function(err, all_sizes) {
      if (err) {
        return next(err);
      } else {
        res.json(all_sizes)
      }
    })
  }

  const sizesBrands = function(req, res, next) {
    var brandname = req.params.brandname;
    var sizes = req.params.sizes
    models.shoesApi.find({
      brand: brandname,
      size: sizes
    }, {
      _id: 0,
      __v: 0
    }, function(err, all_size_brand) {
      if (err) {
        return next(err);
      } else {
        res.json(all_size_brand)
      }
    })

  }

  const sold = function(req, res, next) {
    var sold_shoe = req.params.id;
    models.shoesApi.findOneAndUpdate({
      id: sold_shoe
    }, {
      $inc: {
        in_stock: -1
      }
    }, {
      upsert: false
    }, function(err, shoe) {
      if (err) {
        return next(err)
      } else {
        res.json(shoe)
      }
    });
  }

  return {
    // index,
    shoes,
    dbUpdates,
    brands,
    sizes,
    sizesBrands,
    sold
  }


};
