import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useExamStore = create((set,get)=>({
    classrooms:[],
    currentStage:1,
    setStage:(nos)=>{
        const {currentStage} = get();
        set({
            ...get(),
            currentStage:nos+currentStage
        })
        // console.log(get());
    },
    getClassrooms: async () => {
        set({isLoading:true});
        try {
            const res = await axiosInstance.get("/classroom/all");
            set({classrooms:res.data});
            console.log(res.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLoading:false});
        }
    },
}));