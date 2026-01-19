import { FC, useContext, useState } from "react";
import Router from 'next/router';
import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from "yup";

import { ProductPrimaryOption } from "src/product/models/productPrimaryOption";
import { ProductSecondaryOption } from "src/product/models/productSecondaryOption";
import { CartContext, Product, useAuth } from "src";
import { SingleProductDetailForm } from './SingleProductDetailForm';
import { CartModel, useResource } from "src/core";
import { useToast } from "src/core/hooks/useToast";
import { ProductItem } from "src/product/models";

export type SingleProductDetailFormProp = {
  productPrimaryOption?: ProductPrimaryOption;
  productSecondaryOption?: ProductSecondaryOption;
  units: string[];
  product: Product;
  cart: CartModel;
  onSelectedProductItem?: (data: any) => any;
  onChangeUnit?: (unit: any) => any;
  onClose?: any;
};

export const SingleProductDetailFormController: FC<SingleProductDetailFormProp> = ({ productPrimaryOption, productSecondaryOption, units, product, cart, onSelectedProductItem, onClose, onChangeUnit }) => {
  const resource = useResource();
  const toast = useToast();
  const { setCartData } = useContext(CartContext);
  const { openAuthModal, isAuth } = useAuth();
  const [onLoading, setOnLoading] = useState(false);

  const schema = yup.object().shape({
  });

  const { register, handleSubmit, watch, control, getValues, setValue, formState:{ errors } } = useForm({
    // resolver: yupResolver(schema),
    // defaultValues: { 
    // }
  });

  const onSubmit = async (data: any) => {
    setOnLoading(true);

    if (!isAuth) {
      setOnLoading(false);
      openAuthModal();
    } else {
      try {
        if (cart && cart.cartItems) {
          const existCartItem = cart.cartItems.find((item) => item.productItem.id === data.productItemId && item.unit === data.unit);
        
          if (existCartItem) {
            try {
              await resource.updateResource('cart-public/cartItem', existCartItem?.id, {
                quantity: existCartItem.quantity + data.quantity,
                unit: data.unit,
                productItemId: data.productItemId,
              })
            } catch (error: any) {
              console.log(error)
              toast.openToast(error.message, 'error');
            }
          } else {
            try {
              await resource.createResource('cart-public/cartItem', {
                quantity: data.quantity,
                unit: data.unit,
                productItemId: data.productItemId,
              })
            } catch (error: any) {
              console.log(error)
              toast.openToast(error.message, 'error');
            }
          }
    
          const fetchCart = await resource.fetchResource('cart-public', {}, '');
          setCartData(fetchCart?.data?.data);
          setOnLoading(false);
          toast.openToast('เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว', 'success');

          console.log(onClose)
          if (onClose) {
            onClose();
          }
        } else {
          const cartData = await resource.fetchResource('cart-public', {}, '');
          const cart = cartData?.data?.data;
          const existCartItem = cart.cartItems.find((item: any) => item.productItem.id === data.productItemId && item.unit === data.unit);
        
          if (existCartItem) {
            try {
              await resource.updateResource('cart-public/cartItem', existCartItem?.id, {
                quantity: existCartItem.quantity + data.quantity,
                unit: data.unit,
                productItemId: data.productItemId,
              })
            } catch (error: any) {
              console.log(error)
              toast.openToast(error.message, 'error');
            }
          } else {
            try {
              await resource.createResource('cart-public/cartItem', {
                quantity: data.quantity,
                unit: data.unit,
                productItemId: data.productItemId,
              })
            } catch (error: any) {
              console.log(error)
              toast.openToast(error.message, 'error');
            }
          }
    
          const fetchCart = await resource.fetchResource('cart-public', {}, '');
          setCartData(fetchCart?.data?.data);
          setOnLoading(false);
          toast.openToast('เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว', 'success');
          
          if (onClose) {
            onClose();
          }
        }
      } catch (error) {
        console.log(error)
        setOnLoading(false);
        toast.openToast('เพิ่มสินค้าลงตะกร้าไม่สำเร็จ', 'error');
        if (onClose) {
          onClose();
        }
      }
    }
  };

  return (
    <>
      <SingleProductDetailForm
        control={control}
        handleSubmit={handleSubmit}
        register={register}
        watch={watch}
        getValues={getValues}
        setValue={setValue}
        errors={errors}
        onSubmit={(data: any) => onSubmit(data)}
        productPrimaryOption={productPrimaryOption}
        productSecondaryOption={productSecondaryOption}
        units={units}
        product={product}
        onLoading={onLoading}
        onChangeUnit={onChangeUnit ? (unit: string) => onChangeUnit(unit) : undefined}
        onSelectedProductItem={onSelectedProductItem ? (data: ProductItem) => onSelectedProductItem(data) : undefined}
      />
    </>
  )
}

export default SingleProductDetailFormController;
