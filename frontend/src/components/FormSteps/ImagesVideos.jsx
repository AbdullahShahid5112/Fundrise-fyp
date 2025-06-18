import React, { useState } from 'react';
import { FormInput,FileUpload } from '../Form/inputfields';

const ImagesVideos = ({ formData, setFormData, onNext }) => {
  const [videoType, setVideoType] = useState("YouTube");

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleVideoTypeChange = (e) => {
    setVideoType(e.target.value);
    setFormData((prev) => ({ ...prev, videoType: e.target.value, videoID: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
      <FileUpload label="Upload Logo" name="logo" onChange={handleChange} />
      <FileUpload label="Banner Image" name="banner" onChange={handleChange} />
      <FileUpload label="Product/Service Image" name="productImage" onChange={handleChange} note="Max: 10MB" />

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-black">Video</label>
        <p className="text-sm text-gray-600 mb-2">
          Insert only the video ID<br />
          <strong>YouTube</strong> = <code>EkYirtVHsK0</code> &nbsp;&nbsp; <strong>Vimeo</strong> = <code>76357912</code>
        </p>

        <div className="flex gap-4 mb-2">
          {["YouTube", "Vimeo", "Upload"].map((option) => (
            <label key={option} className="flex items-center text-sm text-black">
              <input
                type="radio"
                value={option}
                checked={videoType === option}
                onChange={handleVideoTypeChange}
                className="mr-1"
              />
              {option}
            </label>
          ))}
        </div>

        {videoType === "Upload" ? (
          <FileUpload name="videoFile" label="Upload Video" accept="video/*" onChange={handleChange} />
        ) : (
          <FormInput
            label="Video ID"
            name="videoID"
            value={formData.videoID || ""}
            onChange={handleChange}
            placeholder={videoType === "YouTube" ? "e.g. EkYirtVHsK0" : "e.g. 76357912"}
          />
        )}
      </div>

      <button type="submit" className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save & Continue
      </button>
    </form>
  );
};

export default ImagesVideos;
