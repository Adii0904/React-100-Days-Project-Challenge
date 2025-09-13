import React, { useState } from "react";

const ImageResize = () => {
  const [srcImage, setSrcImage] = useState("/img1.jpg");
  const [resizedImage, setResizedImage] = useState("/img1.jpg");

  const [form, setForm] = useState({
    width: "",
    height: "",
  });

  const resizeImage = (e) => {
    e.preventDefault();
    const image = new Image();
    image.src = srcImage;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const targetWidth = parseInt(form.width);
      const targetHeight = parseInt(form.height);
      canvas.height = targetHeight;
      canvas.width = targetWidth;
      //to get the context of the canvas Dimnension;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
      const imageString = canvas.toDataURL("image/png");
      setResizedImage(imageString);
    };
  };

  const hadnleChange = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const showImage = (e) => {
    const input = e.target;
    const filePath = input.files[0];

    // if we want to create local url for the image locally
    const url = URL.createObjectURL(filePath);
    setSrcImage(url);
  };

  return (
    <div className="bg-gray-200 min-h-screen py-12">
      <div className="mx-auto w-10/12 bg-white rounded-xl p-8 grid grid-cols-2 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Image Resizer</h1>
          <div className="relative h-[500px] bg-slate-800 rounded-xl p-4">
            <img
              src={srcImage}
              className="rounded-lg w-full h-full object-contain"
            />
            <input
              onChange={showImage}
              accept="image/*"
              type="file"
              className="absolute top-0 left-0 rounded-xl h-full w-full opacity-0 hover:cursor-pointer"
            />
          </div>
          <div className="mt-4">
            <form className="space-x-4" onSubmit={resizeImage}>
              <input
                required
                name="width"
                placeholder="width"
                className="border border-gray-300 rounded p-2"
                onChange={hadnleChange}
                disabled={srcImage === "/img1.jpg"}
                type="number"
              />
              <input
                required
                name="height"
                placeholder="height"
                className="border border-gray-300 rounded p-2"
                onChange={hadnleChange}
                disabled={srcImage === "/img1.jpg"}
                type="number"
              />
              <button
                disabled={srcImage === "/img1.jpg"}
                className="bg-indigo-600 text-white font-medium py-2 px-8 rounded-xl"
              >
                Resize
              </button>
            </form>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Image Result</h1>

          <div className=" h-[500px] bg-slate-800 rounded-lg p-4 flex items-center justify-center overflow-auto">
            <img
              src={resizedImage}
              className="rounded-lg"
              style={{
                width: form.width,
                height: form.height,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageResize;
