import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Picprofile from "../../assets/profile.png";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const ProfileUser = () => {
  const [dataClient, setDataClient] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState();
  const [cookie, setCookie] = useCookies();
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  const getClient = async () => {
    await axios
      .get(
        `https://irisminty.my.id/clients/${localStorage.getItem("idclient")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then((res) => {
        const result = res.data.data;
        setDataClient(result);
        setName(result.name);
        setEmail(result.email);
        setPhone(result.phone);
        setAddress(result.address);
      })
      .catch((err) => {});
  };

  const updateUser = async () => {
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("address", address);
    data.append("client_image_file", file);
    await axios
      .put(`https://irisminty.my.id/clients`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        "content-type": "multipart/form-data",
      })
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit Data Successfull",
          showConfirmButton: true,
        });
      })
      .catch((err) => {});
  };

  const handleUpdates = (e) => {
    e.preventDefault();
    updateUser();
  };

  useEffect(() => {
    getClient();
  }, []);

  return (
    <>
      {dataClient ? (
        <div className="bg-white">
          <Navbar />
          <div className="flex">
            <div className="w-[25%] h-full py-12 flex flex-col items-center">
              {dataClient ? (
                <div className="relative">
                  <img
                    src={dataClient.client_image_file}
                    className="rounded-full h-48 w-48 border border-bozz-one"
                  />
                </div>
              ) : (
                <></>
              )}
              <p className="text-xl text-bozz-one font-semibold text-center capitalize mt-3"></p>
              <p className="text-sm text-bozz-one font-semibold text-center capitalize"></p>
              <button className="underline text-bozz-one font-semibold ">
                Edit Password
              </button>
            </div>
            <div className="py-10 lg:w-[500px] text-black">
              <h1 className="text-4xl">Profile</h1>
              {dataClient ? (
                <div>
                  <div className="py-5 p-5">
                    <div className="flex flex-col py-3">
                      <label className="">Name</label>
                      <input
                        value={dataClient.name}
                        type="text"
                        disabled
                        className="input input-bordered w-full bg-white border border-bozz-one"
                      />
                    </div>
                    <div className="flex flex-col py-3">
                      <label>Email</label>
                      <input
                        value={dataClient.email}
                        type="text"
                        disabled
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="flex flex-col py-3">
                      <label>Phone</label>
                      <input
                        value={dataClient.phone}
                        type="text"
                        disabled
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="flex flex-col py-3">
                      <label>Address</label>
                      <input
                        value={dataClient.address}
                        type="text"
                        disabled
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="">
                <h1 className="text-4xl">Edit Profile</h1>
                <div className="py-5">
                  <form
                    onSubmit={(e) => handleUpdates(e)}
                    className="p-5 border rounded-md"
                  >
                    <div className="flex flex-col py-3">
                      <label className="">Name</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="flex flex-col py-3">
                      <label>Email</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="flex flex-col py-3">
                      <label>Phone</label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="flex flex-col py-3">
                      <label>Address</label>
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="flex flex-col py-3">
                      <label>Profile Pic</label>
                      <input
                        onChange={(e) => setFile(e.target.files[0])}
                        type="file"
                        className="file-input w-full"
                      />
                    </div>
                    <div className="flex justify-end mt-2">
                      <button
                        className="h-10 bg-bozz-two text-sm text-white px-3 rounded"
                        type="submit"
                      >
                        EDIT
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProfileUser;
