import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { AiOutlineStar } from "react-icons/ai";

const Rating = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="container mx-auto px-10 py-10 justify-center text-black ">
        <div className="grid grid-cols-2 lg:grid-cols-2 my-3">
          <div className="border mx-5 px-10 rounded-lg bg-bozz-five">
            <h1 className="text-4xl">Review Order</h1>
            <div className="flex flex-col py-3">
              <label className="">Purchase Date</label>
              <input
                type="text"
                disabled
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col py-3">
              <label>Package Name</label>
              <input
                type="text"
                disabled
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col py-3">
              <label>Package Price</label>
              <input
                type="text"
                disabled
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col py-3">
              <label>Event Date Start</label>
              <input
                type="text"
                disabled
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col py-3">
              <label>Status</label>
              <input
                type="text"
                disabled
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="border mx-5 px-10 rounded-lg bg-bozz-five">
            <h1 className="text-4xl">How To Pay</h1>
            <div className="my-5">
              <div className="my-5">
                <p className="text-xl">Bank Virtual Account</p>
                <p className="text-xl">Number virtual account</p>
              </div>
              <div>
                <p className="text-xl">Total Pembayaran</p>
                <p className="text-xl">RP.12.000.000</p>
              </div>
              <div className="text-center my-10">
                <h1 className="text-2xl my-3">Batas akhir pembayaran</h1>
                <p className="text-xl">Sabtu, 30 Des 2022 19:53 WIB</p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5">
          <h1>Berikan Rating untuk EO</h1>
          <div>
            <form className="py-3">
              <label className="flex text-2xl">
                Rating
                <AiOutlineStar className="mx-2 my-1" />
              </label>
              <input
                type="number"
                placeholder="1-10"
                className="input input-bordered w-full max-w-xs"
              />
              <label className="flex text-2xl py-5">Berikan Feedback</label>
              <textarea
                className="textarea textarea-bordered w-full max-w-xs"
                placeholder="Bio"
              ></textarea>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Rating;
