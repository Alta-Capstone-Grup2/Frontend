import React, { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { loginSchema } from "../validations/validations";
import { apiRequest } from "../services/api";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import imgLogin from "../assets/shoes.jpg";
import Swal from "sweetalert2";
import Oauth from "./Oauth/oAuth";

const Login = () => {
  const [role, setRole] = useState("");
  const [seePwd, setSeePwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies(["userToken"]);
  const [allCity, setAllCity] = useState();
  const navigate = useNavigate();

  const onSubmit = async () => {
    setLoading(true);
    const body = { email: values.email, password: values.password };
    apiRequest(`login`, `POST`, body)
      .then((res) => {
        setRole(res.data.role);
        setCookie("name", res.data.name, { path: "/" });
        setCookie("id", res.data.id, { path: "/" });
        setCookie("partner_id", res.data.partner_id, { path: "/" });
        setCookie("role", res.data.role, { path: "/" });
        setCookie("token", res.data.token, { path: "/" });

        const data = res.data;
        localStorage.setItem("name", data.name);
        localStorage.setItem("id", data.id);
        localStorage.setItem("partner_id", data.partner_id);
        localStorage.setItem("idclient", data.client_id);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userToken", data.token);

        if (res.data.role == "Partner") {
          navigate("/partner/");
        } else if (res.data.role == "Admin") {
          navigate("/admin/");
        } else {
          navigate("/");
        }

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successfull",
          showConfirmButton: true,
        });
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Login gagal, coba lagi nanti.`,
          showConfirmButton: true,
        });
      });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });
  const onRegister = () => {
    if (role === "partner") {
      navigate("/register/partner");
    } else if (role === "clients") {
      navigate("/register/user");
    }
  };

  const getAllCity = async () => {
    apiRequest(`city`, `GET`, null).then((res) => {
      setAllCity(res.data);
      localStorage.setItem("city", JSON.stringify(res.data));
    });
  };

  useEffect(() => {
    getAllCity();
  }, []);
  return (
    <div className="flex h-screen w-screen bg-white">
      <div className={`lg:w-[55%] w-full block`}>
        <img
          src={imgLogin}
          className="w-full h-full object-fill rounded-[1px] lg:rounded-[0_110px_110px_0]"
        />
      </div>
      <div className="lg:w-[45%] w-full h-full grid place-items-center p-10 absolute lg:static">
        {role === "" ? (
          <div className="card rounded-[47px] w-[80%] h-[90%] border border-bozz-one flex flex-col justity- p-10 px-24 shadow-[6px_6px_6px_rgba(83,62,133,0.5)] bg-bozz-six">
            <h2 className="text-bozz-one font-bold text-center text-xl mb-10">
              LOGIN AS
            </h2>
            <button
              className="bg-bozz-five text-bozz-one w-full h-12 rounded-xl font-bold border border-bozz-one hover:scale-110"
              onClick={() => setRole("clients")}
            >
              User
            </button>
            <p className="text-black text-center my-3 text-xs">OR</p>
            <button
              className="bg-bozz-five text-bozz-one w-full h-12 rounded-xl font-bold border border-bozz-one hover:scale-110"
              onClick={() => setRole("partner")}
            >
              Partner
            </button>
            <p className="text-black text-center my-3 text-xs">OR</p>
            <button
              className="bg-bozz-five text-bozz-one w-full h-12 rounded-xl font-bold border border-bozz-one hover:scale-110"
              onClick={() => setRole("admin")}
            >
              Admin
            </button>
          </div>
        ) : (
          <div className="card rounded-[47px] w-[80%] h-[95%] border border-bozz-one flex flex-col justity- p-10 px-24 shadow-[6px_6px_6px_rgba(83,62,133,0.5)] bg-bozz-six">
            <h2 className="text-bozz-one font-bold text-center text-xl mb-2">
              LOGIN AS {role.toUpperCase()}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control w-full">
                <label className="label mb-[-10px]">
                  <span className="label-text text-bozz-one">Email</span>
                </label>
                <input
                  type="email"
                  value={values.email}
                  id="email"
                  placeholder="your_email@mail.com"
                  className={`input input-bordered ${
                    errors.email && touched.email
                      ? `border-red-700`
                      : `border-bozz-one`
                  } w-full bg-bozz-five caret-text-bozz-one text-bozz-one`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="text-xs text-red-700">{errors.email}</p>
                ) : null}
              </div>
              <div className="form-control w-full">
                <label className="label mb-[-10px]">
                  <span className="label-text text-bozz-one text-sm">
                    Password
                  </span>
                </label>
                <div className="flex">
                  <div className="relative w-full">
                    <div
                      className="absolute top-3 right-3 items-center"
                      onClick={() => setSeePwd(!seePwd)}
                    >
                      {seePwd ? (
                        <FaRegEye className="text-bozz-one" />
                      ) : (
                        <FaRegEyeSlash className="text-bozz-one" />
                      )}
                    </div>
                    <input
                      value={values.password}
                      id="password"
                      type={seePwd ? `text` : "password"}
                      className={`input ${
                        errors.password && touched.password
                          ? `border-red-700`
                          : `border-bozz-one`
                      }  bg-bozz-five text-bozz-one w-full caret-bozz-one`}
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                {errors.password && touched.password ? (
                  <p className="text-xs text-red-700">{errors.password}</p>
                ) : null}
              </div>
              <a className="text-bozz-one text-xs mt-1">
                Forgot Your Password?
              </a>
              <div className="flex justify-center">
                <button
                  className="bg-bozz-one text-bozz-six h-[40px] w-full mt-3 rounded-lg"
                  type="submit"
                >
                  Login
                </button>
              </div>
              {role == "clients" && (
                <>
                  <div className="divider divider-gray-600 text-gray-700 h-3 text-xs">
                    OR
                  </div>
                  <Oauth />
                </>
              )}
              {role !== "admin" ? (
                <p className="text-bozz-one text-sm mt-3">
                  Dont have an account ?
                  <a
                    className="font-semibold cursor-pointer"
                    onClick={() => onRegister()}
                  >
                    {" "}
                    Register
                  </a>
                </p>
              ) : null}

              <p
                className="underline text-bozz-one text-xs font-semibold text-center mt-3"
                onClick={() => setRole("")}
              >
                Choose Login
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
