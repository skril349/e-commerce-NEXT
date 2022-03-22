/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { getGameByUrlApi } from "../api/game";
import useCart from "../hooks/useCart";
import SummaryCart from "../components/Cart/SummaryCart";
import AddressShipping from "../components/Cart/AddressShipping";
import Payment from "../components/Cart/Payment/Payment";

export default function cart() {
  const { getProductsCart } = useCart();
  const products = getProductsCart();

  return !products ? <EmptyCart /> : <FullCart products={products} />;
}

function EmptyCart() {
  return (
    <BasicLayout className="empty-cart">
      <h1>No hay productos en el carrito</h1>
    </BasicLayout>
  );
}

function FullCart(props) {
  const [productsData, setProductsData] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [address, setAddress] = useState(null);
  const { products } = props;
  useEffect(() => {
    (async () => {
      const productsTemp = [];
      for await (const product of products) {
        const data = await getGameByUrlApi(product);
        productsTemp.push(data);
      }
      setProductsData(productsTemp);
      setReloadCart(false);
    })();
  }, [reloadCart]);
  if (!productsData) return null;
  return (
    <BasicLayout className="full-cart">
      <SummaryCart
        products={productsData}
        setReloadCart={setReloadCart}
        reloadCart={reloadCart}
      />
      <AddressShipping setAddress={setAddress} />
      {address && (
        <Payment
          products={productsData}
          address={address}
          setReloadCart={setReloadCart}
        />
      )}
    </BasicLayout>
  );
}
