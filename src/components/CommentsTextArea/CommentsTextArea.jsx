import React from "react";

import "./CommentsTextArea.css";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { useContext } from "react";
import Cookies from "js-cookie";
import swal from "sweetalert";

export default function CommentsTextArea({ comments=[], courseShortName="" }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [commentText, setCommentText] = React.useState("");
  const [score, setScore] = React.useState(0);
  const submitComment = () => {
    try {
      const token = Cookies.get("user");
      fetch(`${process.env.REACT_APP_BACKEND_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          body: commentText,
          courseShortName,
          score,
        }),
      }).then((response) => {
        if (response.status === 201) {
          swal({
            title: "کامنت شما با موفقیت ثبت شد",
            icon: "success",
            confirmButtonText: "باشه",
          }).then(() => {
            setCommentText("");
            setScore(0);
            window.location.reload();
          });
        }
      });
    } catch (error) {
      swal({
        title: "خطا در ثبت کامنت",
        text: "لطفا دوباره تلاش کنید.",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };
  return (
    <div className="comments">
      <div className="comments__header">
        <div className="comments__header-icon-content">
          <i className="comments__header-icon far fa-comment"></i>
        </div>
        <span className="comments__header-title">نظرات</span>
      </div>
      <div className="comments__content">
        {comments.length === 0 ? (
          <div className="alert alert-warning">
            هنوز کامنتی برای این دوره ثبت نشده
          </div>
        ) : (
          <>
            {comments.map((comment, index) => (
              <>
                <div className="comments__item" key={index}>
                  <div className="comments__question">
                    <div className="comments__question-header">
                      <div className="comments__question-header-right">
                        <span className="comments__question-name comment-name">
                          {comment.creator
                            ? comment.creator.name
                            : "کاربر ناشناس"}
                        </span>
                        <span className="comments__question-status comment-status">
                          {comment.creator
                            ? comment.creator.role === "ADMIN"
                              ? "مدیر"
                              : "کاربر"
                            : "کاربر ناشناس"}
                        </span>
                        <span className="comments__question-date comment-date">
                          {comment.createdAt.slice(0, 10)}
                        </span>
                      </div>
                      <div className="comments__question-header-left">
                        <Link
                          className="comments__question-header-link comment-link"
                          to="#"
                        >
                          پاسخ
                        </Link>
                      </div>
                    </div>
                    <div className="comments__question-text">
                      <p className="comments__question-paragraph comment-paragraph">
                        {comment.body}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
            <div className="comments__pagantion">
              <ul className="comments__pagantion-list">
                <li className="comments__pagantion-item">
                  <Link to="#" className="comments__pagantion-link">
                    <i className="fas fa-long-arrow-alt-right comments__pagantion-icon"></i>
                  </Link>
                </li>
                <li className="comments__pagantion-item">
                  <Link to="#" className="comments__pagantion-link">
                    1
                  </Link>
                </li>
                <li className="comments__pagantion-item">
                  <Link to="#" className="comments__pagantion-link">
                    2
                  </Link>
                </li>
                <li className="comments__pagantion-item">
                  <Link
                    to="#"
                    className="comments__pagantion-link comments__pagantion-link--active"
                  >
                    3
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      <div className="comments__rules">
        <span className="comments__rules-title">قوانین ثبت دیدگاه</span>
        <span className="comments__rules-item">
          <i className="fas fa-check comments__rules-icon"></i>
          اگر نیاز به پشتیبانی دوره دارید از قسمت پرسش سوال در قسمت نمایش انلاین
          استفاده نمایید و سوالات مربوط به رفع اشکال تایید نخواهند شد
        </span>
        <span className="comments__rules-item">
          <i className="fas fa-check comments__rules-icon"></i>
          دیدگاه های نامرتبط به دوره تایید نخواهد شد.
        </span>
        <span className="comments__rules-item">
          <i className="fas fa-check comments__rules-icon"></i>
          سوالات مرتبط با رفع اشکال در این بخش تایید نخواهد شد.
        </span>
        <span className="comments__rules-item">
          <i className="fas fa-check comments__rules-icon"></i>
          از درج دیدگاه های تکراری پرهیز نمایید.
        </span>
      </div>
      {isLoggedIn ? (
        <div className="comments__respond">
          <div className="comments__score">
            <span className="comments__score-title">امتیاز شما</span>
            <div>
              <select
                value={score}
                className="w-100 comments__score-input-select"
                onChange={(e) => setScore(e.target.value)}
              >
                <option value="0">انتخاب امتیاز</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="comments__respond-content">
            <div className="comments__respond-title">دیدگاه شما *</div>
            <textarea
              className="comments__score-input-respond"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="comments__respond-btn"
            onClick={submitComment}
          >
            ارسال
          </button>
        </div>
      ) : (
        <div className="alert alert-info mt-3">
          برای ثبت دیدگاه ابتدا باید وارد حساب کاربری خود شوید.
          <Link to="/login" className="alert-link p-3">
            ورود به حساب کاربری
          </Link>
        </div>
      )}
    </div>
  );
}
