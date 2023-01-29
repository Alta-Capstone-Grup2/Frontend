import React, { useState } from "react";
import Background from "../../assets/shoes.jpg";
import { registerPartnerSchema } from "../../validations/validations";
import InputReg from "../../components/inputReg";
import { useFormik } from "formik";
import InputRegFile from "../../components/inputRegFile";
import InputRegPwd from "../../components/inputRegPwd";
import { apiRequest } from "../../services/api";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

function RegisterPartner() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [siupImg, setSiupImg] = useState("");
  const [nibImg, setNibImg] = useState("");
  const allCity = JSON.parse(localStorage.getItem("city"));
  const [eventImg1, setEventImg1] = useState("");
  const [eventImg2, setEventImg2] = useState("");
  const [eventImg3, setEventImg3] = useState("");
  const navigate = useNavigate();

  const [steps, setSteps] = useState([
    { key: "firstStep", isDone: true, component: 1 },
    { key: "secondStep", isDone: false, component: 2 },
    { key: "thirdStep", isDone: false, component: 3 },
    { key: "finalStep", isDone: false, component: 4 },
  ]);

  const [activeStep, setActiveStep] = useState(steps[0]);
  const onSubmit = async () => {
    setLoading(true);
    const body = new FormData();
    body.append("name", values.picname);
    body.append("email", values.picemail);
    body.append("password", values.password);
    body.append("pic_position", values.picposition);
    body.append("pic_phone", values.picphone);
    body.append("pic_address", values.picaddress);
    body.append("company_name", values.companyname);
    body.append("company_phone", values.companyphone);
    body.append("company_city", values.companycity);
    body.append("company_image_file", image);
    body.append("company_address", values.companyaddress);
    body.append("link_website", values.linkwebsite);
    body.append("nib_number", values.nib);
    body.append("nib_image_file", nibImg);
    body.append("siup_number", values.siup);
    body.append("siup_image_file", siupImg);
    body.append("event1_name", values.event1);
    body.append("event1_image_file", eventImg1);
    body.append("event2_name", values.event2);
    body.append("event2_image_file", eventImg2);
    body.append("event3_name", values.event3);
    body.append("event3_image_file", eventImg3);
    body.append("bank_name", values.bankname);
    body.append("bank_account_number", values.banknumber);
    body.append("bank_account_name", values.bankaccountname);

    apiRequest(`partners`, `POST`, body, `multipart/form-data`)
      .then((res) => {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register Successfull, Let's Login...",
          showConfirmButton: true,
        });
        navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
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
        companyname: "",
        companyemail: "",
        companyphone: "",
        picname: "",
        picposition: "",
        picphone: "",
        picemail: "",
        picaddress: "",
        companycity: "",
        companyaddress: "",
        linkwebsite: "",
        nib: "",
        siup: "",
        event1: "",
        event2: "",
        event3: "",
        bankname: "",
        bankaccountname: "",
        banknumber: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerPartnerSchema,
      onSubmit,
    });

  const handleNext = () => {
    if (steps[steps.length - 1].key === activeStep.key) {
      onSubmit();
      return;
    }

    const index = steps.findIndex((x) => x.key === activeStep.key);
    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key === activeStep.key) x.isDone = true;
        return x;
      })
    );
    setActiveStep(steps[index + 1]);
  };

  const handleBack = () => {
    const index = steps.findIndex((x) => x.key === activeStep.key);
    if (index === 0) return;

    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key === activeStep.key) x.isDone = false;
        return x;
      })
    );
    setActiveStep(steps[index - 1]);
  };

  return (
    <div className={`md:h-screen h-full w-screen relative`}>
      <img
        src={Background}
        className="w-full md:h-full min-h-screen object-fill relative"
      />
      <div className="absolute top-0 lg:px-32 px-12 py-3 w-[100%] h-full flex justify-center">
        <div className="card rounded-[50px] w-[80%] bg-bozz-five px-12 py-5 h-full shadow-[6px_6px_6px_rgba(83,62,133,0.5)]">
          <h1 className="text-center font-bold text-3xl text-bozz-one mb-3">
            REGISTER
          </h1>
          <div className="flex justify-start lg:ml-[-100px]">
            <ul className="steps w-[90%]">
              {steps.map((step, i) => {
                return (
                  <li key={i} className={`flex items-center justify-end`}>
                    <div
                      className={`h-1 w-full ${
                        activeStep.key === step.key || step.isDone
                          ? "bg-bozz-one"
                          : "bg-bozz-four"
                      } ${i + 1 !== 1 ? `block` : `hidden`}`}
                      value="100"
                      max="100"
                    ></div>
                    <div
                      className={`text-bozz-six text-xs h-3 w-3 lg:text-lg lg:w-5 lg:h-5 flex justify-center items-center rounded-full p-5 ${
                        activeStep.key === step.key || step.isDone
                          ? "bg-bozz-one"
                          : "bg-bozz-four"
                      }`}
                    >
                      <span>{i + 1}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col justify-between h-full ">
            <div className="step-component">
              {activeStep.component === 1 && (
                <div className="w-full">
                  <h1 className="text-xl font-semibold text-bozz-one">
                    COMPANY INFORMATION
                  </h1>
                  <div className="flex justify-between  gap-5">
                    <InputReg
                      title="Company Name"
                      id="companyname"
                      placeholder="Company Star 227"
                      value={values.companyname}
                      check1={errors.companyname}
                      check2={touched.companyname}
                      change={handleChange}
                      blur={handleBlur}
                    />
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between gap-5">
                    <InputReg
                      title="Company Phone"
                      id="companyphone"
                      placeholder="089123456"
                      value={values.companyphone}
                      check1={errors.companyphone}
                      check2={touched.companyphone}
                      change={handleChange}
                      blur={handleBlur}
                    />
                    <div className="form-control mt-1 w-full">
                      <p className="label-text text-bozz-one">City</p>
                      <select
                        className="bg-bozz-five border border-bozz-one text-xs text-bozz-one h-10 rounded-lg w-full"
                        id="companycity"
                        value={values.companycity}
                        onChange={handleChange}
                      >
                        <option>Choose City</option>
                        {allCity &&
                          allCity?.map((item, index) => {
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
                  <div className="form-control w-full">
                    <label className="label mb-[-10px]">
                      <span className="label-text text-bozz-one capitalize">
                        Profile Image
                      </span>
                    </label>
                    <input
                      type="file"
                      id="file"
                      placeholder="Input image"
                      className={`border rounded-lg h-8 border-bozz-one focus:outline-none focus:ring-2 focus:ring-bozz-two text-xs px-3 w-full bg-bozz-five caret-text-bozz-one text-bozz-one file:bg-bozz-one file:h-full rounded-none px-0`}
                      onChange={(e) => setImage(e.target.files[0])}
                      required
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label mb-[-10px]">
                      <span className="label-text text-bozz-one">
                        Company Address
                      </span>
                    </label>
                    <textarea
                      value={values.companyaddress}
                      id="companyaddress"
                      placeholder="Company Address"
                      className={`border rounded-lg h-14 resize-none focus:outline-none focus:ring-2 focus:ring-bozz-two text-xs p-3 ${
                        errors.companyaddress && touched.companyaddress
                          ? `border-red-700`
                          : `border-bozz-one`
                      } w-full bg-bozz-five caret-text-bozz-one text-bozz-one`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.companyaddress && touched.companyaddress ? (
                      <p className="text-xs text-red-700">
                        {errors.companyaddress}
                      </p>
                    ) : null}
                  </div>
                  <InputReg
                    title="Link Website"
                    id="linkwebsite"
                    placeholder="http://linkwebsiteku.com"
                    value={values.linkwebsite}
                    check1={errors.linkwebsite}
                    check2={touched.linkwebsite}
                    change={handleChange}
                    blur={handleBlur}
                  />
                </div>
              )}

              {activeStep.component === 2 && (
                <div className="w-full mt-3">
                  <h1 className="text-xl font-semibold text-bozz-one">
                    PIC INFORMATION
                  </h1>
                  <div className="flex justify-between  gap-5">
                    <InputReg
                      title="Pic Position"
                      id="picposition"
                      placeholder="manager"
                      value={values.picposition}
                      check1={errors.picposition}
                      check2={touched.picposition}
                      change={handleChange}
                      blur={handleBlur}
                    />
                  </div>
                  <div className="flex justify-between  gap-5">
                    <InputReg
                      title="Pic Phone"
                      id="picphone"
                      placeholder="08912345678"
                      value={values.picphone}
                      check1={errors.picphone}
                      check2={touched.picphone}
                      change={handleChange}
                      blur={handleBlur}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label mb-[-10px]">
                      <span className="label-text text-bozz-one">
                        PIC Address
                      </span>
                    </label>
                    <textarea
                      value={values.picaddress}
                      id="picaddress"
                      placeholder="Company Address"
                      className={`border rounded-lg h-14 resize-none focus:outline-none focus:ring-2 focus:ring-bozz-two text-xs p-3 ${
                        errors.picaddress && touched.picaddress
                          ? `border-red-700`
                          : `border-bozz-one`
                      } w-full bg-bozz-five caret-text-bozz-one text-bozz-one`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.picaddress && touched.picaddress ? (
                      <p className="text-xs text-red-700">
                        {errors.picaddress}
                      </p>
                    ) : null}
                  </div>
                </div>
              )}

              {activeStep.component === 3 && (
                <div className="w-full mt-3">
                  <h1 className="text-xl font-semibold text-bozz-one">
                    DOCUMENTS
                  </h1>
                  <div className="flex justify-between flex-col md:flex-row md:gap-5 gap-1">
                    <InputReg
                      title="nib"
                      id="nib"
                      placeholder="nib123"
                      value={values.nib}
                      check1={errors.nib}
                      check2={touched.nib}
                      change={handleChange}
                      blur={handleBlur}
                    />
                    <InputRegFile
                      title="scan nib"
                      placeholder={"input nib"}
                      change={(e) => setNibImg(e.target.files[0])}
                    />
                  </div>
                  <div className="flex justify-between flex-col md:flex-row md:gap-5 gap-1">
                    <InputReg
                      title="siup"
                      id="siup"
                      placeholder="siup123"
                      value={values.siup}
                      check1={errors.siup}
                      check2={touched.siup}
                      change={handleChange}
                      blur={handleBlur}
                    />
                    <InputRegFile
                      title="scan siup"
                      placeholder={"input siup"}
                      change={(e) => setSiupImg(e.target.files[0])}
                    />
                  </div>
                  <h1 className="text-xl font-semibold text-bozz-one">
                    EVENTS
                  </h1>
                  <div className="flex justify-between flex-col md:flex-row md:gap-5 gap-1">
                    <InputReg
                      title="Event 1"
                      id="event1"
                      placeholder="event1123"
                      value={values.event1}
                      check1={errors.event1}
                      check2={touched.event1}
                      change={handleChange}
                      blur={handleBlur}
                    />
                    <InputRegFile
                      title="event 1 Image"
                      placeholder={"input image"}
                      change={(e) => setEventImg1(e.target.files[0])}
                    />
                  </div>
                  <div className="flex justify-between flex-col md:flex-row  md:gap-5 gap-1">
                    <InputReg
                      title="Event 2"
                      id="event2"
                      placeholder="event2123"
                      value={values.event2}
                      check1={errors.event2}
                      check2={touched.event2}
                      change={handleChange}
                      blur={handleBlur}
                    />
                    <InputRegFile
                      title="event 2 image"
                      placeholder={"input image"}
                      change={(e) => setEventImg2(e.target.files[0])}
                    />
                  </div>
                  <div className="flex justify-between flex-col md:flex-row md:gap-5 gap-1">
                    <InputReg
                      title="event 3"
                      id="event3"
                      placeholder="event3123"
                      value={values.event3}
                      check1={errors.event3}
                      check2={touched.event3}
                      change={handleChange}
                      blur={handleBlur}
                    />
                    <InputRegFile
                      title="event 3 image"
                      placeholder={"input image"}
                      change={(e) => setEventImg3(e.target.files[0])}
                    />
                  </div>
                </div>
              )}

              {activeStep.component === 4 && (
                <div className="w-full mt-3">
                  <h1 className="text-xl font-semibold text-bozz-one">
                    BANK ACCOUNT
                  </h1>
                  <div className="flex justify-between flex-col md:flex-row gap-5">
                    <InputReg
                      title="Bank Name"
                      id="bankname"
                      placeholder="BCA/BRI/MANDIRI"
                      value={values.bankname}
                      check1={errors.bankname}
                      check2={touched.bankname}
                      change={handleChange}
                      blur={handleBlur}
                    />
                    <InputReg
                      title="Bank Account Name"
                      id="bankaccountname"
                      placeholder="Budi"
                      value={values.bankaccountname}
                      check1={errors.bankaccountname}
                      check2={touched.bankaccountname}
                      change={handleChange}
                      blur={handleBlur}
                    />
                  </div>
                  <InputReg
                    title="Bank Number"
                    id="banknumber"
                    placeholder="29912345678"
                    value={values.banknumber}
                    check1={errors.banknumber}
                    check2={touched.banknumber}
                    change={handleChange}
                    blur={handleBlur}
                  />
                  <h1 className="text-xl font-semibold text-bozz-one mt-5">
                    EMAIL AND PASSWORD TO LOGIN
                  </h1>
                  <div className="flex justify-between flex-col md:flex-row md:gap-5 gap-1">
                    <InputReg
                      title="Name (Name to login"
                      id="picname"
                      placeholder="name to login"
                      value={values.picname}
                      check1={errors.picname}
                      check2={touched.picname}
                      change={handleChange}
                      blur={handleBlur}
                    />
                    <InputReg
                      title="Email"
                      id="picemail"
                      placeholder="Email_to_login@gmail.com"
                      value={values.picemail}
                      check1={errors.picemail}
                      check2={touched.picemail}
                      change={handleChange}
                      blur={handleBlur}
                    />
                  </div>
                  <div className="flex justify-between flex-col md:flex-row md:gap-5 gap-1">
                    <InputRegPwd
                      title="Password"
                      id="password"
                      placeholder="Password123"
                      value={values.password}
                      check1={errors.password}
                      check2={touched.password}
                      change={handleChange}
                      blur={handleBlur}
                    />
                    <InputRegPwd
                      title="Confirm Password"
                      id="confirmPassword"
                      placeholder="Password123"
                      value={values.confirmPassword}
                      check1={errors.confirmPassword}
                      check2={touched.confirmPassword}
                      change={handleChange}
                      blur={handleBlur}
                    />
                  </div>
                </div>
              )}

              {/* </form> */}
            </div>
            <p className="text-bozz-one text-sm mt-3 text-center">
              Have an account ?
              <Link to="/login" className="font-semibold cursor-pointer">
                Login
              </Link>
            </p>
            <div className="btn-component mt-3 flex justify-between bottom-0">
              <input
                type="button"
                className="w-[170px] h-10 bg-bozz-one rounded-xl text-sm text-bozz-six bottom-10"
                value="Back"
                onClick={handleBack}
                disabled={steps[0].key === activeStep.key}
              />
              <input
                type="button"
                className="w-[170px] h-10 bg-bozz-one rounded-xl text-sm text-bozz-six bottom-10"
                value={
                  steps[steps.length - 1].key !== activeStep.key
                    ? "Next"
                    : "Submit"
                }
                onClick={handleNext}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPartner;
