import React, { useEffect, useState } from "react";
import "animate.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "remixicon/fonts/remixicon.css";

function ImageFinder() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setpage] = useState(1);
  const [restImage, setResetImage] = useState(12);
  const [query, setQury] = useState("people");
  const api_KEY = "rouLvqA6iGmA4JxK4x6HDTdRrdQsObuMpHSR3qSmje4Eak2EBMl51QmE";

  const fetchImage = async () => {
    try {
      setLoading(true);
      const options = {
        headers: {
          Authorization: api_KEY,
        },
      };
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${restImage}`,
        options
      );
      const data = res.data.photos;
      setPhotos([...photos, ...data]);
    } catch (err) {
      toast.error("Some Error Occured" + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setpage(page + 1);
  };
  const lessMore = () => {
    const updatedPhotos = photos.slice(0, photos.length - 12);
    setPhotos(updatedPhotos);
    toast.info("Last 12 images removed!");
  };

  const searchResult = (e) => {
    e.preventDefault();
    setPhotos([]);
    // console.log(e.target.children[0].value.trim().tolowerCase());
    setQury(e.target.children[0].value.trim().toLowerCase());
  };

  useEffect(() => {
    fetchImage();
  }, [page, query]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-4 animate__animated animate__fadeIn">
      <h1 className="text-4xl font-bold text-center text-indigo-600">
        Image Finder Gallery 📸
      </h1>
      {/* This section is for the image input find section and search section; */}
      <form className="space-x-1 mt-4" onSubmit={(e) => searchResult(e)}>
        <input
          placeholder="enter your text"
          className="rounded-l-lg p-3 bg-white w-[300px] focus:outline-indigo-600"
        />
        <button className="bg-gradient-to-br from-indigo-600 via-red-900 px-6 py-3 text-white font-semibold rounded-r-lg hover:cursor-pointer hover:scale-105 hover:transition hover:transform">
          search
        </button>
      </form>

      {photos.length == 0 && (
        <h1 className="text-3xl text-red-600 font-bold mt-4">
          Search Result Not Found
        </h1>
      )}

      {/* this is for the image showcase feild data section; */}
      <div className="grid lg:grid-cols-4 lg:gap-12 gap-8 w-9/12 mt-4">
        {photos.map((item, index) => {
          return (
            <div key={index}>
              <img
                src={item.src.medium}
                alt={item.alt}
                className="w-full h-[180px] object-cover hover:shadow-cyan-700 hover:shadow-2xl transition transform-view hover:scale-105 backdrop-blur-xl duration-300"
              />
              <div>
                <h1 className="text-xl font-medium  duration-300">
                  {item.photographer}
                </h1>

                <a
                  target="_blank"
                  href={item.src.original}
                  className="mt-2 block bg-green-500 font-bold rounded-lg py-2 text-center px-4"
                >
                  <i className="ri-download-line mr-1" /> Download
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {loading && (
        <span>
          <i className="ri-loader-2-line text-7xl text-gray-600 animate-spin inline-block"></i>
        </span>
      )}

      {photos.length > 0 && (
        <div className="flex gap-4">
          <button
            onClick={loadMore}
            className="bg-rose-600 text-white font-medium text-lg hover:shadow-cyan-700 hover:shadow-2xl transition transform-view hover:scale-105 py-4 px-12 rounded-lg mt-8 hover:cursor-pointer"
          >
            Load More
          </button>

          <button
            onClick={lessMore}
            className="bg-orange-600 text-white font-medium text-lg hover:shadow-cyan-700 hover:shadow-2xl transition transform-view hover:scale-105 py-4 px-12 rounded-lg mt-8 hover:cursor-pointer"
          >
            Show Less
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default ImageFinder;
