import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../components/LayoutAdmin";
import Loading from "../../components/Loading";
import PayoutModal from "../../components/PayoutModal";
import { apiWithAuth } from "../../services/api";
import { formatCurrency } from "../../utils/formatCurrency";
import Swal from "sweetalert2";

const ListOrderAdmin = () => {
  // company name, clent name,start date, end date, gross ammount, status, paaction(pay)
  const tableHead = [
    "no",
    "event name",
    "start date",
    "end date",
    "total",
    "status",
    "action",
  ];
  const [orderList, setOrderList] = useState();
  const [img, setImg] = useState();
  const [payoutId, setPayoutId] = useState();
  const [partner, setPartner] = useState();
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("userToken");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setdataPerPage] = useState(10);
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const current = orderList?.slice(firstIndex, lastIndex);
  const maxPage = Math.ceil(orderList?.length / dataPerPage);
  const pages = [];
  for (let i = 1; i <= maxPage; i++) {
    pages.push(i);
  }
  const disabled =
    currentPage === Math.ceil(orderList?.length / dataPerPage) ? true : false;
  const disableBack = currentPage === 1 ? true : false;
  const paginateBack = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1);
  };
  const paginateFront = () => setCurrentPage(currentPage + 1);

  const getOrderList = async () => {
    apiWithAuth(`orders`, `GET`, null, "application/json", token).then((res) =>
      setOrderList(res.data.reverse())
    );
  };

  const onPayout = async (id) => {
    const data = new FormData();
    data.append("payout_receipt_file", img);

    apiWithAuth(
      `orders/${parseInt(id)}/payout`,
      `PUT`,
      data,
      "multipart/form-data",
      token
    ).then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "success send payout file",
        showConfirmButton: true,
      });
      getOrderList();
    });
  };

  const onSet = (id, partner, total) => {
    setPayoutId(id);
    setPartner(partner);
    setTotal(total);
  };

  useEffect(() => {
    getOrderList();
  }, []);
  return (
    <>
      {orderList ? (
        <LayoutAdmin>
          <div className="mt-3 w-full h-full">
            <h1 className="text-xl font-bold text-bozz-one mb-5">List Order</h1>
            <div className="px-6 py-3 bg-white rounded-lg">
              <table className="w-full table-auto">
                <thead className="border-b-2 border-bozz-three">
                  <tr>
                    {tableHead.map((title, index) => {
                      return (
                        <th
                          className="text-bozz-two font-semibold capitalize text-md"
                          key={index}
                        >
                          {title}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                {current ? (
                  current.map((data, index) => {
                    return (
                      <tbody key={index}>
                        <tr
                          className="text-bozz-two border-b border-bozz-three h-8 text-xs text-center text-xs font-semibold"
                          key={index}
                        >
                          <td>{firstIndex + index + 1}</td>
                          <td>{data.event_name.slice(0, 20)}...</td>
                          <td>{data.start_date.slice(0, 10)}</td>
                          <td>{data.end_date.slice(0, 10)}</td>
                          <td>{formatCurrency(data.gross_ammount)}</td>
                          <td>{data.order_status}</td>
                          <td>
                            {data.order_status === "Complete Order" ? (
                              <label
                                htmlFor="my-modal-4"
                                className="btn btn-xs border border-white w-16 h-6 bg-bozz-three hover:bg-bozz-two text-bozz-six rounded-lg text-[10px]"
                                onClick={() =>
                                  onSet(
                                    data.id,
                                    data.partner,
                                    data.gross_ammount
                                  )
                                }
                              >
                                Pay
                              </label>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
                ) : (
                  <tr className="text-lg font-semibold text-bozz-one mt-10">
                    Belum Ada Order Yang Masuk
                  </tr>
                )}
              </table>
              <PayoutModal
                change={(e) => setImg(e.target.files[0])}
                payout={() => onPayout(payoutId)}
                partner={partner}
                total={total}
              />
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

export default ListOrderAdmin;
