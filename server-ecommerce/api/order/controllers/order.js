"use strict";

const { default: createStrapi } = require("strapi");

const stripe = require("stripe")(
  "sk_test_51Kg5OdGCLIlV0aYMBtlauJKIRRIQcwzwjnGz7KmSXLcGBPmO4CKNtLHQxd1JvVIHev2Lg35JlWcYm7kuZOEGWoRe00O2nRyuZv"
);

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

// module.exports = {
//   async create(ctx) {
//     const { token, products, idUser, addressShipping } = ctx.request.body;
//     let totalPayment = 0;
//     console.log("body", { token, products, idUser, addressShipping });

//     products.forEach((product) => {
//       totalPayment = totalPayment + Number(product.price);
//     });
//     const charge = await stripe.charges.create({
//       amount: totalPayment * 100,
//       currency: "eur",
//       source: token.id,
//       description: `ID USUARIO: ${idUser}`,
//     });
//     console.log("charge", charge);
//     const createOrder = [];
//     for await (const product of products) {
//       const data = {
//         game: product.id,
//         user: idUser,
//         totalPayment,
//         idPayment: charge.id,
//         addressShipping,
//       };
//       console.log("data", data);
//       const validData = await strapi.entityValidator.validateEntity(
//         strapi.models.order,
//         data
//       );
//       const entry = await strapi.query("order").create(validData);
//       createOrder.push(entry);
//     }
//     return createOrder;
//   },
// };

const calcPrice = (price, discount) => {
  if (!discount) return price;
  const discountAmount = (price * discount) / 100;
  return (price - discountAmount).toFixed(2);
};

module.exports = {
  async create(ctx) {
    const { token, products, idUser, addressShipping } = ctx.request.body;
    console.log("HOLA");
    let totalPayment = 0;
    products.forEach((product) => {
      const totalPrice = calcPrice(product[0].price, product[0].discount);
      totalPayment += Number(totalPrice);
      console.log(totalPayment);
    });

    const charge = await stripe.charges.create({
      amount: totalPayment * 100,
      currency: "eur",
      source: token.id,
      description: `ID Usuario: ${idUser}`,
    });
    console.log("charge", charge);

    const createOrder = [];
    for await (const product of products) {
      const data = {
        game: product[0].id,
        user: idUser,
        totalPayment,
        idPayment: charge.id,
        addressShipping,
      };
      console.log("HEY");
      const validData = await strapi.entityValidator.validateEntityCreation(
        strapi.models.order,
        data
      );
      const entry = await strapi.query("order").create(validData);
      createOrder.push(entry);
    }
    return createOrder;
  },
};
