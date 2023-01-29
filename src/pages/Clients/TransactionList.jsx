import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import TableTransaction from "../../components/TableTransaction";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const TransactionList = () => {
  const [order, setOrder] = useState();
  const navigate = useNavigate();

  const getOrder = async () => {
    await axios
      .get(`https://irisminty.my.id/clients/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        const data = res.data.data.reverse();
        setOrder(data);
      })
      .catch((err) => {});
  };

  const onDetail = (id) => {
    navigate("/detail-transaction", {
      state: {
        id: id,
      },
    });
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>

      <div className="bg-white min-h-screen h-full">
        <Navbar />
        <div className="container mx-auto px-10 py-10 text-black bg-white h-screen">
          <div className="overflow-x-auto border border-bozz-one rounded p-5 shadow-lg text-gray.700">
            <table className=" w-full bg-white ">
              <thead>
                <tr className="text-left px-3 border-b border-bozz-one">
                  <th>No</th>
                  <th className="text-base">Event Name</th>
                  <th className="text-base">Service Name</th>
                  <th className="text-base">Start Date</th>
                  <th className="text-base">End Date</th>
                  <th className="text-base">Price</th>
                  <th className="text-base">Status</th>
                  <th className="text-base">Action</th>
                </tr>
              </thead>
              {order ? (
                order.map((item, i) => {
                  return (
                    <tbody key={i}>
                      <TableTransaction
                        no={i + 1}
                        eventName={item.EventName}
                        serviceName={item.ServiceName}
                        startDate={item.StartDate}
                        endDate={item.EndDate}
                        eventLocation={item.EventLocation}
                        price={item.GrossAmmount}
                        orderStatus={item.OrderStatus}
                        onDetail={() => onDetail(item.ID)}
                      />
                    </tbody>
                  );
                })
              ) : (
                <tbody>
                  <tr>
                    <td>Anda belum memiliki transaksi</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionList;
