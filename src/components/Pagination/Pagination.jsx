import React, { useEffect } from "react";

import "./Pagination.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function Pagination({ items, setItems, pageSize , path }) {
  const { pageNumber } = useParams();
  const totalPages = Math.ceil(items.length / pageSize);
  useEffect(() => {
    const endIndex = pageNumber * pageSize;
    const startIndex = endIndex - pageSize;
    setItems(items.slice(startIndex, endIndex));
  }, [items, setItems, pageNumber, pageSize]);
  return (
    <div className="courses-pagination">
      <ul className="courses__pagination-list">
        {Array(totalPages)
          .fill(0)
          .map((_, index) => (
            <li
              className={`courses__pagination-link  ${
                index + 1 === Number(pageNumber)
                  ? "courses__pagination-link--active"
                  : ""
              }`}
              key={index}
            >
              <Link
                to={`/${path}/${index + 1}`}
                className="courses__pagination-link"
              >
                {index + 1}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
