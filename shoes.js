'use strict'
module.exports = function(models) {
  const stockAdd = function(req, res, next) {
    var shoe = req.body

    var shoes = [{
      id: shoe.id,
      color: shoe.color,
      brand: shoe.brand,
      price: shoe.price,
      size: shoe.size,
      in_stock: shoe.in_stock
    }]

    models.shoesApi.create(shoes, function(err, addShoe) {
      if (err) {
        return next(err)
      } else {
        res.redirect("/")
      }
    })
  };

  const allShoes = function(req, res, next) {
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

  const brandsFilter = function(req, res, next) {
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

  const sizesFilter = function(req, res, next) {
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

  const sizesBrandsFilter = function(req, res, next) {
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


  const purchase = function(req, res, next) {
    var sold_shoe = req.params.id;
    var qty = req.params.qID;
    models.shoesApi.findOne({
      id: sold_shoe
    }, function(err, result) {
      if (err) {
        return next(err);
      }else if (result.in_stock - qty === 0) {
        //there is no stock
        return {
          // the correct result here
          result
        };
      }

      result.save(function() {
        // do things
      });
    });
    // models.shoesApi.findOneAndUpdate({
    //   id: sold_shoe
    // }, {
    //   $inc: {
    //     in_stock: -qty
    //   }
    // }, {
    //   upsert: false
    // }, function(err, shoe) {
    //   if (err) {
    //     return next(err)
    //   } else {
    //     res.json(shoe)
    //   }
    // });

  }

  const sizesBrandsDropDowns = function(req, res, next) {
    models.shoesApi.find({}, function(err, all_shoes) {
      var sizes = []
      var sizesMap = {};
      for (var i = 0; i < all_shoes.length; i++) {
        if (sizesMap[all_shoes[i].size] === undefined) {
          sizesMap[all_shoes[i].size] = all_shoes[i].size;
          sizes.push(all_shoes[i].size)
        }
      }
      var brands = [].sort()
      var brandsMap = {};
      for (var i = 0; i < all_shoes.length; i++) {
        if (brandsMap[all_shoes[i].brand] === undefined) {
          brandsMap[all_shoes[i].brand] = all_shoes[i].brand;
          brands.push(all_shoes[i].brand)
        }
      }

      if (err) {
        return next(err);
      } else {
        res.json({
          sizes: sizes.sort(function(a, b) {
                return a - b;
              }),
          brands: brands.sort()
        })
      }
    })
  }

  return {
    allShoes,
    stockAdd,
    brandsFilter,
    sizesFilter,
    sizesBrandsDropDowns,
    sizesBrandsFilter
    // purchase
  }


};
