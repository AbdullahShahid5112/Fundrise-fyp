import React from 'react';
import { FormInput, FileUpload } from '../Form/inputfields';

const ImagesVideos = ({ formData, videoData, setFormData, setVideoData, onNext }) => {
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0]
    });
  };

  const handleVideoTypeChange = (e) => {
    const newVideoType = e.target.value;
    setVideoData({
      ...videoData,
      videoType: newVideoType,
      videoID: "",
      videoFile: null
    });
  };

  const handleVideoIDChange = (e) => {
    const { value } = e.target;
    setVideoData({
      ...videoData,
      videoID: value
    });
  };

  const handleVideoFileChange = (e) => {
    const { files } = e.target;
    setVideoData({
      ...videoData,
      videoFile: files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Images being submitted:", formData);
    console.log("Videos being submitted:", videoData);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-lg font-semibold mb-4 text-black">Images & Videos</h2>
      
      <FileUpload
        label="Upload Logo"
        name="logo"
        onChange={handleImageChange}
        accept="image/*"
      />
      
      <FileUpload
        label="Banner Image"
        name="banner"
        onChange={handleImageChange}
        accept="image/*"
      />
      
      <FileUpload
        label="Product/Service Image"
        name="productImage"
        onChange={handleImageChange}
        accept="image/*"
        note="Max: 10MB"
      />

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-black">Video</label>
        <p className="text-sm text-gray-600 mb-2">
          You can paste full YouTube/Vimeo URLs or just the ID<br />
          <strong>YouTube</strong> = <code>https://www.youtube.com/watch?v=EkYirtVHsK0</code> or <code>EkYirtVHsK0</code><br />
          <strong>Vimeo</strong> = <code>https://vimeo.com/76357912</code> or <code>76357912</code>
        </p>
        
        <div className="flex gap-4 mb-2">
          {["YouTube", "Vimeo", "Upload"].map((option) => (
            <label key={option} className="flex items-center text-sm text-black">
              <input
                type="radio"
                value={option}
                checked={videoData.videoType === option}
                onChange={handleVideoTypeChange}
                className="mr-1"
              />
              {option}
            </label>
          ))}
        </div>
        
        {videoData.videoType === "Upload" ? (
          <FileUpload 
            name="videoFile"
            label="Upload Video"
            accept="video/*"
            onChange={handleVideoFileChange}
          />
        ) : (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">
              {videoData.videoType} URL or ID
            </label>
            <input
              type="text"
              name="videoID"
              value={videoData.videoID || ""}
              onChange={handleVideoIDChange}
              placeholder={
                videoData.videoType === "YouTube" 
                  ? "e.g. https://www.youtube.com/watch?v=EkYirtVHsK0 or EkYirtVHsK0" 
                  : "e.g. https://vimeo.com/76357912 or 76357912"
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            />
          </div>
        )}
      </div>

      {/* Debug info */}
      <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
        <strong>Debug - Current media:</strong>
        <p>Images: {Object.keys(formData).filter(key => formData[key]).join(', ') || 'None'}</p>
        <p>Video: {videoData.videoType} - {videoData.videoID || videoData.videoFile?.name || 'None'}</p>
      </div>
      
      <button type="submit" className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save & Continue
      </button>
    </form>
  );
};

export default ImagesVideos;