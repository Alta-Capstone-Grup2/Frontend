import React, { useState, useEffect } from "react";
import Background from "../../assets/shoes.jpg";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../../validations/validations";
import { apiRequest } from "../../services/api";
import InputReg from "../../components/inputReg";
import InputRegPwd from "../../components/inputRegPwd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterUser = () => {
  const [seePwd, setSeePwd] = useState(false);
  const [seePwdConf, setSeePwdConf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const allCity = JSON.parse(localStorage.getItem("city"));
  const [city, setCity] = useState();
  const navigate = useNavigate();

  const getAllCity = async () => {
    apiRequest(`city`, `GET`, null).then((res) => {
      setCity(res.data);
      localStorage.setItem("city", JSON.stringify(res.data));
    });
  };

  useEffect(() => {
    getAllCity();
  }, []);

  const onSubmit = async () => {
    setLoading(true);
    const body = new FormData();
    body.append("name", values.username);
    body.append("email", values.email);
    body.append("password", values.password);
    body.append("gender", values.gender);
    body.append("address", values.address);
    body.append("city", values.city);
    body.append("phone", values.phone);
    body.append("client_image_file", image);
    // console.log([...body])

    apiRequest(`clients`, `POST`, body, `multipart/form-data`)
      .then((res) => {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register Successfull, Let's Login...",
          showConfirmButton: true,
        });
        // console.log(res)
        navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${err.response.data.message}`,
          showConfirmButton: true,
        });
        // console.log(err.response.data.message)
      });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        phone: "",
        gender: "Male",
        city: "",
        address: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
      onSubmit,
    });

  // console.log(allCity)
  return (
    <div className={`md:h-screen h-full w-screen relative`}>
      <img
        src={Background}
        className="w-full md:h-full min-h-screen object-fill relative"
      />
      <div className="absolute top-0 lg:px-56 md:px-24 px-12 py-5 w-full h-full flex justify-center">
        <div className="card rounded-[50px] lg:w-[80%] w-full bg-bozz-five px-12 py-5 h-full flex flex-col shadow-[6px_6px_6px_rgba(83,62,133,0.5)]">
          <h1 className="text-center font-bold text-xl text-bozz-one">
            REGISTER USER
          </h1>
          {/* <div className='card rounded-[47px] w-[80%] h-[90%] border border-bozz-one flex flex-col justity- p-10 px-24 shadow-[6px_6px_6px_rgba(83,62,133,0.5)] bg-bozz-six'> */}
          <form onSubmit={handleSubmit} className="w-full px-12">
            <InputReg
              title="username"
              id="username"
              placeholder="username123"
              value={values.username}
              check1={errors.username}
              check2={touched.username}
              change={handleChange}
              blur={handleBlur}
            />
            <div className="flex justify-between flex-col md:flex-row md:gap-5 gap-1">
              <InputReg
                title="email"
                id="email"
                placeholder="username123@gmail.com"
                value={values.email}
                check1={errors.email}
                check2={touched.email}
                change={handleChange}
                blur={handleBlur}
              />
              <InputReg
                title="Phone"
                id="phone"
                placeholder="08912345678"
                value={values.phone}
                check1={errors.phone}
                check2={touched.phone}
                change={handleChange}
                blur={handleBlur}
              />
            </div>
            <div className="flex justify-between flex-col md:flex-row md:gap-5 gap-1">
              <div
                className="form-control mt-3 w-full"
                type="gender"
                id="gender"
                value={values.gender}
              >
                <p className="label-text text-bozz-one">Gender</p>
                <div className="flex gap-5">
                  <label htmlFor="male" className="label cursor-pointer w-20">
                    <input
                      id="male"
                      type="radio"
                      name="gender"
                      value="Male"
                      className="radio peer/male checked:bg-blue-500 border-bozz-two"
                      onChange={handleChange}
                      checked={values.gender === "Male" ? true : false}
                    />
                    <span className="label-text peer-checked/female:text-bozz-two peer-checked/male:font-semibold">
                      Male
                    </span>
                  </label>
                  <label htmlFor="female" className="label cursor-pointer w-20">
                    <input
                      id="female"
                      type="radio"
                      name="gender"
                      value="Female"
                      className="radio peer/female checked:radio-error border-bozz-two"
                      onChange={handleChange}
                      checked={values.gender === "Female" ? true : false}
                    />
                    <span className="label-text peer-checked/female:text-bozz-two peer-checked/female:font-semibold">
                      Female
                    </span>
                  </label>
                </div>
              </div>
              <div className="form-control mt-3 w-full">
                <p className="label-text text-bozz-one">City</p>
                <select
                  className="bg-bozz-five border border-bozz-one text-xs text-bozz-one h-10 rounded-lg w-full"
                  id="city"
                  value={values.city}
                  onChange={handleChange}
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
            </div>
            <InputReg
              title="address"
              id="address"
              placeholder="Jln. Cempaka no.223"
              value={values.address}
              check1={errors.address}
              check2={touched.address}
              change={handleChange}
              blur={handleBlur}
            />
            <div className="form-control w-full">
              <label className="label mb-[-10px]">
                <span className="label-text text-bozz-one capitalize">
                  Profile Image
                </span>
              </label>
              <input
                type="file"
                id="file"
                placeholder="Input image"
                className={`border border-bozz-one rounded-lg h-10 focus:outline-none focus:ring-2 focus:ring-bozz-two text-xs px-3 w-full bg-bozz-five caret-text-bozz-one text-bozz-one file:bg-bozz-one file:h-full rounded-none px-0`}
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
            <div className="flex gap-5">
              <InputRegPwd
                title="password"
                id="password"
                placeholder="08912345678"
                value={values.password}
                check1={errors.password}
                check2={touched.password}
                change={handleChange}
                blur={handleBlur}
              />
              <InputRegPwd
                title="confirmPassword"
                id="confirmPassword"
                placeholder="08912345678"
                value={values.confirmPassword}
                check1={errors.confirmPassword}
                check2={touched.confirmPassword}
                change={handleChange}
                blur={handleBlur}
              />
            </div>

            {/* <a className="text-bozz-one text-xs mt-2 underline">Forgot Your Password?</a> */}
            <div className="flex justify-center mt-3">
              <button
                className="bg-bozz-one text-bozz-six h-10 w-36 rounded-lg text-sm focus:border-none focus:ring-2 focus:ring-bozz-two"
                type="submit"
                onClick={() => onSubmit()}
              >
                Register
              </button>
            </div>
            <p className="text-bozz-one text-sm mt-3 text-center">
              Have an account ?
              <Link to="/login" className="font-semibold cursor-pointer">
                Login
              </Link>
            </p>
          </form>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
