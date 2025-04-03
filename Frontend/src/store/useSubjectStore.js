import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useSubjectStore = create((set,get) => ({
    subjects : [],
    isLoading: false,
    getSubjects: async () => {
        set({isLoading:true});
        try {
            const res = await axiosInstance.get("/subjects");
            set({subjects:res.data});
            console.log(res.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLoading:false});
        }
    },
    createSubject: async (formData,navigate) => {
        // console.log(name,rows,columns,benchCapacity);
        set({isLoading:true});
        try {
            const res = await axiosInstance.post("/subjects/create",formData);
            console.log(res.data.message);
            if (res.data.message === "Object Created") {
                localStorage.setItem("toastMessage", "Subject created successfully!");
                navigate('/subjects')
            } else if (res.data.message === "Use different name") {
                toast.error("Choose a different class name.");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "An error occurred while creating the classroom.");
            } 
        }finally{
            set({isLoading:false});
        }
    },
    updateSubject: async(subjectId,formData,navigate)=>{
        set({isLoading:true});
        try {
            console.log(formData);
            
            const res = await axiosInstance.put(`/subjects/update/${subjectId}`,formData);
            console.log(res.data.message);
            if (res.data.message === "Subject Updated") {                
                localStorage.setItem("toastMessage", "Subject Updated successfully!");
                navigate("/subjects"); // Redirect to the desired page
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "An error occurred while creating the classroom.");
            } 
        }finally{
            set({isLoading:false});
        }
    },
    deleteSubject:async(objectId)=>{
        try {
            const res = await axiosInstance.delete(`/subjects/delete/${objectId}`);
            if(res.data.message==="Subject deleted successfully"){
                set((state) => ({
                    subjects: state.subjects.filter(classroom => classroom._id !== objectId),
                }));    
                toast.success("Classroom Deleted!");
            }
            else{
                toast.error("Classroom couldn't be deleted");
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "An error occurred while creating the classroom.");
            } 
        }
    }
}));