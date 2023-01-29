import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../components/LayoutAdmin";
import ListRevisi from "../../components/ListRevisi";
import { apiWithAuth } from "../../services/api";
import { useFormik } from "formik";
import { registerPartnerSchema } from "../../validations/validations";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RevisiRegister = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("partner_id");
  const token = localStorage.getItem("userToken");
  const [partnerData, setPartnerData] = useState();
  const [img, setImg] = useState();
  const [siupImg, setSiupImg] = useState("");
  const [nibImg, setNibImg] = useState("");
  const [eventImg1, setEventImg1] = useState("");
  const [eventImg2, setEventImg2] = useState("");
  const [eventImg3, setEventImg3] = useState("");

  const getPartnerInfo = async () => {
    apiWithAuth(
      `partners/${parseInt(id)}`,
      `GET`,
      null,
      "application/json",
      token
    ).then((res) => {
      const data = res.data;
      setPartnerData(res.data);
      values.companyname = data.company_name;
      values.companyemail = data.email;
      values.companyphone = data.company_phone;
      values.picname = data.pic_name;
      values.picposition = data.pic_position;
      values.picphone = data.pic_phone;
      values.picemail = data.email;
      values.picaddress = data.pic_address;
      values.companycity = data.company_city;
      values.companyaddress = data.company_address;
      values.linkwebsite = data.link_website;
      values.nib = data.nib_number;
      values.siup = data.siup_number;
      values.event1 = data.event1_name;
      values.event2 = data.event2_name;
      values.event3 = data.event3_name;
      values.bankname = data.bank_name;
      values.bankaccountname = data.bank_account_name;
      values.banknumber = data.bank_account_number;
      setSiupImg(data.siup_image_file);
      setNibImg(data.nib_image_file);
      setEventImg1(data.event1_image_file);
      setEventImg2(data.event2_image_file);
      setEventImg3(data.event4_image_file);
      setImg(data.company_image_file);
    });
  };

  const onSubmit = async () => {
    const body = new FormData();
    body.append("name", values.picname);
    body.append("email", values.picemail);
    body.append("pic_position", values.picposition);
    body.append("pic_phone", values.picphone);
    body.append("pic_address", values.picaddress);
    body.append("company_name", values.companyname);
    body.append("company_phone", values.companyphone);
    body.append("company_city", values.companycity);
    body.append("company_image_file", img);
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

    apiWithAuth(
      `partners`,
      `PUT`,
      body,
      `multipart/form-data`,
      localStorage.getItem("userToken")
    )
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Revision Successfull, Wait for next proccess.",
          showConfirmButton: true,
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

  useEffect(() => {
    getPartnerInfo();
  }, []);
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
      },
      validationSchema: registerPartnerSchema,
      onSubmit,
    });

  return (
    <>
      {partnerData ? (
        <LayoutAdmin>
          <h1 className="text-center font-bold text-xl text-bozz-one underline underline-offset-4">
            Revisi Registrasi
          </h1>
          <div>
            <ol className="list-decimal marker:text-blue-700">
              <li>
                <ListRevisi
                  label="company name"
                  placeholder={"Company A"}
                  id="companyname"
                  value={values.companyname}
                  check1={errors.companyname}
                  check2={touched.companyname}
                  change={handleChange}
                  blur={handleBlur}
                />
              </li>
              <li>
                <ListRevisi
                  label="company email"
                  placeholder={"Company A"}
                  id="companyemail"
                  value={values.companyemail}
                  check1={errors.companyemail}
                  check2={touched.companyemail}
                  change={handleChange}
                  blur={handleBlur}
                />
              </li>
              <li>
                <ListRevisi
                  label="company phone"
                  placeholder={"Company A"}
                  id="companyphone"
                  value={values.companyphone}
                  check1={errors.companyphone}
                  check2={touched.companyphone}
                  change={handleChange}
                  blur={handleBlur}
                />
              </li>
              <li>
                <ListRevisi
                  label="company address"
                  placeholder={"Company A"}
                  id="companyaddress"
                  value={values.companyaddress}
                  check1={errors.companyaddress}
                  check2={touched.companyaddress}
                  change={handleChange}
                  blur={handleBlur}
                />
              </li>
              <li>
                <div className="flex flex-col gap-5 pr-12">
                  <label className="text-bozz-three text-sm font-semibold capitalize">
                    Company Profile Image
                  </label>
                  <input
                    type={"file"}
                    onChange={(e) => setImg(e.target.files[0])}
                    className={`h-8 text-xs w-96  rounded-lg border border-bozz-one bg-bozz-five caret-text-bozz-one text-bozz-one file:bg-bozz-one file:h-full`}
                  />
                </div>
              </li>
              <li>
                <ListRevisi
                  label="PIC name"
                  placeholder={"Company A"}
                  id="picname"
                  value={values.picname}
                  check1={errors.picname}
                  check2={touched.picname}
                  change={handleChange}
                  blur={handleBlur}
                />
              </li>
              <li>
                <ListRevisi
                  label="PIC Position"
                  placeholder={"Company A"}
                  id="picposition"
                  value={values.picposition}
                  check1={errors.picposition}
                  check2={touched.picposition}
                  change={handleChange}
                  blur={handleBlur}
                />
              </li>
              <li>
                <ListRevisi
                  label="PIC Phone"
                  placeholder={"Company A"}
                  id="picphone"
                  value={values.picphone}
                  check1={errors.picphone}
                  check2={touched.picphone}
                  change={handleChange}
                  blur={handleBlur}
                />
              </li>
              <li>
                <div className="flex justify-between items-end gap-5 pr-12">
                  <ListRevisi
                    label="NIB No."
                    placeholder={"Company A"}
                    id="nib"
                    value={values.nib}
                    check1={errors.nib}
                    check2={touched.nib}
                    change={handleChange}
                    blur={handleBlur}
                  />
                  <input
                    type={"file"}
                    onChange={(e) => setNibImg(e.target.files[0])}
                    className={`h-8 text-xs w-96  rounded-lg border border-bozz-one bg-bozz-five caret-text-bozz-one text-bozz-one file:bg-bozz-one file:h-full`}
                  />
                </div>
              </li>
              <li>
                <div className="flex justify-between items-end gap-5 pr-12">
                  <ListRevisi
                    label="SIUP No."
                    placeholder={"Company A"}
                    id="siup"
                    value={values.siup}
                    check1={errors.siup}
                    check2={touched.siup}
                    change={handleChange}
                    blur={handleBlur}
                  />
                  <input
                    type={"file"}
                    onChange={(e) => setSiupImg(e.target.files[0])}
                    className={`h-8 text-xs w-96  rounded-lg border border-bozz-one bg-bozz-five caret-text-bozz-one text-bozz-one file:bg-bozz-one file:h-full`}
                  />
                </div>
              </li>
              <li>
                <div className="flex justify-between items-end gap-5 pr-12">
                  <ListRevisi
                    label="Event 1 Name"
                    placeholder={"Company A"}
                    id="event1"
                    value={values.event1}
                    check1={errors.event1}
                    check2={touched.event1}
                    change={handleChange}
                    blur={handleBlur}
                  />
                  <input
                    type={"file"}
                    onChange={(e) => setEventImg1(e.target.files[0])}
                    className={`h-8 text-xs w-96  rounded-lg border border-bozz-one bg-bozz-five caret-text-bozz-one text-bozz-one file:bg-bozz-one file:h-full`}
                  />
                </div>
              </li>
              <li>
                <div className="flex justify-between items-end gap-5 pr-12">
                  <ListRevisi
                    label="Event 2 Name."
                    placeholder={"Company A"}
                    id="event2"
                    value={values.event2}
                    check1={errors.event2}
                    check2={touched.event2}
                    change={handleChange}
                    blur={handleBlur}
                  />
                  <input
                    type={"file"}
                    onChange={(e) => setEventImg2(e.target.files[0])}
                    className={`h-8 text-xs w-96  rounded-lg border border-bozz-one bg-bozz-five caret-text-bozz-one text-bozz-one file:bg-bozz-one file:h-full`}
                  />
                </div>
              </li>
              <li>
                <div className="flex justify-between items-end gap-5 pr-12">
                  <ListRevisi
                    label="Event 3 Name"
                    placeholder={"Company A"}
                    id="event3"
                    value={values.event3}
                    check1={errors.event3}
                    check2={touched.event3}
                    change={handleChange}
                    blur={handleBlur}
                  />
                  <input
                    type={"file"}
                    onChange={(e) => setEventImg3(e.target.files[0])}
                    className={`h-8 text-xs w-96  rounded-lg border border-bozz-one bg-bozz-five caret-text-bozz-one text-bozz-one file:bg-bozz-one file:h-full`}
                  />
                </div>
              </li>
              <li>
                <ListRevisi
                  label="Bank Name"
                  placeholder={"Company A"}
                  id="bankname"
                  value={values.bankname}
                  check1={errors.bankname}
                  check2={touched.bankname}
                  change={handleChange}
                  blur={handleBlur}
                />
              </li>
              <li>
                <ListRevisi
                  label="Bank Account Name"
                  placeholder={"Company A"}
                  id="bankaccountname"
                  value={values.bankaccountname}
                  check1={errors.bankaccountname}
                  check2={touched.bankaccountname}
                  change={handleChange}
                  blur={handleBlur}
                />
              </li>
              <li>
                <ListRevisi
                  label="Bank Account Number"
                  placeholder={"Company A"}
                  id="banknumber"
                  value={values.banknumber}
                  check1={errors.banknumber}
                  check2={touched.banknumber}
                  change={handleChange}
                  blur={handleBlur}
                />
              </li>
            </ol>
          </div>
          <div className="flex justify-end mt-5 mb-10 h-8">
            <label
              htmlFor="my-modal-4"
              className="btn btn-sm text-xs bg-[#EF6D58] text-bozz-six w-24 hover:bg-[#EF6D70] rounded-lg hover:scale-110"
            >
              Cancel
            </label>
            <button
              className="btn btn-sm text-xs bg-bozz-one text-bozz-six w-24 mx-5 rounded-lg hover:bg-primary hover:scale-110"
              onClick={() => onSubmit()}
              type="submit"
            >
              Send
            </button>
          </div>
        </LayoutAdmin>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default RevisiRegister;
