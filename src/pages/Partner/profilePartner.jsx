import React, { useEffect, useState } from "react";
import SideBarAdmin from "../../components/SideBarAdmin";
import Admin from "../../assets/employee.png";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { apiWithAuth } from "../../services/api";
import Loading from "../../components/Loading";
import Row from "../../components/Row";
import EditInput from "../../components/EditInput";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const ProfilePartner = () => {
  const [cookie, setCookie] = useCookies();
  const userId = cookie.id;
  const userToken = cookie.token;
  const [userData, setUserData] = useState();
  const role = cookie.role;
  const [name, setName] = useState();
  const [companyName, setCompanyName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [img, setImg] = useState();
  const [edit, setEdit] = useState(false);
  const currentUser = useSelector((state) => state.users.currentUser);

  const getUserData = () => {
    setUserData(currentUser);
    setName(currentUser.pic_name);
    setCompanyName(currentUser.company_name);
    setEmail(currentUser.email);
    setPhone(currentUser.company_phone);
    setCity(currentUser.company_city);
    setAddress(currentUser.company_address);
    setImg(currentUser.company_image_file);
  };
  const updateUser = async () => {
    apiWithAuth(
      `partners/${localStorage.getItem("partner_id")}`,
      `GET`,
      null,
      "application/json",
      localStorage.getItem("userToken")
    ).then((res) => {
      const data = res.data;
      dispatch(updateUser(data));
    });
  };
  const onEdit = async () => {
    const body = new FormData();
    body.append("name", name);
    body.append("email", email);
    body.append("pic_position", userData.pic_position);
    body.append("pic_phone", userData.pic_phone);
    body.append("pic_address", userData.pic_address);
    body.append("company_name", companyName);
    body.append("company_phone", phone);
    body.append("company_city", city);
    body.append("company_image_file", img);
    body.append("company_address", address);
    body.append("link_website", userData.link_website);
    body.append("nib_number", userData.nib_number);
    body.append("nib_image_file", userData.nib_image_file);
    body.append("siup_number", userData.siup_number);
    body.append("siup_image_file", userData.siup_image_file);
    body.append("event1_name", userData.event1_name);
    body.append("event1_image_file", userData.event1_image_file);
    body.append("event2_name", userData.event2_name);
    body.append("event2_image_file", userData.event2_image_file);
    body.append("event3_name", userData.event3_name);
    body.append("event4_image_file", userData.event4_image_file);
    body.append("bank_name", userData.bank_name);
    body.append("bank_account_number", userData.bank_number);
    body.append("bank_account_name", userData.bank_account_name);
    body.append("file", userData.company_image_file);

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
          title: "Edit Profile Successfull...",
          showConfirmButton: true,
        });
        navigate("/partner/");
        updateUser();
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
    getUserData();
  }, [userData]);
  return (
    <>
      {userData ? (
        <div className="min-h-screen w-screen flex bg-bozz-five">
          <SideBarAdmin role={userData.role} name={userData.name} />
          <div className="flex flex-col w-[75%] mb-10">
            <div className="flex w-full px-14 py-5">
              <div className="w-[25%] h-full py-12 flex flex-col items-center">
                <div className="relative">
                  <img
                    src={userData.company_image_file}
                    className="rounded-full h-48 w-48 border border-bozz-one"
                  />
                  <div
                    className="flex text-bozz-one absolute right-6 bottom-0"
                    onClick={() => setEdit(!edit)}
                  >
                    <FaEdit className="text-2xl" />
                  </div>
                </div>
                <p className="text-xl text-bozz-one font-semibold text-center capitalize mt-3">
                  {userData.company_name}
                </p>
                <p className="text-sm text-bozz-one font-semibold text-center capitalize">
                  {userData.role}
                </p>
                <p className="text-sm text-bozz-one font-semibold text-center capitalize">
                  {userData.verification_status}
                </p>
                <p
                  className="underline text-bozz-one mt-8 font-semibold bg-bozz-five"
                  onClick={() => setEdit(!edit)}
                >
                  Edit Password
                </p>
              </div>
              <div className="w-[75%] h-full py-12 pl-8 pr-16">
                <div className="flex justify-between w-full">
                  <h1 className="text-bozz-one font-bold text-xl">
                    PROFILE INFO
                  </h1>
                  <p
                    className="text-bozz-one cursor-pointer font-semibold flex"
                    onClick={() => setEdit(!edit)}
                  >
                    <FaEdit className="text-xl" />
                    Edit
                  </p>
                </div>
                {edit == false ? (
                  <div className="mt-5">
                    <div className="mt-3">
                      <span className="label-text text-bozz-three capitalize">
                        {userData.role} Email
                      </span>
                      <p className="text-md font-semibold text-bozz-one border-b border-bozz-one">
                        {userData.email}
                      </p>
                    </div>
                    <div className="mt-3">
                      <span className="label-text text-bozz-three capitalize">
                        {role} Phone
                      </span>
                      <p className="text-md font-semibold text-bozz-one border-b border-bozz-one">
                        {userData.company_phone}
                      </p>
                    </div>
                    <div
                      className={`mt-3 ${role == "admin" ? "hidden" : "block"}`}
                    >
                      <span className="label-text text-bozz-three capitalize">
                        City
                      </span>
                      <p className="text-md font-semibold text-bozz-one border-b border-bozz-one">
                        {userData.company_city}
                      </p>
                    </div>
                    <div
                      className={`mt-3 ${role == "admin" ? "hidden" : "block"}`}
                    >
                      <span className="label-text text-bozz-three capitalize">
                        Address
                      </span>
                      <p className="text-md font-semibold text-bozz-one border-b border-bozz-one">
                        {userData.company_address}
                      </p>
                    </div>
                    <div
                      className={`mt-3 ${role == "admin" ? "hidden" : "block"}`}
                    >
                      <span className="label-text text-bozz-three capitalize">
                        Link Website
                      </span>
                      <p className="text-md font-semibold text-bozz-one border-b border-bozz-one">
                        {userData.link_website}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5">
                    <h1 className="text-center text-bozz-three font-semibold text-lg">
                      Edit Profile
                    </h1>
                    <EditInput
                      label="Name"
                      id="name"
                      value={name}
                      change={(e) => setName(e.target.value)}
                      placeholder={name}
                    />
                    <EditInput
                      label="Company Name"
                      id="name"
                      value={companyName}
                      change={(e) => setCompanyName(e.target.value)}
                      placeholder="name"
                    />
                    <EditInput
                      label="Email"
                      id="email"
                      value={email}
                      change={(e) => setEmail(e.target.value)}
                      placeholder="email"
                    />
                    <EditInput
                      label="Partner Phone"
                      id="Phone"
                      value={phone}
                      change={(e) => setPhone(e.target.value)}
                      placeholder="08912345678"
                    />
                    <EditInput
                      label="Partner City"
                      id="Phone"
                      value={city}
                      change={(e) => setCity(e.target.value)}
                      placeholder="Jakarta"
                    />
                    <EditInput
                      label="Partner Address"
                      id="Address"
                      value={address}
                      change={(e) => setAddress(e.target.value)}
                      placeholder="Jln. Kunang kunang No.1234"
                    />
                    <div className="form-control w-full">
                      <label className="label mb-[-10px]">
                        <span className="label-text text-bozz-three capitalize">
                          Company Image
                        </span>
                      </label>
                      <input
                        type="file"
                        id={"image"}
                        placeholder={"company image"}
                        onChange={(e) => setImg(e.target.files[0])}
                        className={`w-px-5 w-full border h-10 border-bozz-three bg-bozz-five caret-text-bozz-three text-bozz-three file:h-full file:bg-bozz-two file:border-none`}
                        required
                      />
                    </div>
                    <div className="flex justify-end w-full mt-8 text-sm">
                      <button className="bg-[#EF6D58] px-3 w-20 h-8 rounded-lg text-bozz-six hover:scale-110">
                        Cancel
                      </button>
                      <button
                        className="bg-bozz-three text-bozz-six h-8  w-28 mx-3 rounded-lg hover:scale-110"
                        onClick={onEdit}
                      >
                        Submit Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Detail Partner */}
            <div className="w-full px-14">
              <div className="border border-bozz-one w-full p-3">
                <p className="text-2xl font-semibold text-bozz-one text-center mb-2">
                  Detail
                </p>
                <table className="w-full">
                  <tbody>
                    <Row keyName="PIC Name" value={userData.pic_name} />
                    <Row keyName="PIC Position" value={userData.pic_position} />
                    <Row keyName="PIC phone" value={userData.pic_phone} />
                    <Row keyName="PIC Address" value={userData.pic_address} />
                    <Row
                      keyName="Bank Name"
                      value={userData.bank_account_name}
                    />
                    <Row
                      keyName="Bank Account Name"
                      value={userData.bank_account_name}
                    />
                    <Row
                      keyName="Bank Account No."
                      value={userData.bank_account_number}
                    />
                    <Row keyName="NIB Number" value={userData.nib_number} />
                    <Row keyName="SIUP Number" value={userData.siup_number} />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProfilePartner;
