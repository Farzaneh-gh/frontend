import React, { useEffect, useState } from "react";

import Editor from "../../../components/Form/Editor";
import { Container, Row, Col } from "react-bootstrap";
import Input from "../../../components/Form/Input";
import Select from "react-select";
import useForm from "../../../hooks/useForm";
import swal from "sweetalert";
import {
  requiredValidator,
  mainValueValidator,
} from "../../../validators/rules";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
function Articles() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [articleCategory, setArticleCategory] = useState([]);
  const [articleCover, setArticleCover] = useState({});
  const [articleBody, setArticleBody] = useState("");
  const [formInputs, onChangeHandler] = useForm({
    inputs: {
      title: {
        value: "",
        id: "title",
        isValid: false,
      },
      shortName: {
        value: "",
        id: "shortName",
        isValid: false,
      },
      description: {
        value: "",
        id: "description",
        isValid: false,
      },
    },
    formIsValid: false,
  });

  const getAllCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/category`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();

      setCategories(
        data.map((item) => ({ value: item._id, label: item.title }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  function getAllArticles() {
    fetch("http://localhost:4001/v1/articles")
      .then((res) => res.json())
      .then((allArticles) => {
        console.log(allArticles);
        setArticles(allArticles);
      });
  }

  const saveArticleAsDraft = (event) => {
    const token = Cookies.get("user");

    let formData = new FormData();

    formData.append("title", formInputs.inputs.title.value);
    formData.append("shortName", formInputs.inputs.shortName.value);
    formData.append("description", formInputs.inputs.description.value);
    formData.append("categoryID", articleCategory.value);
    formData.append("cover", articleCover);
    formData.append("body", articleBody);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/articles/draft`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "مقاله جدید با موفقیت پیش نویس شد",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          getAllArticles();
        });
      }
    });
  };
  useEffect(() => {
    getAllCategories();
    getAllArticles();
  }, []);

  const handleAddNewArticle = async () => {
    const formData = new FormData();
    const token = Cookies.get("user");
    formData.append("title", formInputs.inputs.title.value);
    formData.append("shortName", formInputs.inputs.shortName.value);
    formData.append("description", formInputs.inputs.description.value);
    formData.append("categoryID", articleCategory.value);
    formData.append("cover", articleCover);
    formData.append("body", articleBody);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/articles`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.status === 201) {
        swal("مقاله با موفقیت افزوده شد", {
          icon: "success",
        }).then(() => {
          formInputs.inputs.title.value = "";
          formInputs.inputs.shortName.value = "";
          formInputs.inputs.description.value = "";
          setArticleCategory("");
          setArticleCover("");
          setArticleBody("");
          getAllArticles();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteArticle = (id) => {
    swal({
      title: "آیا میخواهید مقاله را حذف کنید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then(async(willDelete) => {
      if (willDelete) {
        const token = Cookies.get("user");
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/articles/${id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            swal("مقاله با موفقیت حذف شد", {
              icon: "success",
            }).then(() => {
              getAllArticles();
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    })
    
  };
  return (
    <>
      <Container className="my-5 p-5 shadow rounded">
        <h1 className="fw-bold fs-3 mb-3">افزودن مقاله</h1>
        <Row className="mb-3">
          <Col>
            <div className="d-flex  flex-column  flex-md-row justify-content-center align-items-center gap-3 mb-3">
              <div className="w-100">
                <h3 className="mb-3 ">عنوان</h3>
                <Input
                  element="input"
                  id="title"
                  className="contact-form__username-input"
                  type="text"
                  validationsArray={[
                    requiredValidator(), // اجباری
                    mainValueValidator(8), // حداقل 3 کاراکتر
                  ]}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="w-100">
                <h3 className="mb-3 ">لینک</h3>
                <Input
                  element="input"
                  id="shortName"
                  className="contact-form__username-input"
                  type="text"
                  validationsArray={[
                    requiredValidator(), // اجباری
                    mainValueValidator(8), // حداقل 3 کاراکتر
                  ]}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <div className="mb-3">
              <h3 className="mb-3 ">چکیده</h3>
              <Input
                element="textarea"
                id="description"
                className="contact-form__username-input"
                type="text"
                rows="5"
                validationsArray={[
                  requiredValidator(), // اجباری
                  mainValueValidator(8), // حداقل 3 کاراکتر
                ]}
                onChange={onChangeHandler}
              />
            </div>

            <div className="mb-3">
              <h3 className="mb-3 ">محتوا</h3>
              <Editor value={articleBody} setValue={setArticleBody} />
            </div>
            <div className="d-flex  flex-column  flex-md-row justify-content-center align-items-center gap-3">
              <div className="w-100">
                <label for="formFile" className="form-label mb-3">
                  انتخاب کاور مقاله
                </label>
                <input
                  className="form-control  "
                  style={{ padding: "12px" }}
                  type="file"
                  id="formFile"
                  onChange={(e) => setArticleCover(e.target.files[0])}
                />
              </div>

              <div className="w-100">
                <h3 className="mb-3 ">دسته بندی</h3>
                <Select
                  value={articleCategory}
                  options={categories}
                  onChange={(selectedOption) =>
                    setArticleCategory(selectedOption)
                  }
                  placeholder="لطفا دسته بندی را انتخاب نمایید"
                  isSearchable
                  styles={{
                    control: (base) => ({
                      ...base,
                      padding: "1px",
                      fontSize: "14px",
                      direction: "rtl",
                    }),
                  }}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center gap-3">
              <button
                onClick={handleAddNewArticle}
                className="btn btn-primary py-3 px-5 fs-4 mt-4 "
              >
                افزودن
              </button>
              <button
                onClick={saveArticleAsDraft}
                className="btn btn-primary py-3 px-5 fs-4 mt-4 "
              >
                پیش‌ نویس
              </button>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="my-5 shadow p-3">
        <h1>لیست دوره‌ها</h1>
        <div className="table-responsive  mt-3">
          <table className="table table-striped text-center">
            <thead className="table-dark table-header">
              <tr>
                <th>شناسه</th>
                <th>عنوان</th>
                <th>لینک</th>
                <th>نویسنده</th>
                <th>وضعیت</th>
                <th>مشاهده</th>
                <th>ویرایش</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody className="fs-4">
              {articles.map((article, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{article.title}</td>
                  <td>{article.shortName}</td>

                  <td>{article.creator.name}</td>
                  <td>{article.publish === 1 ? "منتشر شده" : "پیش‌نویس"}</td>
                  <td>
                    {article.publish === 1 ? (
                      <i className="fa fa-check"></i>
                    ) : (
                      <Link
                        to={`draft/${article.shortName}`}
                        className="btn btn-primary edit-btn"
                      >
                        ادامه نوشتن
                      </Link>
                    )}
                  </td>
                  <td>
                    <button type="button" className="btn btn-primary edit-btn">
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger delete-btn" onClick={() => handleDeleteArticle(article._id)}>
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
}

export default Articles;
