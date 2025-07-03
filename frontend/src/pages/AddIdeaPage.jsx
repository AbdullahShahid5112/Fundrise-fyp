import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import CompanyInfoForm from "../components/FormSteps/Companyinfo.jsx";
import PitchDeal from "../components/FormSteps/PitchDeal.jsx";
import ImagesVideos from "../components/FormSteps/ImagesVideos.jsx";
import Documents from "../components/FormSteps/Documents.jsx";
// import axios from "axios";
import api from "../api/axios";

const AddIdeaPage = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    companyInfo: {
      companyName: "",
      pitchTitle: "",
      location: "",
      mobileNumber: "",
      stageCurrent: "",
      idealInvestorRole: "",
      marketSize: "",
      target: "",
      minPerInvestor: "",
      yourStake: "",
    },
    pitchDeal: {
      shortSummary: "",
      theBusiness: "",
      problemStatement: "",
      theDeal: "",
      costTillNow: "",
    },
    images: {
      logo: null,
      banner: null,
      productImage: null,
    },
    videos: {
      videoType: "YouTube",
      videoID: "",
      videoFile: null,
    },
    documents: {
      businessPlan: null,
      teamDetails: null,
      financials: null,
      additionalDocs: null,
    },
  });

  console.log("🚀 ~ AddIdeaPage ~ formData:", formData);

  useEffect(() => {
    console.log("formData:::::::", formData);
  }, [formData]);

  const handleCompanyInfoSubmit = () => {
    setStep(2);
  };

  const handlePitchDealSubmit = () => {
    setStep(3);
  };

  const handleImageSubmit = () => {
    setStep(4);
  };

  // Helper function to extract video IDs from URLs
  const extractVideoId = (input, videoType) => {
    if (!input) return input;
    
    if (videoType === "YouTube") {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = input.match(regExp);
      return (match && match[2].length === 11) ? match[2] : input;
    }
    if (videoType === "Vimeo") {
      const regExp = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
      const match = input.match(regExp);
      return match ? match[1] : input;
    }
    return input;
  };

  const finalSubmit = async () => {
    console.log("Final submission started");
    console.log("Current formData before submission:", formData);
    
    try {
      // Create FormData object
      const submitData = new FormData();

      // Add company info as JSON
      const companyInfo = {
        name: formData.companyInfo.companyName,
        location: formData.companyInfo.location,
        pitch_title: formData.companyInfo.pitchTitle,
        mobile_number: formData.companyInfo.mobileNumber,
        stage_current: formData.companyInfo.stageCurrent,
        ideal_investor_role: formData.companyInfo.idealInvestorRole,
        market_size: Number(formData.companyInfo.marketSize),
        target: Number(formData.companyInfo.target),
        min_per_investor: Number(formData.companyInfo.minPerInvestor),
        your_stake: formData.companyInfo.yourStake,
      };

      const pitchDeal = {
        summary: formData.pitchDeal.shortSummary,
        about_business: formData.pitchDeal.theBusiness,
        problem_statement: formData.pitchDeal.problemStatement,
        deal_type: formData.pitchDeal.theDeal,
        total_cost_to_date: Number(formData.pitchDeal.costTillNow),
      };

      // Add JSON data
      submitData.append('companyInfo', JSON.stringify(companyInfo));
      submitData.append('pitchDeal', JSON.stringify(pitchDeal));

      // Add video type and ID at root level (matching backend expectations)
      submitData.append('videoType', formData.videos.videoType);
      
      if (formData.videos.videoType !== "Upload" && formData.videos.videoID) {
        const processedVideoID = extractVideoId(formData.videos.videoID, formData.videos.videoType);
        submitData.append('videoID', processedVideoID);
        console.log("Added video ID:", processedVideoID);
      }

      // Add image files directly
      if (formData.images.logo) {
        submitData.append('logo', formData.images.logo);
        console.log("Added logo:", formData.images.logo.name);
      }
      if (formData.images.banner) {
        submitData.append('banner', formData.images.banner);
        console.log("Added banner:", formData.images.banner.name);
      }
      if (formData.images.productImage) {
        submitData.append('productImage', formData.images.productImage);
        console.log("Added product image:", formData.images.productImage.name);
      }

      // Add video file if upload type
      if (formData.videos.videoType === "Upload" && formData.videos.videoFile) {
        submitData.append('videoFile', formData.videos.videoFile);
        console.log("Added video file:", formData.videos.videoFile.name);
      }

      // Add document files directly
      if (formData.documents.businessPlan) {
        submitData.append('businessPlan', formData.documents.businessPlan);
        console.log("Added business plan:", formData.documents.businessPlan.name);
      }
      if (formData.documents.teamDetails) {
        submitData.append('teamDetails', formData.documents.teamDetails);
      }
      if (formData.documents.financials) {
        submitData.append('financials', formData.documents.financials);
        console.log("Added financials:", formData.documents.financials.name);
      }
      if (formData.documents.additionalDocs) {
        submitData.append('additionalDocs', formData.documents.additionalDocs);
        console.log("Added additional docs:", formData.documents.additionalDocs.name);
      }

      // Validate required fields before sending
      const requiredCompanyFields = ['name', 'location', 'pitch_title', 'mobile_number', 'stage_current', 'ideal_investor_role', 'your_stake'];
      const requiredPitchFields = ['summary', 'about_business', 'problem_statement', 'deal_type'];
      
      const missingCompanyFields = requiredCompanyFields.filter(field => !companyInfo[field]);
      const missingPitchFields = requiredPitchFields.filter(field => !pitchDeal[field]);
      const missingNumericFields = [];
      
      if (companyInfo.market_size == null || companyInfo.market_size === 0) missingNumericFields.push('market_size');
      if (companyInfo.target == null || companyInfo.target === 0) missingNumericFields.push('target');
      if (companyInfo.min_per_investor == null || companyInfo.min_per_investor === 0) missingNumericFields.push('min_per_investor');
      if (pitchDeal.total_cost_to_date == null) missingNumericFields.push('total_cost_to_date');

      if (missingCompanyFields.length > 0 || missingPitchFields.length > 0 || missingNumericFields.length > 0) {
        console.error("Missing required fields:", {
          company: missingCompanyFields,
          pitch: missingPitchFields,
          numeric: missingNumericFields
        });
        alert(`Missing required fields: ${[...missingCompanyFields, ...missingPitchFields, ...missingNumericFields].join(', ')}`);
        return;
      }

      // Debug: Log all FormData entries
      console.log("FormData entries:");
      for (let [key, value] of submitData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: File - ${value.name} (${value.size} bytes)`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      // Send FormData with proper headers
      const res = await api.post(
         "/pitch/info",
        submitData,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          // Add timeout and maxContentLength
          timeout: 60000, // 60 seconds
          maxContentLength: 50 * 1024 * 1024, // 50MB
          maxBodyLength: 50 * 1024 * 1024, // 50MB
        }
      );

      console.log("Complete pitch submitted:", res.data);
      alert("Pitch submitted successfully!");
      

      
    } catch (error) {
      console.error("🚀 ~ finalSubmit ~ error:", error);
      
      if (error.code === 'ECONNABORTED') {
        alert("Request timeout. Please try again with smaller files.");
      } else if (error.response?.status === 413) {
        alert("Files too large. Please reduce file sizes and try again.");
      } else if (error.response?.status === 400) {
        const errorMessage = error.response.data?.message || "Bad request. Please check your data.";
        alert(`Error: ${errorMessage}`);
      } else if (error.response?.status === 401) {
        alert("Unauthorized. Please log in again.");
      } else if (error.response?.status === 500) {
        alert("Server error. Please try again later.");
      } else {
        const errorMessage = error.response?.data?.message || "Error submitting pitch. Please try again.";
        alert(`Error: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="mt-24 flex bg-white">
      <Sidebar currentStep={step} />

      <div className="flex-1 p-6">
        {step === 1 && (
          <CompanyInfoForm
            formData={formData.companyInfo}
            setFormData={(name, value) =>
              setFormData((prev) => ({
                ...prev,
                companyInfo: {
                  ...prev.companyInfo,
                  [name]: value,
                },
              }))
            }
            onNext={handleCompanyInfoSubmit}
          />
        )}

        {step === 2 && (
          <PitchDeal
            formData={formData.pitchDeal}
            setFormData={(name, value) =>
              setFormData((prev) => ({
                ...prev,
                pitchDeal: {
                  ...prev.pitchDeal,
                  [name]: value,
                },
              }))
            }
            onNext={handlePitchDealSubmit}
          />
        )}

        {step === 3 && (
          <ImagesVideos
            formData={formData.images}
            videoData={formData.videos}
            setFormData={(newImages) => {
              console.log("Setting new images:", newImages);
              setFormData((prev) => ({
                ...prev,
                images: newImages,
              }));
            }}
            setVideoData={(newVideos) => {
              console.log("Setting new videos:", newVideos);
              setFormData((prev) => ({
                ...prev,
                videos: newVideos,
              }));
            }}
            onNext={handleImageSubmit}
          />
        )}

        {step === 4 && (
          <Documents
            formData={formData.documents}
            setFormData={(newDocuments) => {
              console.log("Setting new documents:", newDocuments);
              setFormData((prev) => ({
                ...prev,
                documents: newDocuments,
              }));
            }}
            onNext={finalSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default AddIdeaPage;