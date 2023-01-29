import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { apiWithAuth } from "../../services/api";
import Swal from "sweetalert2";
import { useLocation, Link, useNavigate } from "react-router-dom";
import LayoutAdmin from "../../components/LayoutAdmin";
import { BiLeftArrow } from "react-icons/bi";
import Loading from "../../components/Loading";

const ServiceAdditional = () => {
  const [count, setCount] = useState(1);
  const location = useLocation();
  const listAdditional = location?.state?.listAdditional;
  const serviceId = location?.state?.serviceId;
  const serviceName = location?.state?.serviceName;
  const [additional, setAdditional] = useState();
  const [idAdditional, setIdAdditional] = useState();
  const [addArr, setAddArr] = useState([]);
  const [descArr, setDescArr] = useState([]);
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  const addServiceAdditional = () => {
    const body = {
      service_id: parseInt(serviceId),
      additionals: addArr,
    };

    apiWithAuth(`services/additionals`, `POST`, body, "application/json", token)
      .then((res) => {
        Swal.fire({
          title: "Success Add Service Additional",
          icon: "success",
          confirmButtonColor: "#533e85",
          confirmButtonText: "Oke",
        });
        setAddArr([]);
        setDescArr([]);
        navigate("/partner/");
      })
      .catch((err) => {
        Swal.fire({
          title: `${err}`,
          icon: "error",
          confirmButtonColor: "#533e85",
          confirmButtonText: "Oke",
        });
      });
  };
  const chooseAdd = (choose, value) => {
    const filterAdd = listAdditional.filter((item) => item.id == value);
    choose(filterAdd);
    setIdAdditional(value);
  };
  const addToArr = () => {
    setAddArr([
      ...addArr,
      {
        additional_id: parseInt(idAdditional),
      },
    ]);
    setDescArr([...descArr, additional[0]]);
  };

  return (
    <>
      {listAdditional ? (
        <LayoutAdmin>
          <Link
            to="/partner/"
            className="text-bozz-one font-bold flex items-center mt-2"
          >
            <BiLeftArrow className="mx-2 text-xl font-bold" />
            Back To List
          </Link>
          <div className="card w-full h-full shadow-lg bg-white text-bozz-one py-5 px-8">
            <div className="flex justify-between flex-col h-full">
              <div>
                <p className="text-md font-bold my-5">ADD SERVICE ADDITIONAL</p>
                <p className="text-sm  text-left">Service Name</p>
                <p className="text-md font-semibold text-left border-b border-bozz-one mb-5">
                  {serviceName}
                </p>
                <div
                  className={`flex gap-10 ${count >= 1 ? `block` : `hidden`}`}
                >
                  <div className="w-[50%]">
                    <label className="label mb-[-10px]">
                      <span className="label-text text-sm text-bozz-one capitalize">
                        Additional Name
                      </span>
                    </label>
                    <select
                      className="bg-bozz-five border border-bozz-one text-xs text-bozz-one h-10 rounded-lg w-full"
                      onChange={(e) => chooseAdd(setAdditional, e.target.value)}
                    >
                      <option>Please choose one option</option>
                      {listAdditional &&
                        listAdditional.map((item, index) => {
                          return (
                            <option
                              key={index}
                              value={item.id}
                              className="text-xs"
                            >
                              {item.additional_name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="w-[50%]">
                    <label className="label mb-[-10px]">
                      <span className="label-text text-sm text-bozz-one capitalize">
                        Additional Price
                      </span>
                    </label>
                    <div className="h-10 flex items-center py-3 w-full border border-bozz-one px-5 rounded-lg">
                      {additional &&
                        additional?.map((item, i) => {
                          return (
                            <p className="text-xs font-semibold" key={i}>
                              {formatCurrency(item.additional_price)}
                            </p>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-3">
                  <button
                    className="h-12 w-12 border rounded-md border-bozz-one flex justify-center items-center text-xl font-bold bg-bozz-five hover:bg-bozz-one hover:text-white"
                    onClick={() => addToArr()}
                  >
                    +
                  </button>
                </div>
                {descArr?.map((add, id) => {
                  return (
                    <div className="flex justify-between" key={id}>
                      <p>{add.additional_name}</p>
                      <p>{formatCurrency(add.additional_price)}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center mt-3">
                <button
                  className="h-12 w-40 text-xs border rounded-md border-bozz-one flex justify-center items-center font-bold bg-bozz-five hover:bg-bozz-one hover:text-white"
                  onClick={() => addServiceAdditional()}
                >
                  Add Services Additional
                </button>
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

export default ServiceAdditional;
