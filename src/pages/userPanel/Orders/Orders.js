import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./Orders.css";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("user")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);    
      console.log("Fetched orders:", data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="col-9">
      <div className="order">
        <table className="order__table">
          <thead className="order__table-header">
            <tr className="order__table-header-list">
              <th className="order__table-header-item">شناسه</th>
              <th className="order__table-header-item">تاریخ</th>
              <th className="order__table-header-item">وضعیت</th>
              <th className="order__table-header-item">دوره</th>
              <th className="order__table-header-item">مبلغ</th>
              <th className="order__table-header-item">عملیات ها</th>
            </tr>
          </thead>
          <tbody className="order__table-body">
            {orders.map((order, index) => (
              <tr className="order__table-body-list">
                <td className="order__table-body-item">
                  <a href="#" className="order__table-body-link">
                    {index + 1}
                  </a>
                </td>
                <td className="order__table-body-item">
                  {order.createdAt.slice(0, 10)}
                </td>
                <td className="order__table-body-item">تکمیل شده</td>
                <td className="order__table-body-item">{order.course.name}</td>
                <td className="order__table-body-item">{order.price===0?"رایگان":order.price}</td>
                <td className="order__table-body-item">
                  <Link to={`/my-account/view-order/${order._id}`} className="order__table-body-btn" >
                    نمایش
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
