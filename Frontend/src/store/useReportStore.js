import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { saveAs } from 'file-saver';
import toast from "react-hot-toast";

export const useReportStore = create((set,get)=>({
    ansSheetQRCodeGenHandler : async (startNumber,numberOfQRCodes)=>{
        
        // Validate Start Number
        if (!startNumber || isNaN(startNumber) || Number(startNumber) <= 0) {
            toast.error('Please enter a positive number for start number.');
            return;
        }
    
        // Validate Number of QR Codes
        if (!numberOfQRCodes || isNaN(numberOfQRCodes) || Number(numberOfQRCodes) <= 0) {
            toast.error('Please enter a positive number for number of QR codes.');
            return;
        }

        const start = Number(startNumber);
        const quantity = Number(numberOfQRCodes);
        axiosInstance.post("/pdf/sheet-qrs",{start,quantity},{ responseType: 'blob' })
            .then(res=>{
                const blob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(blob, 'qrSheet.pdf'); // Trigger download
                toast.success('QR Codes generated and downloaded successfully');
            })
            .catch(error=>{
                toast.error(error.response?.data?.message || "An error occurred while generating QR codes.")
                console.log(error);
                
            }
        );
    },

    sampleAdmitCardGenerator: async () => {
        axiosInstance.get("/pdf/admit-card",{ responseType: 'blob' })
            .then(res=>{
                const blob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(blob, 'sample-admit-card.pdf'); // Trigger download
                toast.success('Sample Admit Card generated and downloaded successfully');
            })
            .catch(error=>{
                toast.error(error.response?.data?.message || "An error occurred while generating QR codes.")
                console.log(error);
                
            }
        );
    },
    
    sampleAttendanceSheetGenerator: async () => {
        axiosInstance.get("/pdf/attendance-sheet",{ responseType: 'blob' })
            .then(res=>{
                const blob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(blob, 'sample-attendance-sheet.pdf'); // Trigger download
                toast.success('Sample Admit Card generated and downloaded successfully');
            })
            .catch(error=>{
                toast.error(error.response?.data?.message || "An error occurred while generating QR codes.")
                console.log(error);
                
            }
        );
    },

}));