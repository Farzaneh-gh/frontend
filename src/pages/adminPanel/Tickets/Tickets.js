import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import swal from "sweetalert";
import { Container } from "react-bootstrap";
export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/tickets`, {
      headers: {
        Authorization: `Bearer ${
         Cookies.get("user") 
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTickets(data);
      });
  }, []);

  const showTicketBody = (body) => {
    swal({
      title: body,
      buttons: "اوکی",
    });
  };

  const setAnswerToTicket = (ticketID) => {
    swal({
      title: "لطفا پاسخ مورد نظر را وارد کنید:",
      content: "input",
      buttons: "ثبت پاسخ",
    }).then((value) => {
      if (value) {
        const ticketAnswerInfos = {
          ticketID,
          body: value,
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/tickets/answer`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("user")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticketAnswerInfos),
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "پاسخ مورد نظر با موفقیت ثبت شد",
              icon: "success",
              buttons: "خیلی هم عالی",
            });
          }
        });
      }
    });
  };

  return (
    
      <Container className="my-5 shadow p-3">
        <h1>لیست دوره‌ها</h1>
        <div className="table-responsive  mt-3">
          <table className="table table-striped text-center">
            <thead className="table-dark table-header">
              <tr>
                <th>شناسه</th>
                <th>کاربر</th>
                <th>عنوان</th>
                <th>نوع تیکت</th>
                <th>دوره</th>
                <th>اولویت</th>
                <th>مشاهده</th>
                <th>پاسخ</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => (
                <tr key={ticket._id}>
                  <td>{index + 1}</td>
                  <td>{ticket.user}</td>
                  <td>{ticket.title}</td>
                  <td>{ticket.departmentSubID}</td>
                  <td>{ticket.course ? ticket.course : "---"}</td>
                  <td>
                    {ticket.priority === 1 && "بالا"}
                    {ticket.priority === 2 && "متوسط"}
                    {ticket.priority === 3 && "کم"}
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary edit-btn"
                      onClick={() => showTicketBody(ticket.body)}
                    >
                      مشاهده
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary edit-btn"
                      onClick={() => setAnswerToTicket(ticket._id)}
                    >
                      پاسخ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    
  );
}
