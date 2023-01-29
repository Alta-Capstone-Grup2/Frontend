import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../components/LayoutAdmin";
import { BiLeftArrow } from "react-icons/bi";
import CustomInput from "../../components/CustomInput";
import { BiLeftArrowCircle, BiRightArrowCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
import EditInput from "../../components/EditInput";
import { apiWithAuth } from "../../services/api";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const EditAdditional = () => {
  const [addName, setAddName] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const data = location?.state?.data;
  const [cookie, setCookie] = useCookies();
  const token = cookie.token;

  const getAdditionalData = () => {
    const data = location?.state?.data;
    setAddName(data.additional_name);
    setAddPrice(data.additional_price);
  };

  const EditAdditional = async () => {
    const body = {
      additional_name: addName,
      additional_price: parseInt(addPrice),
    };
    apiWithAuth(
      `additionals/${parseInt(data.id)}`,
      `PUT`,
      body,
      "application/json",
      token
    )
      .then((res) => {
        Swal.fire({
          title: "Success Edit additional.",
          icon: "success",
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

  useEffect(() => {
    const data = location?.state?.data;
    setAddName(data.additional_name);
    setAddPrice(data.additional_price);
  }, [setAddName, setAddPrice]);
  return (
    <>
      {addName && addPrice ? (
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
                Edit Additional
              </h1>
              <div className="flex flex-col justify-between h-full">
                <div className="">
                  <p className="text-md font-bold">ADDITIONAL INFORMATION</p>
                  <div className="flex gap-10">
                    <EditInput
                      label="Additional Name"
                      value={addName}
                      change={(e) => setAddName(e.target.value)}
                      id="addname"
                      placeholder={"Souvenir @1000pcs"}
                    />
                    <EditInput
                      label="Additional Price"
                      value={addPrice}
                      change={(e) => setAddPrice(e.target.value)}
                      id="addprice"
                      placeholder={"800000"}
                    />
                  </div>
                  <div className="flex justify-center mt-3">
                    <button
                      className="h-12 w-18 border rounded-md border-bozz-one flex justify-center items-center text-xs font-bold bg-bozz-five"
                      onClick={EditAdditional}
                    >
                      + Edit Additional
                    </button>
                  </div>
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

export default EditAdditional;
