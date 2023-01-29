import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { FaEdit } from "react-icons/fa";
import CardProduct from "../../components/CardProduct";
import Art from "../../assets/art.png";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import axios from "axios";

const ProfilePartnerUser = () => {
  const navigate = useNavigate();
  const [partnerData, setPartnerData] = useState();
  const [listCompany, setListCompany] = useState();
  const location = useLocation();
  const id = location?.state?.id;

  const onClick = (id) => {
    navigate("/detail", {
      state: {
        id: id,
      },
    });
  };

  const getList = async () => {
    await axios
      .get(`https://irisminty.my.id/partners/${id}/services`, {
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

  const getPartner = async (id) => {
    await axios
      .get(`https://irisminty.my.id/partners/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => setListCompany(res.data.data));
  };

  useEffect(() => {
    getList();
    getPartner(id);
  }, []);

  return (
    <>
      {listCompany && partnerData ? (
        <div className="bg-bozz-six text-bozz-one">
          <Navbar />
          <div className="container mx-auto px-10 py-10">
            <div className="flex justify-center">
              <img
                src={listCompany?.company_image_file}
                className="h-32 w-32 rounded-full border border-bozz-one"
              />
              <div className="ml-10">
                <h1 className="text-3xl my-3 font-bold">
                  {listCompany?.company_name}
                </h1>
                <p className="text-xl flex">{listCompany?.company_address}</p>
                <p className="text-md flex">{listCompany?.link_website}</p>
              </div>
            </div>
            <div className="flex justify-center my-8">
              <div className="px-10 mx-5 border border-bozz-one rounded-md ">
                <p className="text-xl text-center">
                  <span className="font-semibold text-bozz-one">
                    {listCompany?.verification_status}
                  </span>
                  <br />
                  <span className="text-sm">Status</span>
                </p>
              </div>
            </div>
            <div className="divider bg-bozz-one h-0.5"></div>
            <div className="text-center my-5">
              <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                  <div
                    className="hero h-96"
                    style={{
                      backgroundImage: `url(${listCompany?.event1_image_file})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="hero-overlay bg-opacity-50"></div>
                    <div className="hero-content text-center text-bozz-two">
                      <div className="max-w-md text-bozz-six">
                        <h1 className="text-xl font-bold mb-16">
                          EVENT YANG PERNAH KAMI TANGANI{" "}
                        </h1>
                        <h1 className="text-xl font-bold mb-3">
                          {listCompany?.event1_name}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle">
                      ❮
                    </a>
                    <a href="#slide2" className="btn btn-circle">
                      ❯
                    </a>
                  </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                  <div
                    className="hero h-96"
                    style={{
                      backgroundImage: `url(${listCompany?.event2_image_file})`,
                    }}
                  >
                    <div className="hero-overlay bg-opacity-50"></div>
                    <div className="hero-content text-center text-neutral-content text-bozz-two">
                      <div className="max-w-md text-bozz-six">
                        <h1 className="text-xl font-bold mb-16">
                          EVENT YANG PERNAH KAMI TANGANI{" "}
                        </h1>
                        <h1 className="text-xl font-bold mb-3">
                          {listCompany.event2_name}{" "}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">
                      ❮
                    </a>
                    <a href="#slide3" className="btn btn-circle">
                      ❯
                    </a>
                  </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                  <div
                    className="hero h-96"
                    style={{
                      backgroundImage: `url(${listCompany?.event4_image_file})`,
                    }}
                  >
                    <div className="hero-overlay bg-opacity-50"></div>
                    <div className="hero-content text-center text-neutral-content text-bozz-two">
                      <div className="max-w-md text-bozz-six">
                        <h1 className="text-xl font-bold mb-16">
                          EVENT YANG PERNAH KAMI TANGANI{" "}
                        </h1>
                        <h1 className="text-xl font-bold mb-3">
                          {listCompany.event3_name}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex justify-between transform-translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">
                      ❮
                    </a>
                    <a href="#slide1" className="btn btn-circle">
                      ❯
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="divider bg-bozz-one h-0.5"></div>
            <div className>
              <h1 className="text-2xl font-bold text-center">LIST SERVICE</h1>
              <div className="grid gird-cols-2 lg:grid-cols-3 mt-5">
                {partnerData ? (
                  partnerData.map((item, i) => {
                    return (
                      <div key={i}>
                        <CardProduct
                          img={item.service_image_file}
                          name={item.service_name}
                          rating={item.average_rating}
                          price={item.service_price}
                          company={listCompany.company_name}
                          click={() => onClick(item.id)}
                          city={item.city}
                        />
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProfilePartnerUser;
