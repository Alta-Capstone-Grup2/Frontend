import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutAdmin from "../../components/LayoutAdmin";
import Loading from "../../components/Loading";
import { apiWithAuth } from "../../services/api";
import { formatCurrency } from "../../utils/formatCurrency";
import ImageModal from "../../components/ImageModal";

const ListOrder = () => {
  const tableHead = [
    "no",
    "event name",
    "service name",
    "city",
    "total order",
    "start date",
    "end date",
    "status",
    "action",
    "transfer file",
  ];
  const [orderList, setOrderList] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [payoutImage, setPayoutImage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setdataPerPage] = useState(8);
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const current = orderList?.slice(firstIndex, lastIndex);
  const maxPage = Math.ceil(orderList?.length / dataPerPage);
  const pages = [];
  for (let i = 1; i <= maxPage; i++) {
    pages.push(i);
  }

  const getOrderList = async () => {
    apiWithAuth(
      `partners/orders`,
      `GET`,
      null,
      "application/json",
      localStorage.getItem("userToken")
    ).then((res) => {
      setOrderList(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getOrderList();
  }, []);
  return (
    <>
      {!loading && current ? (
        <LayoutAdmin>
          <div className="mt-3 w-full h-full">
            <h1 className="text-xl font-bold text-bozz-one mb-5">
              List Order Partner
            </h1>
            <div className="px-6 py-3 bg-white rounded-lg h-[90%] flex flex-col justify-between">
              <table className="w-full table-auto">
                <thead className="border-b-2 border-bozz-three">
                  <tr>
                    {tableHead.map((title, index) => {
                      return (
                        <th
                          className="text-bozz-two font-semibold capitalize text-sm"
                          key={index}
                        >
                          {title}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {current &&
                    current.map((data, index) => {
                      return (
                        <tr
                          className="text-bozz-two border-b-2 border-bozz-three h-10 text-center text-xs capitalize"
                          key={index}
                        >
                          <td>{index + 1}</td>
                          <td>{data.event_name}</td>
                          <td>{data.service_name.slice(0, 10)}...</td>
                          <td>{data.event_location}</td>
                          <td>{formatCurrency(data.gross_ammount)}</td>
                          <td>{data.start_date.slice(0, 10)}</td>
                          <td>{data.end_date.slice(0, 10)}</td>
                          <td>{data.order_status}</td>
                          <td>
                            {data.order_status === "Waiting Confirmation" ? (
                              <button
                                className="w-16 h-6 bg-bozz-three text-bozz-six rounded-lg text-[10px]"
                                onClick={() =>
                                  navigate("/partner/confirm-order", {
                                    state: { id: data.id },
                                  })
                                }
                              >
                                Confirm
                              </button>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td>
                            {data.payout_receipt_url !== "" &&
                            data.order_status == "Paid Off" ? (
                              <>
                                <label
                                  htmlFor="my-modal-4"
                                  className="text-xs border border-white px-3 py-2 bg-bozz-three hover:bg-bozz-two text-bozz-six rounded-lg text-[10px]"
                                  onClick={() =>
                                    setPayoutImage(data.payout_receipt_url)
                                  }
                                >
                                  Payout File
                                </label>
                              </>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {!current && (
                <p className="w-full text-md font-semibold text-bozz-one mt-5">
                  Belum Ada Order Yang Masuk
                </p>
              )}
              <ImageModal link={payoutImage} title={"Image"} />
              <div className="btn-group flex place-items-center justify-center gap-2 m-5">
                {pages?.map((page, index) => {
                  return (
                    <button
                      key={index}
                      className="h-8 w-8 focus:bg-bozz-two focus:text-white border border-bozz-two bg-white text-bozz-two hover:text-white hover:bg-bozz-two btn-circle"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  );
                })}
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

export default ListOrder;
