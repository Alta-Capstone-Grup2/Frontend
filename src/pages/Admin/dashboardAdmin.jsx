import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutAdmin from "../../components/LayoutAdmin";
import Loading from "../../components/Loading";
import { SlUserFollow } from "react-icons/sl";
import { FaRegHandshake } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { apiWithAuth } from "../../services/api";
import { Chart as ChartJS, registerables } from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
ChartJS.register(...registerables);

const DashboardAdmin = () => {
  const navigate = useNavigate();

  const [totalReg, setTotalReg] = useState();
  const [totalVerify, setTotalVerify] = useState();
  const [totalUser, setTotalUser] = useState();
  const [totalOrder, setTotalOrder] = useState();
  const token = localStorage.getItem("userToken");
  const labels = [
    "Waiting For Payment",
    "Waiting Confirmation",
    "Order Confirmed",
    "Complete Order",
    "Paid Off",
  ];
  const labelsUser = ["Client", "Partner", "Admin"];
  const dataOrder = [],
    dataUsers = [];
  const [orderData, setOrderData] = useState();
  const [usersData, setUsersData] = useState();

  const getPartners = async () => {
    apiWithAuth(`partners`, `GET`, null, "application/json", token).then(
      (res) => {
        const total = res.data.length;
        const verify = res.data.filter(
          (item) => item.verification_status == "Verified"
        ).length;

        setTotalReg(total);
        setTotalVerify(verify);
      }
    );
  };

  const getClients = async () => {
    apiWithAuth(`clients`, `GET`, null, "application/json", token).then(
      (res) => {
        setTotalUser(res.data.length);
      }
    );
  };

  const getUsers = async () => {
    apiWithAuth(`users`, `GET`, null, "application/json", token).then((res) => {
      labelsUser.map((item, i) => {
        const thisRole = res.data.filter((user) => user.role == item).length;
        dataUsers[i] = thisRole;
      });

      setUsersData(dataUsers);
    });
  };
  const getOrder = async () => {
    apiWithAuth(`orders`, `GET`, null, "application/json", token)
      .then((res) => {
        const total = res.data.length;
        setTotalOrder(res.data.length);
        labels.map((item, i) => {
          const thisTotal = res.data.filter(
            (order) => order.order_status == item
          ).length;
          dataOrder[i] = thisTotal;
        });

        setOrderData(dataOrder);
      })
      .catch();
  };
  useEffect(() => {
    getPartners();
    getClients();
    getOrder();
    getUsers();
  }, []);

  return (
    <>
      {totalReg &&
      totalUser &&
      totalVerify &&
      totalOrder &&
      orderData &&
      usersData ? (
        <LayoutAdmin>
          <div className="mt-2 w-full h-full">
            <h1 className="text-bozz-one  text-center font-semibold mb-5 text-2xl drop-shadow-[1px_1px_1px_#352360]">
              EO-Bozz Statistic
            </h1>
            <div className="flex gap-3 justify-between py-2">
              <div className="w-40 h-32 border-t-4 border-bozz-one bg-white shadow-xl p-3 text-center">
                <div className="flex justify-center">
                  <SlUserFollow className="text-bozz-one text-center text-2xl" />
                </div>
                <p className="text-lg font-bold text-bozz-one mt-3">
                  {totalUser}
                </p>
                <p className="text-xs font-semibold text-bozz-one">
                  Total Users
                </p>
              </div>
              <div className="w-40 h-32 border-t-4 border-bozz-two bg-white shadow-xl p-3 text-center">
                <div className="flex justify-center">
                  <FaRegHandshake className="text-bozz-two text-center text-2xl" />
                </div>
                <p className="text-lg font-bold text-bozz-two mt-3">
                  {totalReg}
                </p>
                <p className="text-xs font-semibold text-bozz-two">
                  Total Partner Register
                </p>
              </div>
              <div className="w-40 h-32 border-t-4 border-bozz-three bg-white shadow-xl p-3 text-center">
                <div className="flex justify-center">
                  <MdOutlineVerified className="text-bozz-three text-center text-2xl" />
                </div>
                <p className="text-lg font-bold text-bozz-three mt-3">
                  {totalVerify}
                </p>
                <p className="text-xs font-semibold text-bozz-three">
                  Total Partner Terverifikasi
                </p>
              </div>
              <div className="w-40 h-32 border-t-4 border-green-600 bg-white shadow-xl p-3 text-center">
                <div className="flex justify-center">
                  <IoCartOutline className="text-green-600 text-center text-2xl" />
                </div>
                <p className="text-lg font-bold text-green-600 mt-3">
                  {totalOrder}
                </p>
                <p className="text-xs font-semibold text-green-600">
                  Total Transaction
                </p>
              </div>
            </div>

            <div className="flex justify-between h-92">
              <div className="border border-bozz-one bg-white shadow-xl mt-3 w-[65%] h-full">
                <h1 className="text-bozz-two text-center  font-semibold">
                  EO-Bozz'S Orders
                </h1>
                <div style={{ maxWidth: "550px" }}>
                  <Bar
                    data={{
                      labels: labels,
                      datasets: [
                        {
                          label: "Total Order",
                          data: orderData,
                          backgroundColor: [
                            "orange",
                            "#488fb1",
                            "#3056D3",
                            "green",
                            "#533e85",
                          ],
                          borderColor: [
                            "yellow",
                            "#488fb1",
                            "#3056D3",
                            "green",
                            "#533e85",
                          ],
                          borderWidth: 0.5,
                        },
                      ],
                    }}
                    // height={250}
                    options={{
                      legend: {
                        labels: {
                          fontSize: 15,
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <div className="border border-bozz-one bg-white shadow-xl mt-3 w-[30%] h-full">
                <h1 className="text-bozz-two text-center font-semibold">
                  EO-Bozz'S Users
                </h1>
                <div style={{ maxWidth: "550px" }}>
                  <Pie
                    data={{
                      labels: labelsUser,
                      datasets: [
                        {
                          label: "Total Users",
                          data: usersData,
                          backgroundColor: ["#488fb1", "#3056D3", "#533e85"],
                          borderColor: ["#488fb1", "#3056D3", "#533e85"],
                          borderWidth: 0.5,
                        },
                      ],
                      hole: 0.4,
                      type: "pie",
                    }}
                    height={250}
                    options={{
                      legend: {
                        labels: {
                          fontSize: 12,
                        },
                      },
                    }}
                  />
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

export default DashboardAdmin;
