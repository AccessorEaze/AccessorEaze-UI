import React from 'react';

class Listing {
  constructor(
    productId,
    id,
    type,
    product,
    price,
    URL,
    imageSmall,
    imageBig,
    vendor,
    ratings,
    extra,
  ) {
    this.productId = productId;
    //Tostring operation on id allows data to be stored as numbers on data/dummy.js, and converted to string when the required list view is called.
    //This is what caused the visualization error. hopefully the data in the future will be stored as a string to prevent this from being an issue.
    this.id = id.toString();
    this.product = product;
    this.price = price;
    this.URL = URL;
    this.type = type;
    //used for thumbnail icons is ProductListScreen.js
    this.imageSmall = imageSmall;
    if (this.imageSmall == null || this.imageSmall == undefined) {
      this.imageSmall = 'https://reactjs.org/logo-og.png';
    }
    this.imageBig = imageBig;
    if (this.imageBig == null || this.imageBig == undefined) {
      this.imageBig = 'https://reactjs.org/logo-og.png';
    }
    if (vendor == null) {
      this.vendor = 'PBtech';
    } else {
      this.vendor = vendor;
    }
    this.ratings = ratings;
    this.extra = extra;
  }
}
export default Listing;
