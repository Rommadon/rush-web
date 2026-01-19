import { CartItemModel, CouponModel, MerchantShipmentModel, ProductItem } from "src";

export const getProductItemsPrice = (items: any) => {
  const rangePrice = items?.map((item: any) => {
    if (item.primaryOptionsValue !== '') {

      if (item && item?.productDiscount && item?.productDiscount?.type === 'remain' && item?.productDiscount?.value >= 0) {
        if (item.productDiscount.unitType === 'bath') {
          return {
            price: roundToTwo(item?.price),
            discount: roundToTwo(item?.price - item?.productDiscount?.value),
            priceOnDiscount: roundToTwo(item?.productDiscount?.value)
          }
        } else {
          return {
            price: roundToTwo(item?.price),
            discount: roundToTwo(item?.price - ((item.price * item.productDiscount?.value) / 100)),
            priceOnDiscount: roundToTwo((item.price * item.productDiscount?.value) / 100)
          }
        }
      }
    
      if (item && item?.productDiscount && item?.productDiscount?.type === 'decrease' && item?.productDiscount?.value >= 0) {
        if (item.productDiscount.unitType === 'bath') {
          return {
            price: roundToTwo(item?.price),
            discount: roundToTwo(item?.productDiscount?.value),
            priceOnDiscount: roundToTwo(item.price - item.productDiscount?.value)
          }
        } else {
          return {
            price: roundToTwo(item?.price),
            discount: roundToTwo(item?.price - (item.price * (100 - item.productDiscount?.value)) / 100),
            priceOnDiscount: roundToTwo((item.price * (100 - item.productDiscount?.value)) / 100)
          }
        }
      }
    
      return {
        price: roundToTwo(item?.price),
        discount: null,
        priceOnDiscount: roundToTwo(item?.price)
      }
    }
  })

  const finalRangePrice = rangePrice.filter(Boolean)

  finalRangePrice.sort((a: any, b: any) => a.priceOnDiscount - b.priceOnDiscount);

  return {
    minPrice: finalRangePrice && finalRangePrice[0],
    maxPrice: finalRangePrice && finalRangePrice[finalRangePrice.length - 1]
  }
}

export const getProductItemPrice = (item: any) => {
  let priceValue = item?.price;
  let discountValue = null;
  let priceOnDiscountValue = item?.price;
  let bigUnitPriceValue = item?.bigUnitPrice;
  let bigUnitDiscountValue = null;
  let bigUnitPriceOnDiscountValue = item?.bigUnitPrice;

  if (item && item?.productDiscount && item?.productDiscount?.type === 'remain' && item?.productDiscount?.value >= 0) {
    if (item.productDiscount.unitType === 'bath') {
      discountValue = item?.price - item?.productDiscount?.value;
      priceOnDiscountValue = item?.productDiscount?.value;
    } else {
      discountValue = item?.price - ((item.price * item.productDiscount?.value) / 100);
      priceOnDiscountValue = (item.price * item.productDiscount?.value) / 100;
    }
  }

  if (item && item?.productDiscount && item?.productDiscount?.type === 'decrease' && item?.productDiscount?.value >= 0) {
    if (item.productDiscount.unitType === 'bath') {
      discountValue = item?.productDiscount?.value;
      priceOnDiscountValue = item.price - item.productDiscount?.value;
    } else {
      discountValue = item?.price - (item.price * (100 - item.productDiscount?.value)) / 100;
      priceOnDiscountValue = (item.price * (100 - item.productDiscount?.value)) / 100;
    }
  }

  if (item && item?.productBigUnitDiscount && item?.productBigUnitDiscount?.type === 'remain' && item?.productBigUnitDiscount?.value >= 0) {
    if (item.productBigUnitDiscount.unitType === 'bath') {
      bigUnitDiscountValue = item?.bigUnitPrice - item?.productBigUnitDiscount?.value;
      bigUnitPriceOnDiscountValue = item?.productBigUnitDiscount?.value;
    } else {
      bigUnitDiscountValue = item?.bigUnitPrice - ((item.bigUnitPrice * item.productBigUnitDiscount?.value) / 100);
      bigUnitPriceOnDiscountValue = (item.bigUnitPrice * item.productBigUnitDiscount?.value) / 100;
    }
  }

  if (item && item?.productBigUnitDiscount && item?.productBigUnitDiscount?.type === 'decrease' && item?.productBigUnitDiscount?.value >= 0) {
    if (item.productBigUnitDiscount.unitType === 'bath') {
      bigUnitDiscountValue = item?.productBigUnitDiscount?.value;
      bigUnitPriceOnDiscountValue = item.bigUnitPrice - item.productBigUnitDiscount?.value;
    } else {
      bigUnitDiscountValue = item?.bigUnitPrice - (item.bigUnitPrice * (100 - item.productBigUnitDiscount?.value)) / 100;
      bigUnitPriceOnDiscountValue = (item.bigUnitPrice * (100 - item.productBigUnitDiscount?.value)) / 100;
    }
  }


  return {
    price: roundToTwo(priceValue),
    discount: roundToTwo(discountValue),
    priceOnDiscount: roundToTwo(priceOnDiscountValue),
    bigUnitPrice: roundToTwo(bigUnitPriceValue),
    bigUnitDiscount: roundToTwo(bigUnitDiscountValue),
    bigUnitPriceOnDiscount: roundToTwo(bigUnitPriceOnDiscountValue),
  }
}

