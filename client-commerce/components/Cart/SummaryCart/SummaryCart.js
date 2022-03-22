import React, { useState, useEffect } from "react";
import { Button, Table, Image, Icon, Tab } from "semantic-ui-react";
import { map, forEach } from "lodash";
import useCart from "../../../hooks/useCart";
import { BASE_PATH } from "../../../utils/constants";
export default function SummaryCart(props) {
  const { products, reloadCart, setReloadCart } = props;
  const [totalPrice, setTotalPrice] = useState(0);
  const { removeProductCart } = useCart();

  useEffect(() => {
    let finalPrice = 0;
    forEach(products, (product) => {
      console.log("descuento", product);
      console.log("price", finalPrice);
      finalPrice += product[0].discount
        ? discounting(product[0])
        : product[0].price;
    });
    setTotalPrice(finalPrice);
  }, [reloadCart, products]);
  if (!products) {
    return null;
  }

  function discounting(product) {
    console.log("hey");
    var discountPrice = (
      product.price -
      (product.price * product.discount) / 100
    ).toFixed(2);
    console.log(Number(discountPrice));
    return Number(discountPrice);
  }

  const removeProduct = (product) => {
    console.log("product", product);
    removeProductCart(product);
    setReloadCart(true);
  };

  return (
    <div className="summary-cart">
      <div className="title">Resumen del carrito:</div>
      <div className="data">
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Producto</Table.HeaderCell>
              <Table.HeaderCell>Plataforma</Table.HeaderCell>
              <Table.HeaderCell>Entrega</Table.HeaderCell>
              <Table.HeaderCell>Precio</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(products, (product, index) => (
              <Table.Row key={index} className="summary-cart__product">
                <Table.Cell>
                  <Icon
                    name="close"
                    link
                    onClick={() => removeProduct(product[0].url)}
                  />
                  <Image
                    src={`${BASE_PATH}${product[0].poster.url}`}
                    alt={product.title}
                  />
                  {product[0].title}
                </Table.Cell>
                <Table.Cell>{product[0].platform.title}</Table.Cell>
                <Table.Cell>Inmediata</Table.Cell>
                <Table.Cell>
                  {product[0].discount
                    ? (
                        product[0].price -
                        (product[0].price * product[0].discount) / 100
                      ).toFixed(2)
                    : product[0].price}
                  €
                </Table.Cell>
              </Table.Row>
            ))}

            <Table.Row className="summary-cart__resume">
              <Table.Cell className="clear" />
              <Table.Cell colSpan="2">Total:</Table.Cell>
              <Table.Cell className="total-price">
                {totalPrice.toFixed(2)} €
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
