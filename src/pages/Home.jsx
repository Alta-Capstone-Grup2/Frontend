import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import imgHome from "../assets/HomeImage.png";
import CardHome from "../components/CardHome";
import CardProduct from "../components/CardProduct";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiWithAuth } from "../services/api";
import { data } from "autoprefixer";
import cake from "../assets/cake-bunga.jpg";
import Wed from "../assets/wed2.jpg";
import Wed2 from "../assets/wed4.jfif";
import Logo from "../assets/logo2.png";
import photo from "../assets/photo.jpeg";
import Loading from "../components/Loading";

const Home = () => {
  const [data_service, setDataService] = useState();
  const [city, setCity] = useState();
  const [searchCategory, setSearchCategory] = useState();
  const [searchCity, setSearchCity] = useState();
  const [listCompany, setListCompany] = useState();

  const navigate = useNavigate();

  const getDataService = async () => {
    await axios
      .get(`https://irisminty.my.id/services`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        const data = res.data.data.reverse();
        // console.log(data)
        setDataService(data);
      })
      .catch((err) => {});
  };

  const getCity = async () => {
    await axios
      .get(`https://irisminty.my.id/city`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setCity(data);
      })
      .catch((err) => {});
  };

  const onDetail = (id) => {
    navigate("/detail", {
      state: {
        id: id,
      },
    });
  };

  const getCompany = async () => {
    apiWithAuth(
      `partners`,
      `GET`,
      null,
      "application/json",
      localStorage.getItem("userToken")
    ).then((res) => setListCompany(res.data));
  };

  useEffect(() => {
    getDataService();
    getCity();
    if (localStorage.getItem("userToken")) {
      getCompany();
    }
  }, []);

  return (
    <>
      <div className="bg-bozz-six">
        <Navbar />
        <div className="bg-bozz-one">
          <div className="container mx-auto py-20 px-20 text-white flex">
            <div className="px-10">
              <img
                src={Logo}
                className="w-40 drop-shadow-[0_6px_6px_#352360] mb-[-50px]"
              />
              <h1 className="text-bozz-two font-semibold my-2">
                Event Organizer Platform
              </h1>
              <p>
                A platform that help Clients and Event Organizer to connect
                easily
              </p>
              <button
                className="btn bg-bozz-two hover:bg-bozz-three border-none hover:ring-2 my-10 text-white"
                onClick={() => navigate("/about")}
              >
                About Us
              </button>
            </div>
            <div className="grid grid-cols-3 h-96 gap-3">
              <img
                className="mx-auto h-96 rounded-xl col-span-3 row-span-3 bg-clip-padding "
                src={photo}
                alt="home"
              />
            </div>
          </div>
        </div>
        <div className="container mx-auto flex justify-center px-10 py-10 text-black">
          {data_service ? (
            <CardHome
              dataCategory={data_service}
              dataCity={city}
              searchCategory={(e) => setSearchCategory(e.target.value)}
              searchCity={(e) => setSearchCity(e.target.value)}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="container mx-auto px-5 py-5 ">
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 md:grid-cols-">
            {data_service ? (
              data_service.map((item, i) => {
                let compName = "";
                listCompany?.map((company) => {
                  if (company.id == item.partner_id)
                    compName = company.company_name;
                  return <p> THIS {compName}</p>;
                });
                return (
                  <div key={i}>
                    <CardProduct
                      img={item.service_image_file}
                      keyId={item.id}
                      name={item.service_name}
                      rating={item.average_rating}
                      price={item.service_price}
                      click={() => onDetail(item.id)}
                      company={compName}
                      companyDetail={() =>
                        navigate("/profilepartner", {
                          state: { id: item.partner_id },
                        })
                      }
                      city={item.city}
                    />
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
          <div className="btn-group justify-center flex py-5">
            <button className="btn btn-ghost">«</button>
            <button className="btn btn-ghost">Page 22</button>
            <button className="btn btn-ghost">»</button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
