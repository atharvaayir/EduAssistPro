import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useBlockStore = create((set,get)=>({
    blocks:false,
    isLoading:false,
    getBlocks: async () => {
        set({isLoading:true});
        try {
            const res = await axiosInstance.get("/block");
            set({blocks:res.data});
            console.log(res.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLoading:false});
        }
    },
    getSingleBlock: async (objectId)=>{
        set({isLoading:true});
        try {
            const res = await axiosInstance.get(`/block/${objectId}`);
            console.log(res.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLoading:false});
        }
    },
    createBlock:async (name,classrooms,navigate) => {
        set({isLoading:true});
        try {
            const res = await axiosInstance.post("/block/create",{name,classrooms});
            if(res.data.message==="Block Created"){
                localStorage.setItem("toastMessage","Block Created SuccessFully!");
                navigate("/blocks");
            } else if (res.data.message === "Use different name") {
                toast.error("Use different block name");
            } else{
                toast.error("Failed to create block due to unknown reason");
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "An error occurred while creating the classroom.");
            } 
        } finally{
            set({isLoading:false});
        }
    },
    updateBlock:async (objectId,name,classrooms,navigate) => {
        set({isLoading:true});
        try {
            const res = await axiosInstance.post(`/block/${objectId}`,{name,classrooms});
            if(res.data.message==="Classroom updated"){
                localStorage.setItem("toastMessage","Block Updated");
                navigate("/blocks");
            } else if(res.data.message==="Use different name"){
                toast.error("Choose different block name");
            }
            else{
                toast.error("Failed to update the block due to an unknown reason.");
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "An error occurred while updating the block.");
            }
        } finally{
            set({isLoading:false});
        }
    },
    deleteBlock:async(objectId)=>{
        try {
            const res = await axiosInstance.delete(`/block/delete/${objectId}`);
            if((res).data.message==="Block deleted successfully"){
                set((state) => ({
                    blocks: state.blocks.filter(block => block._id !== objectId),
                }));    
                toast.success("Block Deleted!");
                navigate("/blocks");
            }
            else{
                toast.error("Block couldn't be deleted");
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "An error occurred while deleting the block.");
            } 
        } finally{
            set({isLoading:false});
        }
    }
}));