export const getProductPriceAndProductDiscountPrice = (items: any) => {
  const itemsPrice = items?.map((item: any) => {
    const product = item?.productItem?.product
    const productItem = item?.productItem;
    let price = productItem?.price;
    let discount = 0;
    let quantity = item?.quantity;

    if (item?.unit === product?.bigUnit) {
      price = productItem?.bigUnitPrice;

      if (productItem?.productBigUnitDiscount) {
        if (productItem?.productBigUnitDiscount?.type === 'remain') {
          if (productItem?.productBigUnitDiscount?.unitType === 'bath') {
            discount = productItem?.bigUnitPrice - productItem?.productBigUnitDiscount?.value
          }
          if (productItem?.productBigUnitDiscount?.unitType === 'percent') {
            discount = productItem?.bigUnitPrice * ((100 - productItem?.productBigUnitDiscount?.value) / 100)
          }
        }
        if (productItem?.productBigUnitDiscount?.type === 'decrease') {
          if (productItem?.productBigUnitDiscount?.unitType === 'bath') {
            discount = productItem?.productBigUnitDiscount?.value
          }
          if (productItem?.productBigUnitDiscount?.unitType === 'percent') {
            discount = productItem?.bigUnitPrice * (productItem?.productBigUnitDiscount?.value / 100)
          }
        }
      }
    } else {
      if (productItem?.productDiscount) {
        if (productItem?.productDiscount?.type === 'remain') {
          if (productItem?.productDiscount?.unitType === 'bath') {
            discount = productItem?.price - productItem?.productDiscount?.value
          }
          if (productItem?.productDiscount?.unitType === 'percent') {
            discount = productItem?.price * ((100 - productItem?.productDiscount?.value) / 100)
          }
        }
        if (productItem?.productDiscount?.type === 'decrease') {
          if (productItem?.productDiscount?.unitType === 'bath') {
            discount = productItem?.productDiscount?.value
          }
          if (productItem?.productDiscount?.unitType === 'percent') {
            discount = productItem?.price * (productItem?.productDiscount?.value / 100)
          }
        }
      }
    }

    const result = {
      price: (price - discount) * quantity
    }

    return result
  })

  const resultProductPrice: number = itemsPrice?.reduce(function (acc: any, obj: any) { return acc + obj.price; }, 0);

  return {
    totalPrice: roundToTwo(resultProductPrice) || 0,
  }
}

export const getShipmentPrice = (merchantShipment: MerchantShipmentModel, cartItems: CartItemModel[]) => {
  if (merchantShipment.shipmentType === "pickup") {
    return 0;
  }
  if (merchantShipment.shipmentType === "transport") {
    if (merchantShipment.paymentShipmentType === "free") {
      return 0;
    }
    if (merchantShipment.calculateShipmentType === "fixed") {
      return roundToTwo(merchantShipment?.fixedPrice);
    }
    if (merchantShipment.calculateShipmentType === "custom") {
      const orderItemsPrice = cartItems?.map((cartItem) => {
        const product = cartItem?.productItem?.product;
        let quantity = cartItem?.quantity;

        if (cartItem?.unit === product?.bigUnit) {
          quantity = cartItem?.quantity * product?.piecePerBigUnit
        }

        const result = {
          weight: product ? (product?.weightSize * quantity)/1000 : 0,
          size: product ? (product?.widthSize + product?.lengthSize + product?.heightSize) * quantity : 0
        }

        return result
      })

      const resultProductWeightPrice = orderItemsPrice ? orderItemsPrice.reduce(function (acc, obj) { return acc + obj.weight; }, 0) : 0;

      let weightPrice = 0;

      if (merchantShipment?.calulateShipmentMethods) {
        merchantShipment?.calulateShipmentMethods?.forEach((method) => {
          if (method.type === 'weight' && +method.from.toFixed(2) <= parseFloat(resultProductWeightPrice.toFixed(2)) && +method.to.toFixed(2) >= parseFloat(resultProductWeightPrice.toFixed(2))) {
            weightPrice = method.price;
          }
        })
      }

      return roundToTwo(weightPrice);
    }
  }

  return 0;
}

export const getOrderProductDiscountPrice = (coupon: CouponModel, orderProductPrice: number, orderShipmentPrice: number) => {
  if (coupon && coupon?.type === "amount") {
    if (coupon?.valueType === "currency") {
      return coupon?.value
    } else if (coupon?.valueType === "percent") {
      const discount = (orderProductPrice * coupon?.value) / 100;

      return discount;
    }
  } else if (coupon && coupon?.type === "freeShipping") {
    return orderShipmentPrice;
  } else {
    return 0;
  }

  return 0;
}

export const getProductStock = (productItems: ProductItem[]) => {
  let stockRemaining = 0;
  productItems.forEach((item) => {
    if (item?.stock?.remaining) {
      stockRemaining = stockRemaining + item.stock.remaining
    }
  })

  return stockRemaining;
}

export const roundToTwo = (num: number) => {
  // @ts-ignore
  return +(Math.round(num + "e+2")  + "e-2");
}
