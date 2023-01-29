import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../components/LayoutAdmin";
import { BiLeftArrow } from "react-icons/bi";
import { BiLeftArrowCircle, BiRightArrowCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiWithAuth } from "../../services/api";
import Loading from "../../components/Loading";
import { formatCurrency } from "../../utils/formatCurrency";
import InputReg from "../../components/inputReg";
import InputRegFile from "../../components/inputRegFile";
import { serviceSchema } from "../../validations/validations";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const EditService = () => {
  let [step, setStep] = useState(1);
  let [tags, setTags] = useState([]);
  const [service, setService] = useState();
  const location = useLocation();
  const id = location?.state?.id;
  const token = localStorage.getItem("userToken");
  const [img, setImg] = useState();
  const [city, setCity] = useState();
  const [listAdditional, setListAdditional] = useState("");
  const [additional, setAdditional] = useState("");
  const [additional2, setAdditional2] = useState("");
  const [additional3, setAdditional3] = useState("");
  const [count, setCount] = useState(1);
  const [allCity, setAllCity] = useState();
  const partnerId = localStorage.getItem("partner_id");
  const [idAdditional, setIdAdditional] = useState();
  const navigate = useNavigate();

  const getServiceById = async () => {
    apiWithAuth(
      `services/${parseInt(id)}`,
      `GET`,
      null,
      "application/json",
      token
    ).then((res) => {
      const data = res.data;
      setService(data);
      values.servicename = data.service_name;
      values.serviceprice = data.service_price;
      values.category = data.service_category;
      values.description = data.service_description;
      setTags(data.service_include.split(","));
      setCity(data.city);
      setImg(data.service_image_file);
    });
  };
  const onSubmit = async () => {
    const body = new FormData();
    body.append("service_name", values.servicename);
    body.append("service_included", tags);
    body.append("service_description", values.description);
    body.append("service_category", values.category);
    body.append("service_price", values.serviceprice);
    body.append("service_image_file", img);
    body.append("city", city);

    apiWithAuth(
      `services/${parseInt(id)}`,
      `PUT`,
      body,
      `multipart/form-data`,
      token
    )
      .then((res) => {
        Swal.fire({
          title: "Success Edit Service!",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#533e85",
          confirmButtonText: "Oke",
        });
        navigate("/partner/");
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${err.response.data.message}`,
          showConfirmButton: true,
        });
      });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        servicename: "",
        serviceprice: "",
        category: "",
        description: "",
      },
      validationSchema: serviceSchema,
      onSubmit,
    });
  const onAddTags = (e) => {
    if (e.key === "Enter") {
      setTags([...tags, e.target.value]);

      e.target.value = "";
    }
  };
  const chooseAdd = (choose, value) => {
    choose(listAdditional.filter((item) => item.id == value));
  };
  const removeTags = (index) => {
    setTags(tags.filter((t, i) => i !== index));
  };
  const getListAdditionals = async () => {
    apiWithAuth(`additionals`, `GET`, null, "application/json", token).then(
      (res) =>
        setListAdditional(
          res.data.filter((data) => data.partner_id == partnerId)
        )
    );
  };
  const getCity = () => {
    apiWithAuth(`city`, `GET`, null, "application/json", token).then((res) =>
      setAllCity(res.data)
    );
  };
  useEffect(() => {
    getListAdditionals();
    getCity();
    getServiceById();
  }, []);

  return (
    <>
      {service && listAdditional && allCity ? (
        <LayoutAdmin>
          <Link
            to="/partner/"
            className="text-bozz-one font-bold flex items-center mt-2"
          >
            <BiLeftArrow className="mx-2 text-xl font-bold" />
            Back To List
          </Link>
          <div className="flex justify-center pb-3">
            <div className="px-10 py-3 bg-bozz-seven rounded-[50px] w-[80%] h-full text-bozz-one border border-bozz-one shadow-[6px_6px_6px_rgba(83,62,133,0.5)]">
              <h1 className="text-lg font-semibold text-center uppercase ">
                Edit Service
              </h1>
              <div className="w-full flex justify-center">
                <ul className="steps w-20">
                  <li className={`flex items-center justify-end`}>
                    <div
                      className={`text-bozz-six text-xs w-2 h-2 flex justify-center items-center rounded-full p-4 bg-bozz-one`}
                    >
                      <span>1</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-between h-full">
                {/* step 1 */}
                {step === 1 && (
                  <div className="">
                    <p className="text-md font-bold">PACKAGE INFORMATION</p>
                    <InputReg
                      title="Service Name"
                      id="servicename"
                      placeholder="Service Package Wedding"
                      value={values.servicename}
                      check1={errors.servicename}
                      check2={touched.servicename}
                      change={handleChange}
                      blur={handleBlur}
                    />
                    <div className="flex gap-10">
                      <InputReg
                        title="Service Price"
                        id="serviceprice"
                        placeholder="Service Package Wedding"
                        value={values.serviceprice}
                        check1={errors.serviceprice}
                        check2={touched.serviceprice}
                        change={handleChange}
                        blur={handleBlur}
                        type="number"
                      />
                      <InputReg
                        title="Service Category"
                        id="category"
                        placeholder="Service Package Wedding"
                        value={values.category}
                        check1={errors.category}
                        check2={touched.category}
                        change={handleChange}
                        blur={handleBlur}
                      />
                    </div>
                    <div className="form-control w-full">
                      <label className="label mb-[-10px]">
                        <span className="label-text text-bozz-one">
                          Description
                        </span>
                      </label>
                      <textarea
                        value={values.description}
                        id="description"
                        placeholder="This service......"
                        className={`border rounded-lg h-14 resize-none focus:outline-none focus:ring-2 focus:ring-bozz-two text-xs p-3 ${
                          errors.description && touched.description
                            ? `border-red-700`
                            : `border-bozz-one`
                        } w-full bg-bozz-five caret-text-bozz-one text-bozz-one`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.description && touched.description ? (
                        <p className="text-xs text-red-700">
                          {errors.description}
                        </p>
                      ) : null}
                    </div>
                    <div className={`flex gap-10 my-5`}>
                      <InputRegFile
                        title="Service Image"
                        placeholder={"service image"}
                        change={(e) => setImg(e.target.files[0])}
                      />
                      <div className="form-control w-full">
                        <label className="label mb-[-10px]">
                          <span className="label-text text-bozz-one">City</span>
                        </label>
                        <select
                          className="bg-bozz-five border border-bozz-one text-xs text-bozz-one h-10 rounded-lg w-full"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        >
                          <option>Choose City</option>
                          {allCity &&
                            allCity.map((item, index) => {
                              return (
                                <option
                                  key={index}
                                  value={item.city_name}
                                  className="text-xs"
                                >
                                  {item.city_name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>

                    <div className="">
                      <p className="text-bozz-one text-xs ">
                        Included Services
                      </p>
                      <div className="bg-bozz-six border border-bozz-one w-full h-10 pl-5 mt-3 rounded-lg flex gap-2 text-xs items-center">
                        {tags.map((tag, index) => {
                          return (
                            <p
                              className="h-5 text-center px-3 bg-bozz-one text-white rounded-lg flex gap-2  items-center"
                              key={index}
                            >
                              <span>{tag}</span>
                              <IoClose
                                onClick={() => removeTags(index)}
                                className="text-white"
                              />
                            </p>
                          );
                        })}
                        <input
                          type={"text"}
                          onKeyUp={(e) => onAddTags(e)}
                          className="bg-bozz-six focus:outline-none h-full focuse:border-none"
                          placeholder='type and enter here what"s include in your service'
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center mt-3 bottom-0">
                  <button
                    className={`flex items-center justify-center h-8 w-24 text-center bg-bozz-one text-white rounded-lg text-xs`}
                    onClick={() => onSubmit()}
                  >
                    Edit Service
                  </button>
                  {/* } */}
                </div>
              </div>
            </div>
          </div>
        </LayoutAdmin>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EditService;
