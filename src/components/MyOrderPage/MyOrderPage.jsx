import React, { useEffect, useState } from "react";

import "./MyOrderPage.css";
import Table from "../common/Table/Table";
import { getOrders } from "../../services/orderService";
import useData from "../../hooks/useData";
import Loader from "../Shared/Loader";

const MyOrderPage = () => {

  const {data:orders, error, isLoading} = useData("/order");

  const getProductNames = (products) => {
    const productNames = products?.map((prod) => `${prod.product.title}(${prod.quantity})`);
    return productNames.join(", ")
  }

  console.log("orders", orders);
  return (
    
    <section className="align-items order_page">
      {error && <p className='error' style={{color: 'red'}}  >Error: {error}</p>}
      {isLoading && <Loader/>}
      <Table heading={["order", "products", "total", "status"]}>
        <tbody>
          {orders?.map((order, index) => {
            return (
              <tr key={order._id}>
                <td>{ index +1 || 0}</td>
                <td>{getProductNames(order.products)}</td>
                <td>{order.total || 0}</td>
                <td>{order.status || "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </section>
  );
};

export default MyOrderPage;
