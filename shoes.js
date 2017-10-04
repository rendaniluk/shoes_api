'use strict'
module.exports = function(models) {

  // const index = function(req, res) {
  //   res.render('pages/index')
  // }

  const dbUpdates = function(req, res, next) {
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

  // const sold = function(req, res, next) {
  //   var sold_shoe = req.params.id;
  //   var qty = req.params.qID;
  //   Item.aggregate([
  //           { $unwind: '$dummy'},
  //           { $match: {'dummy.storage': {$gt: 0}} },
  //           { $group: {_id: '$_id',
  //                       dummy: {$push: '$dummy'},
  //                       original_y: { $first: "$original_y" },
  //                       new_y: { $first: "$new_y" },
  //
  //           }},
  //           {$project:{
  //                     original_y: 1, new_y: 1,
  //                     tallyAmount: {$sum: ["$new_y","$original_y"] }
  //                   }
  //           },
  //        ]
  //       )

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
  // }

  const brand = function(req, res, next) {
    models.shoesApi.find({}, function(err, all_brands) {
      var brands = [];
      var brandsMap = {};
      for (var i = 0; i < all_brands.length; i++) {
        if (brandsMap[all_brands[i].brand] === undefined) {
          brandsMap[all_brands[i].brand] = all_brands[i].brand;
          brands.push(all_brands[i].brand)
        }
      }
      if (err) {
        return next(err);
      } else {
        res.json(brands)
      }
    })
  }

  const size = function(req, res, next) {
    models.shoesApi.find({}, function(err, all_sizes) {
      var sizes = [];
      var sizesMap = {};
      for (var i = 0; i < all_sizes.length; i++) {
        if (sizesMap[all_sizes[i].size] === undefined) {
          sizesMap[all_sizes[i].size] = all_sizes[i].size;
          sizes.push(all_sizes[i].size)
        }
      }
      if (err) {
        return next(err);
      } else {
        res.json(sizes)
      }
    })
  }

  return {
    // index,
    shoes,
    dbUpdates,
    brands,
    sizes,
    sizesBrands,
    brand,
    size
    // sold
  }


};
