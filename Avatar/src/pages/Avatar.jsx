import React, { useEffect, useOptimistic, useState } from "react";
import "remixicon/fonts/remixicon.css";
import "animate.css";
import { ToastContainer, toast } from "react-toastify";
function Avatar() {
  const [src, setSrc] = useState(null);
  const [option, setOption] = useState("male");
  const data = [
    {
      label: "Illustrator",
      value: "illustrator",
      url: "https://api.dicebear.com/7.x/avataaars/svg?seed=",
    },

    {
      label: "Art",
      value: "art",
      url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=",
    },
    {
      label: "Male",
      value: "male",
      url: "https://randomuser.me/api/portraits/men",
    },

    {
      label: "Female",
      value: "female",
      url: "https://randomuser.me/api/portraits/women",
    },
  ];

  const generateNumForPerson = () => {
    const random = Math.floor(Math.random() * 99) + 1;
    return random;
  };

  const onOptionChange = (e) => {
    setOption(e.target.value);
  };

  const genearte = () => {
    const obj = data.find((data) => data.value == option);
    const url = obj.url;
    if (option == "male" || option == "female") {
      const imageURL = `${url}/${generateNumForPerson()}.jpg`;
      setSrc(imageURL);
    } else {
      const uniqueValue = Date.now();
      const imageURL = `${url}/${uniqueValue}`;
      setSrc(imageURL);
    }
  };

  //for downloading the image url
  const download = (srcURL) => {
    console.log("Download triggered");
    alert("Download started!");

    const a = document.createElement("a");
    a.href = srcURL;
    a.download = `${Date.now()}.jpg`; // or dynamic extension
    document.body.appendChild(a);
    setTimeout(() => {
      a.click();
    }, 0);

    document.body.removeChild(a);
  };

  const copy = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied", {
      position: "top-center",
    });
  };

  useEffect(() => {
    genearte();
  }, [option]);

  return (
    <div className=" animate__animated animate__fadeIn overflow-hidden min-h-screen bg-gradient-to-br from-slate-900 via-salte-800 to-slate-900 flex items-center justify-center text-white">
      <div className="gap-8 flex flex-col items-center animate__animated animate__backInDown w-full max-w-md rounded-2xl shadow-xl backdrop-blur-xl border border-slate-700 p-10">
        <img
          src={src || "./avt1.png"}
          className="w-32 h-32 rounded-full border-slate-700 shadow-lg object-cover"
        />

        <div className="text-center">
          <h1 className="tracking-wide text-3xl font-bold text-white">
            Avator Generator
          </h1>
          <p className="text-slate-300">
            Generate Unlimited Avatars For Your Website
          </p>
        </div>

        <div className="w-full space-y-4">
          <select
            className="bg-slate-900/60 w-full rounded-xl p-3"
            value={option}
            onChange={onOptionChange}
          >
            {data.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
          <div className="bg-slate-900/60 w-full rounded-xl p-3">{src}</div>
        </div>

        <div className="w-full flex gap-4">
          <button
            onClick={genearte}
            className="flex-1 bg-gradient-to-r from-rose-500 to-orange-600 font-medium rounded-lg hover:scale-105 transition-transform hover:cursor-pointer px-2 py-1"
          >
            <i className="ri-arrow-right-up-line mr-1"></i>
            Change
          </button>

          <button
            onClick={() => download(src)}
            className=" flex-1 bg-gradient-to-r from-green-500 to-cyan-600 font-medium rounded-lg hover:scale-105 transition-transform hover:cursor-pointer px-2 py-1"
          >
            <i className="ri-download-line mr-1"></i>
            Download
          </button>

          <button
            onClick={() => copy(src)}
            className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 font-medium rounded-lg hover:scale-105 transition-transform hover:cursor-pointer px-2 py-1"
          >
            <i className="ri-file-copy-line mr-1"></i>
            Copy
          </button>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default Avatar;
