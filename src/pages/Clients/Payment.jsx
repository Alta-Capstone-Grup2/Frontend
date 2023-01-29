import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { apiWithAuth } from "../../services/api";
import { formatCurrency } from "../../utils/formatCurrency";
import Swal from "sweetalert2";
import TermsCondition from "../../components/termsCondition";
import Loading from "../../components/Loading";

const Payment = () => {
  const banks = ["va bni", "va bca", "va bri", "va permata"];
  const [chosen, setChosen] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location?.state?.data;
  const token = localStorage.getItem("userToken");
  const [check, setCheck] = useState(false);
  // let total = 0
  // console.log(data)

  const additional = data.additional;
  const additionalArr = data.additionalArr;
  let total = data.serviceId.service_price;
  additionalArr.map((item, i) => {
    return (total += item.qty * additional[i].additional_price);
  });
  const startDate = location?.state?.startDate;
  const endDate = location?.state?.endDate;
  const clientName = location?.state?.clientName;
  const eventName = location?.state?.eventName;
  const eventLocation = location?.state?.eventLocation;
  const eventAddress = location?.state?.eventAddress;
  const note = location?.state?.note;
  const qty = location?.state?.qty;

  const getTotal = () => {
    additionalArr.map((item, i) => {
      const jumlah = item.qty * additional[i].additional_price;
      total += jumlah;
    });
  };
  useEffect(() => {
    // getTotal()
  }, []);
  const onPay = async () => {
    const body = {
      event_name: data.eventName,
      start_date: data.startDate,
      end_date: data.endDate,
      event_location: data.eventLocation,
      event_address: data.eventAddress,
      notes_for_partner: data.note,
      payment_method: chosen,
      service_id: parseInt(data.serviceId.id),
      order_details: additionalArr,
    };
    apiWithAuth(`orders`, `POST`, body, "application/json", token)
      .then((res) => {
        const vaNumber = res.data.va_number;
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Success make order`,
          showConfirmButton: true,
        });
        navigate("/detail-transaction", { state: { id: res.data.id } });
      })
      .catch((err) => {
        const message =
          err.message == "Incorrect input. payment_method: cannot be blank."
            ? err.message
            : "Failed to make order! Try again letter";
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${message}`,
          showConfirmButton: true,
        });
      });
  };
  return (
    <>
      {data ? (
        <div className="bg-bozz-six text-bozz-one">
          <Navbar />
          <div className="flex justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-8">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 w-full max-w-screen-lg">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-bozz-three text-center">
                  Payment
                </h3>
                <div className="grid gap-5 grid-cols-2 grid-rows-2 text-left mt-5">
                  <div className="">
                    <p className="text-xs text-bozz-two">Start Date</p>
                    <p className="text-md text-bozz-three">{data.startDate}</p>
                  </div>
                  <div className="">
                    <p className="text-xs text-bozz-two">End Date</p>
                    <p className="text-md text-bozz-three">{data.endDate}</p>
                  </div>
                  <div className="">
                    <p className="text-xs text-bozz-two">Client Name</p>
                    <p className="text-md text-bozz-three">{data.clientName}</p>
                  </div>
                  <div className="">
                    <p className="text-xs text-bozz-two">Event Name</p>
                    <p className="text-md text-bozz-three">{data.eventName}</p>
                  </div>
                  <div className="">
                    <p className="text-xs text-bozz-two">Event Location</p>
                    <p className="text-md text-bozz-three">
                      {data.eventLocation}
                    </p>
                  </div>
                  <div className="">
                    <p className="text-xs text-bozz-two">Client Address</p>
                    <p className="text-md text-bozz-three">
                      {data.eventAddress}
                    </p>
                  </div>
                  <div className="">
                    <p className="text-xs text-bozz-two">Notes for partner </p>
                    <p className="text-md text-bozz-three">{data.note}</p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-bozz-two">
                  Your Order
                </h2>
                <div className="bg-white rounded mt-4 w-96 shadow-lg py-6 border border-bozz-two px-8">
                  <div className="">
                    <div className="flex items-end border-b border-gray-400 py-3">
                      <span className="text-sm font-semibold">
                        {data.serviceId.service_name}
                      </span>
                      <span className="text-sm ml-auto">
                        {formatCurrency(data.serviceId.service_price)}
                      </span>
                    </div>
                  </div>
                  {additionalArr?.map((item, i) => {
                    let total = data.serviceId.service_price;
                    additionalArr.map((add, i) => {
                      let jumlah = add.qty * additional[i].additional_price;
                      total += jumlah;
                    });
                    if (item.qty > 0) {
                      return (
                        <div className="mt-4" key={i}>
                          <div className="flex items-end justify-between border-b border-gray-400 py-3">
                            <span className="text-sm font-semibold">
                              {additional[i].additional_name}
                            </span>
                            <span className="text-sm text-gray-500 mb-px">
                              {formatCurrency(
                                additional[i].additional_price * item.qty
                              )}
                            </span>
                          </div>
                        </div>
                      );
                    }
                  })}
                  <div className="mt-3">
                    <div className="flex items-end justify-between border-b border-gray-400 py-3">
                      <span className="text-sm">Total</span>
                      <span className="text-sm  font-semibold text-gray-800 mb-px">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center px-8 mt-8">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      id="termsConditions"
                      onChange={() => setCheck(!check)}
                    />
                    <label
                      className="text-xs text-gray-500 ml-2"
                      htmlFor="termsConditions"
                    >
                      <span>I agree to the </span>
                      <label
                        className="text-bozz-two hover:underline"
                        htmlFor="my-modal-4"
                      >
                        terms and conditions.
                      </label>
                      <span>as set out by the user agreement.</span>
                    </label>
                  </div>
                  <TermsCondition />
                  <div className="mt-4">
                    <div className="flex flex-col justify-between">
                      <span className="text-md font-semibold text-bozz-three">
                        Pilih Metode Pembayaran
                      </span>
                      <select
                        className="bg-white px-3 border border-bozz-two text-md text-bozz-two h-10 rounded-lg w-full capitalize"
                        id="companycity"
                        onChange={(e) => setChosen(e.target.value)}
                      >
                        <option className="capitalize">Choose Bank</option>
                        {banks.map((bank, i) => {
                          return (
                            <option key={i} className="capitalize" value={bank}>
                              {bank.slice(3)} Bank Virtual Account
                            </option>
                          );
                        })}
                      </select>
                      {chosen && (
                        <span className="text-xs font-semibold mt-1 text-bozz-two">
                          You Choose {chosen} for payment method
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    className="w-full h-10 bg-bozz-two mt-5 text-white font-semibold rounded-lg disabled:opacity-75 disabled:bg-gray-400"
                    disabled={check ? false : true}
                    onClick={onPay}
                  >
                    Pay Now
                  </button>
                </div>
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

export default Payment;
