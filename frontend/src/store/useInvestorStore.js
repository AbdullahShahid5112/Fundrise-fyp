import { create } from "zustand";
import api from "../api/axios"; // Using your existing axios instance
import toast from "react-hot-toast";

export const useInvestorStore = create((set, get) => ({
  // State
  investors: [],
  currentInvestor: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,

  // Actions
  
  // Get all investors
  getInvestors: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get("/investor");
      
      if (response.data && response.data.investors) {
        set({ 
          investors: response.data.investors,
          isLoading: false 
        });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching investors:", error);
      set({ 
        error: error.response?.data?.message || "Failed to fetch investors",
        isLoading: false 
      });
      toast.error(error.response?.data?.message || "Failed to fetch investors");
    }
  },

  // Get investor by ID
  getInvestorById: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get(`/investors/${id}`);
      
      if (response.data && response.data.investor) {
        set({ 
          currentInvestor: response.data.investor,
          isLoading: false 
        });
        return response.data.investor;
      } else {
        throw new Error("Investor not found");
      }
    } catch (error) {
      console.error("Error fetching investor:", error);
      set({ 
        error: error.response?.data?.message || "Failed to fetch investor",
        isLoading: false,
        currentInvestor: null
      });
      toast.error(error.response?.data?.message || "Failed to fetch investor");
      return null;
    }
  },

  // Create new investor
  createInvestor: async (investorData) => {
    try {
      set({ isCreating: true, error: null });
      
      // Validate data before sending
      if (!investorData.investmentRange || 
          !investorData.location?.trim() || 
          !investorData.intro?.trim() || 
          !investorData.expertise?.trim()) {
        throw new Error("All fields are required");
      }

      const response = await api.post("/investor/create-investor", investorData);
      
      if (response.data && response.data.investor) {
        // Add new investor to the current list
        set((state) => ({
          investors: [...state.investors, response.data.investor],
          isCreating: false
        }));
        
        toast.success("Investor created successfully");
        return response.data.investor;
      } else {
        throw new Error("Failed to create investor");
      }
    } catch (error) {
      console.error("Error creating investor:", error);
      set({ 
        error: error.response?.data?.message || "Failed to create investor",
        isCreating: false 
      });
      toast.error(error.response?.data?.message || "Failed to create investor");
      throw error; // Re-throw so the component can handle it
    }
  },

  // Update investor
  updateInvestor: async (id, updateData) => {
    try {
      set({ isUpdating: true, error: null });
      
      const response = await api.put(`/investor/${id}`, updateData);
      
      if (response.data && response.data.investor) {
        // Update investor in the list
        set((state) => ({
          investors: state.investors.map(investor => 
            investor._id === id ? response.data.investor : investor
          ),
          currentInvestor: state.currentInvestor?._id === id ? response.data.investor : state.currentInvestor,
          isUpdating: false
        }));
        
        toast.success("Investor updated successfully");
        return response.data.investor;
      } else {
        throw new Error("Failed to update investor");
      }
    } catch (error) {
      console.error("Error updating investor:", error);
      set({ 
        error: error.response?.data?.message || "Failed to update investor",
        isUpdating: false 
      });
      toast.error(error.response?.data?.message || "Failed to update investor");
      throw error;
    }
  },

  // Delete investor
  deleteInvestor: async (id) => {
    try {
      set({ isDeleting: true, error: null });
      
      const response = await api.delete(`/investor/${id}`);
      
      if (response.data) {
        // Remove investor from the list
        set((state) => ({
          investors: state.investors.filter(investor => investor._id !== id),
          currentInvestor: state.currentInvestor?._id === id ? null : state.currentInvestor,
          isDeleting: false
        }));
        
        toast.success("Investor deleted successfully");
        return true;
      } else {
        throw new Error("Failed to delete investor");
      }
    } catch (error) {
      console.error("Error deleting investor:", error);
      set({ 
        error: error.response?.data?.message || "Failed to delete investor",
        isDeleting: false 
      });
      toast.error(error.response?.data?.message || "Failed to delete investor");
      throw error;
    }
  },

  // Clear current investor
  clearCurrentInvestor: () => {
    set({ currentInvestor: null });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Reset all state
  resetStore: () => {
    set({
      investors: [],
      currentInvestor: null,
      isLoading: false,
      isCreating: false,
      isUpdating: false,
      isDeleting: false,
      error: null,
    });
  },
}));