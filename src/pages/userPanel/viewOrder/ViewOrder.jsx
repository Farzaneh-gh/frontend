import React from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie';
function ViewOrder() {
    const { id } = useParams();
    const [order, setOrder] = React.useState({});

    const getOrderDetails = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/orders/${id}`, {
            headers: {  
                Authorization: `Bearer ${Cookies.get("user")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data[0]);
                setOrder(data[0].course);
            }).catch((error) => {
                console.error("Error fetching order details:", error);
            });
    }

    React.useEffect(() => {
      getOrderDetails();
    }, [id]);

  return (
      <div className="col-9">
      <div className="view-order">
        <h2>جزئیات سفارش</h2>
        <p>در این بخش می‌توانید جزئیات سفارش خود را مشاهده کنید.</p>
        شماره سفارش: {order ? order._id : "در حال بارگذاری..."}
        <br />
        تاریخ سفارش:{" "}
        {order ? order.createdAt?.slice(0, 10) : "در حال بارگذاری..."}
        <br />
        وضعیت:{" "}
        {order.course?.isComplete === 1 ? "تکمیل شده" : "در حال بارگذاری..."}
        <br />
        دوره: {order ? order.course?.name : "در حال بارگذاری..."}
        <br />
        مبلغ:{" "}
        {order
          ? order.course?.price === 0
            ? "رایگان"
            : order.course?.price
          : "در حال بارگذاری..."}
        <br />
        <br />
        <h3>آدرس صورت حساب</h3>
        <p>نام : {order ? order.course?.name : "در حال بارگذاری..."}</p>
        <p>تماس: {order ? order.course?.description : "در حال بارگذاری..."}</p>
        <p>مدت زمان: {order ? order.course?.duration : "در حال بارگذاری..."}</p>
        <p>
          قیمت:{" "}
          {order
            ? order.course?.price === 0
              ? "رایگان"
              : order.course?.price
            : "در حال بارگذاری..."}
        </p>
        <p>
          تاریخ شروع: {order ? order.course?.startDate : "در حال بارگذاری..."}
        </p>
        <p>
          تاریخ پایان: {order ? order.course?.endDate : "در حال بارگذاری..."}
        </p>
        <p>
          وضعیت دوره:{" "}
          {order
            ? order.course?.isActive
              ? "فعال"
              : "غیرفعال"
            : "در حال بارگذاری..."}
        </p>
        <p>
          تعداد دانشجویان:{" "}
          {order ? order.course?.studentsCount : "در حال بارگذاری..."}
        </p>
      </div>
    </div> 
  );
}

export default ViewOrder