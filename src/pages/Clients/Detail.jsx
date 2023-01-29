import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Ceklist from "../../assets/Vector.png";
import Plus from "../../assets/plus.png";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { formatCurrency } from "../../utils/formatCurrency";
import Art from "../../assets/art.png";
import Profile from "../../assets/profile.png";
import { askSchema } from "../../validations/validations";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { apiRequest, apiWithAuth } from "../../services/api";
import axios from "axios";
import { AiTwotoneStar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";

const Detail = () => {
  const [serviceId, setServiceId] = useState();
  const [additional, setAdditional] = useState();
  const [discussions, setDiscussion] = useState();
  const [detail, setDetail] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [available, setAvailable] = useState(false);
  const [included, setIncluded] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  const location = useLocation();
  const id = location?.state?.id;
  const [company, setCompany] = useState();
  const [reviews, setReviews] = useState();
  const [listClients, setListClients] = useState();

  const getDataId = async () => {
    await axios
      .get(`https://irisminty.my.id/services/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setServiceId(data);
        setCompany(data.partner);
        setIncluded(data.service_included.split(","));
      })
      .catch((err) => {});
  };

  const getAdditional = async () => {
    await axios
      .get(`https://irisminty.my.id/services/${id}/additionals`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        const dataAdditional = res.data.data;
        setAdditional(dataAdditional);
      })
      .catch((err) => {});
  };

  const getDiscussion = async () => {
    await axios
      .get(`https://irisminty.my.id/services/${id}/discussions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        const dataDiscussion = res.data.data;
        setDiscussion(dataDiscussion);
      })
      .catch((err) => {});
  };

  const getReview = async () => {
    apiRequest(`reviews`, `GET`, null).then((res) =>
      setReviews(res.data.filter((item) => item.service_id == id))
    );
  };
  const getClient = async () => {
    apiWithAuth(`clients`, `GET`, null, "application/json", token).then((res) =>
      setListClients(res.data)
    );
  };
  const onSubmit = () => {
    if (values.ask.length >= 10) {
      const body = {
        comment: values.ask,
        partner_id: parseInt(serviceId.partner.id),
        client_id: parseInt(localStorage.getItem("idclient")),
        service_id: parseInt(serviceId.id),
      };
      apiWithAuth(`discussions`, `POST`, body, "application/json", token)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Question Send, wait for answer",
            showConfirmButton: true,
            timer: 1500,
          });
          navigate(0);
          getDiscussion();
          values.ask = "";
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            text: "Question Not Send, Try Again",
            showConfirmButton: true,
            timer: 1500,
          });
        });
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        ask: "",
      },
      validationSchema: askSchema,
      onSubmit,
    });

  const onCheck = async () => {
    apiWithAuth(
      `services/${parseInt(
        id
      )}/availability?start_date=${startDate}&end_date=${endDate}`,
      `POST`,
      null,
      "application/json",
      token
    )
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Date Available",
          showConfirmButton: true,
          timer: 1500,
        });
        setAvailable(true);
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          text: "Date Not Available",
          showConfirmButton: true,
          timer: 1500,
        });
        setAvailable(false);
      });
  };

  const onOrder = () => [
    navigate("/orderuser", {
      state: {
        startDate: startDate,
        endDate: endDate,
        additional: additional,
        serviceId: serviceId,
      },
    }),
  ];
  useEffect(() => {
    getDiscussion();
    getDataId();
    getAdditional();
    getReview();
    getClient();
  }, []);

  return (
    <>
      {serviceId ? (
        <div className="bg-bozz-six text-bozz-one">
          <Navbar />
          <div className="container px-20 py-20 mx-auto">
            <div className="grid gap-10 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
              <img
                className="mx-auto h-[320px] rounded-md border-2 border-bozz-one"
                src={serviceId.service_image_file}
                alt="home"
                width={500}
              />
              <div className="mx-auto text-bozz-one">
                <p className="py-3 px-3 font-bold text-2xl">
                  {serviceId.service_name}
                </p>
                <p
                  className="px-3 font-bold text-lg hover:underline"
                  onClick={() =>
                    navigate("/profilepartner", { state: { id: company.id } })
                  }
                >
                  {company.company_name.slice(0, 20)}
                </p>
                <p className="px-3 font-bold text-lg flex gap-2 my-2">
                  <IoLocationSharp className="text-red-500" />
                  {company.company_city}
                </p>
                <p className="py-3 px-3 font-bold text-xl text-bozz-two">
                  {formatCurrency(serviceId.service_price)}
                </p>
                <p className=" px-3 text-lg text-[#726F6F]">
                  Category {serviceId.service_category}
                </p>
                <p className=" px-3 text-lg text-[#726F6F] flex">
                  <AiFillStar className="text-2xl text-orange-300" />{" "}
                  {serviceId.average_rating} Ratings
                </p>
              </div>
            </div>
            <div className="px-20 py-20 grid gap-10 grid-cols1 lg:grid-cols-2">
              <div className="">
                <h1 className="text-center text-4xl">Description</h1>
                <p className="py-10">{serviceId.service_description}</p>
              </div>
              <div className="mx-auto">
                <h1 className="text-center text-4xl">Included Service</h1>
                <div className="mt-5">
                  {included && included.length > 1 ? (
                    included?.map((item, i) => {
                      return (
                        <div key={i} className="py-3 flex uppercase">
                          <img src={Ceklist} width={20} />
                          <span className="ml-5">{item}</span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="font-semibold">
                      Nothing Included, ask Partner for detail included
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:px-20 px-8 py-20 grid gap-10 grid-cols-1 lg:grid-cols-2">
              <div className="">
                <h1 className="text-center text-4xl">Additional</h1>
                <div className="mt-5">
                  {additional ? (
                    additional.map((item, i) => {
                      return (
                        <div className="py-3 flex" key={i}>
                          <img src={Plus} width={20} />
                          <span className="ml-5">
                            {item.additional_name} -{" "}
                            {formatCurrency(item.additional_price)}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end md:mx-10 mx-6 py-5">
                <div className="card md:w-96 w-48 h-full p-5 border-2 border-bozz-one flex flex-col">
                  <h1 className="text-center text-2xl font-semibold">
                    Check Availability Date
                  </h1>
                  <div className="flex justify-betweenw-full my-3 h-12 mb-10">
                    <div className="w-[50%]">
                      <p>Start Date</p>
                      <input
                        type="date"
                        placeholder="stardate"
                        name="stardate"
                        id="stardate"
                        className="bg-white text-bozz-one border-2 border-bozz-one w-full"
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="w-[50%]">
                      <p>End Date</p>
                      <input
                        type="date"
                        name="enddate"
                        id="enddate"
                        className="bg-white border-2 text-bozz-one date:text-bozz-one border-bozz-one w-full"
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    className={`bg-bozz-one text-white h-11 rounded-lg ${
                      available ? `hidden` : `block`
                    }`}
                    onClick={() => onCheck()}
                  >
                    Check Validate
                  </button>
                  <button
                    className={`bg-bozz-one text-white h-11 rounded-lg ${
                      available ? `block` : `hidden`
                    }`}
                    onClick={() => onOrder()}
                  >
                    Order Now
                  </button>
                  <p
                    className={`text-center mt-5 text-bozz-one h-11 rounded-lg ${
                      available ? `block` : `hidden`
                    }`}
                    onClick={() => setAvailable(true)}
                  >
                    {" "}
                    Check Other Date
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold text-bozz-one mb-3">
                Review Dan Rating
              </p>
              {reviews && reviews.length >= 1 ? (
                reviews?.map((item, i) => {
                  let clientName = "";
                  let image = "";
                  let clientCity = "";
                  listClients?.map((data) => {
                    if (data.id == item.client_id) {
                      clientName = data.name;
                      image = data.client_image_file;
                      clientCity = data.city;
                    }
                  });
                  return (
                    <div className="px-10 py-10 border rounded-lg my-5" key={i}>
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="px-2">
                          <div className="flex">
                            <img
                              src={image || Profile}
                              className="w-12 h-12 rounded-full border border-bozz-one mr-5"
                            />
                            <div className="flex flex-col">
                              <p className="text-xl font-semibold">
                                {clientName}
                              </p>
                              <p className="text-lg font-semibold capitalize">
                                {clientCity}
                              </p>
                            </div>
                          </div>
                          <p className="flex text-lg font-semibold items-center">
                            {" "}
                            <AiTwotoneStar className="text-orange-500 mr-1" />
                            {item.rating} Rating
                          </p>
                          <p>{item.review}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>Belum Ada review</p>
              )}
            </div>
            <hr />
            <div className="py-10 px-10 w-full">
              <p className="text-2xl text-[#023372]">
                Tuliskan pertanyaanmu dibawah sini
              </p>
              <textarea
                value={values.ask}
                id="ask"
                type="text"
                className={`textarea border ${
                  errors.email && touched.email
                    ? `border-red-700`
                    : `border-bozz-one`
                } caret-text-bozz-one p-3 w-full h-24 resize-none bg-bozz-six text-bozz-one`}
                placeholder="Tuliskan pertanyaan"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="flex justify-center">
                <button
                  className="btn bg-bozz-one w-min"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
            <div>
              {discussions && discussions.length >= 1 ? (
                discussions.map((item, i) => {
                  return (
                    <div className="px-10 py-10 border rounded-lg my-5" key={i}>
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="px-2">
                          <div className="flex">
                            <img
                              src={Art}
                              className="w-12 h-12 rounded-full border border-bozz-one"
                            />
                            <p className="px-4 text-2xl font-semibold">
                              Username
                              <br />
                              <span className="text-[#726F6F] text-lg">
                                {item.created_at
                                  .slice(0, 18)
                                  .split("T")
                                  .join(" ")}
                              </span>
                            </p>
                          </div>
                          <p>{item.comment}</p>
                          <a className="py-3 cursor-pointer">Balas</a>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="px-10">Belum ada Diskusi</p>
              )}
              <a className="flex  justify-center text-center cursor-pointer py-10">
                Lihat lebih banyak
              </a>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Detail;
