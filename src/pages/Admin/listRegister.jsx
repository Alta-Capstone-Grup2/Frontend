import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutAdmin from "../../components/LayoutAdmin";
import Loading from "../../components/Loading";

const ListRegister = () => {
  const tableHead = [
    "No",
    "Company Name",
    "Register Date",
    "PIC Name",
    "Status",
    "Action",
  ];
  const [partnerData, setPartnerData] = useState();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setdataPerPage] = useState(10);
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const current = partnerData?.slice(firstIndex, lastIndex);
  const maxPage = Math.ceil(partnerData?.length / dataPerPage);
  const pages = [];
  for (let i = 1; i <= maxPage; i++) {
    pages.push(i);
  }
  const disabled =
    currentPage === Math.ceil(partnerData?.length / dataPerPage) ? true : false;
  const disableBack = currentPage === 1 ? true : false;
  const paginateBack = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1);
  };
  const paginateFront = () => setCurrentPage(currentPage + 1);

  const onVerify = (id) => {
    navigate("/admin/verify-partner", {
      state: {
        id: id,
      },
    });
  };
  const onDetailPartner = (id) => {
    navigate("/profilepartner", {
      state: {
        id: id,
      },
    });
  };

  const getDataPartner = async () => {
    await axios
      .get(`https://irisminty.my.id/partners/register`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setPartnerData(data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getDataPartner();
  }, []);

  return (
    <>
      {partnerData ? (
        <LayoutAdmin>
          <div className="mt-5 w-full h-full">
            <h1 className="text-xl font-bold text-bozz-one mb-3">
              List Register Partner
            </h1>
            <div className="p-5 bg-white rounded-lg">
              <table className="w-full table-auto">
                <thead className="border-b-2 border-bozz-two">
                  <tr>
                    {tableHead.map((title, index) => {
                      return (
                        <th className="text-bozz-two font-semibold" key={index}>
                          {title}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {current ? (
                    current.map((data, index) => {
                      return (
                        <tr
                          className="text-bozz-two h-8 text-xs border-b-2 border-bozz-two h-10 text-center"
                          key={index}
                        >
                          <td>
                            <p
                              className="hover:underline"
                              onClick={() => onDetailPartner(data.id)}
                            >
                              {firstIndex + index + 1}
                            </p>
                          </td>
                          <td>{data.company_name}</td>
                          <td>{data.register_date.slice(0, 10)}</td>
                          <td>{data.pic_name}</td>
                          <td>{data.verification_status}</td>
                          <td>
                            {data.verification_status === "Not Verified" ||
                            data.verification_status === "Revision" ? (
                              <button
                                className="w-16 h-6 text-center py-0 bg-bozz-two text-bozz-six rounded-lg hover:bg-bozz-three hover:scale-110"
                                onClick={() => onVerify(data.id)}
                              >
                                Verify
                              </button>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
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

export default ListRegister;
