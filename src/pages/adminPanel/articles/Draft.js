import React , { useState,useEffect } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Input from "../../../components/Form/Input";
import Select from "react-select";
import useForm from "../../../hooks/useForm";
import swal from "sweetalert";
import {
  requiredValidator,
  mainValueValidator,
  maxValueValidator,
} from "../../../validators/rules";
import Cookies from "js-cookie";
import Editor from '../../../components/Form/Editor';
import { useParams } from 'react-router-dom';


function Draft() {
  const { shortName } = useParams();
  const [article, setArticle] = useState({});
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
  useEffect(() => {
    getAllCategories();
    getArticle();
   
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
        `${process.env.REACT_APP_BACKEND_URL}/articles/draft`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.status === 200) {
        swal("مقاله با موفقیت افزوده شد", {
          icon: "success",
        }).then(() => {
          formInputs.inputs.title.value = "";
          formInputs.inputs.shortName.value = "";
          formInputs.inputs.description.value = "";
          setArticleCategory("");
          setArticleCover("");
          setArticleBody("");
      
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getArticle=async()=>{
    console.log(shortName);
    const token = Cookies.get("user");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/articles/${shortName}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      formInputs.inputs.shortName.value = data.shortName;
      formInputs.inputs.description.value = data.description;
      formInputs.inputs.title.value = data.title;
      setArticleCategory(
      categories.find((item) => item.value === data.categoryID) || null
    );
      setArticleCover(data.cover);
      setArticleBody(data.body);
      setArticle(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container className="my-5 p-5 shadow rounded">
      <h1 className="fw-bold fs-3 mb-3">افزودن مقاله</h1>
      <Row className="mb-3">
        <Col>
          <div className="d-flex  flex-column  flex-md-row justify-content-center align-items-center gap-3 mb-3">
            <div className="w-100">
              <h3 className="mb-3 ">عنوان</h3>
              <Input
                value={article?.title || ""}
                element="input"
                id="title"
                className="contact-form__username-input"
                type="text"
                validationsArray={[
                  requiredValidator(), // اجباری
                  mainValueValidator(8), // حداقل 3 کاراکتر
                  maxValueValidator(60), // حداکثر 20 کاراکتر
                ]}
                onChange={onChangeHandler}
              />
            </div>
            <div className="w-100">
              <h3 className="mb-3 ">لینک</h3>
              <Input
                value={article.shortName || ""}
                element="input"
                id="shortName"
                className="contact-form__username-input"
                type="text"
                validationsArray={[
                  requiredValidator(), // اجباری
                  mainValueValidator(8), // حداقل 3 کاراکتر
                  maxValueValidator(60), // حداکثر 20 کاراکتر
                ]}
                onChange={onChangeHandler}
              />
            </div>
          </div>

          <div className="mb-3">
            <h3 className="mb-3 ">چکیده</h3>
            <Input
              value={article?.description || ""}
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
                placeholder="لطفا دسته بندی را انتخاب نمایید"
                onChange={(selectedOption) =>
                  setArticleCategory(selectedOption)
                }
         
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
          <div className="d-flex justify-content-center">
            <button
              onClick={handleAddNewArticle}
              className="btn btn-primary py-3 px-5 fs-4 mt-4 "
            >
              افزودن
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  ); 
  
}

export default Draft