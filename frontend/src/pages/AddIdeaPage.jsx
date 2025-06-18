import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import CompanyInfoForm from "../components/FormSteps/Companyinfo.jsx";
import PitchDeal from "../components/FormSteps/PitchDeal.jsx";
import ImagesVideos from "../components/FormSteps/ImagesVideos.jsx";
import Documents from "../components/FormSteps/Documents.jsx";
import axios from "axios"
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
    // imagesVideos: {
    //   logo: null,
    //   banner: null,
    //   productImage: null,
    //   videoType: "",
    //   videoID: "",
    //   videoFile: null,
    // },
    // documents: {
    //   businessPlan: null,
    //   teamDetails: null,
    //   financials: null,
    //   additionalDocs: null,
    // },
  });
  console.log("🚀 ~ AddIdeaPage ~ formData:", formData)
useEffect(()=>{
  console.log("formData:::::::",formData)
},[formData])
  const handleCompanyInfoSubmit = () => {
    setStep(2);
  };
const handlePitchDealSubmit = async () => {
  console.log("Submitting form");
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
  console.log("🚀 ~ handlePitchDealSubmit ~ companyInfo:", companyInfo)

  const pitchDeal = {
    summary: formData.pitchDeal.shortSummary,
    about_business: formData.pitchDeal.theBusiness,
    problem_statement: formData.pitchDeal.problemStatement,
    deal_type: formData.pitchDeal.theDeal,
    total_cost_to_date: formData.pitchDeal.costTillNow,
  };
  console.log("🚀 ~ handlePitchDealSubmit ~ pitchDeal:", pitchDeal)

  try {
    const res = await axios.post(
      'http://localhost:5001/api/pitch/info',
      {
        companyInfo,
        pitchDeal,
      },
      { withCredentials: true }
    );

    console.log("Pitch & Deal submitted:", res.data);
    // setStep(3);
  } catch (error) {
    console.error("🚀 ~ handlePitchDealSubmit ~ error:", error);
  }
};

  const handleImageSubmit = () => {
    // Optional: Post to another API or just move forward
    setStep(4);
  };
  const finalSubmit = () => {
    // Optional: Post to another API or just move forward
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
            formData={formData.imagesVideos}
            setFormData={(newImagesVideos) =>
              setFormData((prev) => ({
                ...prev,
                imagesVideos: newImagesVideos,
              }))
            }
            onNext={handleImageSubmit}
          />
        )}

        {step === 4 && (
          <Documents
            formData={formData.documents}
            setFormData={(newDocuments) =>
              setFormData((prev) => ({
                ...prev,
                documents: newDocuments,
              }))
            }
            onNext={finalSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default AddIdeaPage;
