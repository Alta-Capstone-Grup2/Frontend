import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";

const OrderUser = () => {
  const location = useLocation();
  const [clientName, setClientName] = useState();
  const [eventName, setEventName] = useState();
  const [eventLocation, setEventLocation] = useState();
  const [eventAddress, setEventAddress] = useState();
  const [note, setNote] = useState();
  const allCity = JSON.parse(localStorage.getItem("city"));
  const startDate = location?.state?.startDate;
  const endDate = location?.state?.endDate;
  const additional = location?.state?.additional;
  const serviceId = location?.state?.serviceId;
  let total = serviceId.service_price;
  const [additionalArr, setAdditionalArr] = useState([]);
  const [qty, setQty] = useState(0);
  let arr = [],
    qtyAdd = [];

  const incNum = (i) => {
    arr = additionalArr.slice();
    arr[i].qty = arr[i].qty + 1;
    setAdditionalArr(arr);
  };
  const decNum = (i) => {
    arr = additionalArr.slice();
    if (arr[i].qty > 0) {
      arr[i].qty = arr[i].qty - 1;
    }
    setAdditionalArr(arr);
  };

  const getAdditionalArr = () => {
    additional?.map((item, i) => {
      (arr[i] = {
        service_additional_id: item.service_additional_id,
        qty: 0,
      }),
        (qtyAdd[i] = arr[i].qty);
    });
    return setAdditionalArr(arr);
  };
  const navigate = useNavigate();

  const onPayment = () => {
    if (clientName && eventLocation && eventName && eventAddress) {
      const data = {
        startDate: startDate,
        endDate: endDate,
        clientName: clientName,
        eventName: eventName,
        eventLocation: eventLocation,
        eventAddress: eventAddress,
        note: note,
        serviceId: serviceId,
        additional: additional,
        additionalArr: additionalArr,
      };
      navigate("/payment", {
        state: { data: data },
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Data can't be empty, Check again and 
                make sure all data is filled in`,
        showConfirmButton: true,
      });
    }
  };

  useEffect(() => {
    getAdditionalArr();
  }, []);

  return (
    <>
      <div className="bg-bozz-six text-bozz-one">
        <Navbar />
        <div className="container mx-auto px-10 py-10">
          <h1 className="text-4xl text-center">Your Order</h1>
          <p className="underline text-bozz-one text-lg fot-semibold">
            Fill the form for your order !
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-2">
            <div>
              <div className="flex flex-col py-1">
                <label className="font-semibold">Start Date</label>
                <p className="text-xl font-bold text-bozz-two">{startDate}</p>
              </div>
              <div className="flex flex-col py-1">
                <label className="">Client Name</label>
                <input
                  onChange={(e) => setClientName(e.target.value)}
                  required
                  type="text"
                  className="input border border-bozz-one bg-bozz-six w-full max-w-md"
                />
              </div>
              <div className="flex flex-col py-1">
                <label>Event Name</label>
                <input
                  onChange={(e) => setEventName(e.target.value)}
                  required
                  type="text"
                  className="input border border-bozz-one  bg-bozz-six w-full max-w-md"
                />
              </div>
              <div className="flex flex-col py-1">
                <label className="">Note For EO</label>
                <textarea
                  onChange={(e) => setNote(e.target.value)}
                  className="textarea border border-bozz-one h-24 resize-none bg-bozz-six w-full max-w-md"
                  placeholder="Bio"
                ></textarea>
              </div>
            </div>
            <div>
              <div className="flex flex-col py-1">
                <label className="font-semibold">End Date</label>
                <p className="text-xl font-bold text-bozz-two">{endDate}</p>
              </div>
              <div className="flex flex-col py-1">
                <label className="">Event Location</label>
                <select
                  className="bg-bozz-five border border-bozz-one text-xs text-bozz-one h-10 rounded-lg w-full max-w-md"
                  id="companycity"
                  onChange={(e) => setEventLocation(e.target.value)}
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
              <div className="flex flex-col py-1">
                <label className="">Event Address</label>
                <input
                  onChange={(e) => setEventAddress(e.target.value)}
                  type="text"
                  className="input border border-bozz-one  bg-bozz-six w-full max-w-md"
                />
              </div>
            </div>
          </div>

          <div className="py-10">
            <h1 className="text-3xl">Service Detail</h1>
            <div className="py-10 border rounded-md w-full border-bozz-one px-10">
              <div className="flex juastify-between">
                <p className="text-lg font-bold w-[30%]">Service Name</p>
                <p className="w-8">:</p>
                <p className="text-lg font-bold">{serviceId.service_name}</p>
              </div>
              <div className="flex juastify-between my-3">
                <p className="text-lg font-bold w-[30%]">Service Price</p>
                <p className="w-8">:</p>
                <p className="text-lg font-bold">
                  {formatCurrency(serviceId.service_price)}
                </p>
              </div>
              <div className="flex juastify-between">
                <p className="text-lg font-bold w-[30%]">Additionals</p>
                <p className="w-8">:</p>
                <p className="text-lg font-bold"></p>
              </div>
              <div className="pl-10">
                {additional && additionalArr ? (
                  additional.map((item, i) => {
                    let num = additionalArr[i]?.qty;
                    total += item.additional_price * num;
                    return (
                      <div className="flex my-3" key={i}>
                        <p className="text-lg font-bold w-[30%]">
                          {item.additional_name}
                        </p>
                        <p className="w-8">:</p>
                        <p className="text-lg font-bold w-40">
                          {formatCurrency(item.additional_price)}
                        </p>
                        <div className="flex w-40">
                          <button
                            onClick={() => {
                              decNum(i), (num += 1);
                            }}
                            className="h-8 w-8 flex justify-center items-center rounded border border-bozz-one hover:bg-bozz-one hover:text-white"
                          >
                            -
                          </button>
                          <p className="text-lg px-2 border-b-2 border-bozz-one h-8 w-8 text-center bg-white">
                            {num}
                          </p>
                          <button
                            onClick={() => {
                              incNum(i), (num -= 1);
                            }}
                            className="h-8 w-8 flex justify-center items-center rounded border border-bozz-one hover:bg-bozz-one hover:text-white"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-lg font-bold text-right">
                          {formatCurrency(item.additional_price * num)}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <p>Tidak Ada Additional Untuk Service Ini</p>
                )}
              </div>
              <div className="flex justify-between border-t-2 border-bozz-one py-3">
                <span className="text-md">TOTAL</span>
                <span className="text-lg font-bold text-right">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
            <div className="flex justify-end  mt-4">
              <button className="btn hover:btn-warning bg-orange-400 mx-2 text-white">
                Cancel
              </button>
              <button
                className="btn bg-bozz-one hover:bg-bozz-two text-white"
                onClick={() => onPayment()}
              >
                Order
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default OrderUser;
