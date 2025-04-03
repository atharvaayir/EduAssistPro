import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { useReportStore } from '../store/useReportStore';
import { FaDownload, FaQrcode, FaRegAddressCard } from 'react-icons/fa';

const Reports = () => {
    const [startNumber, setStartNumber] = useState('');
    const [numberOfQRCodes, setNumberOfQRCodes] = useState('');
    const { ansSheetQRCodeGenHandler, sampleAdmitCardGenerator } = useReportStore();

  return (
    <>
        <PageHeader heading="Reports" />
        <div className='container flex flex-wrap gap-5'>

            
            {/* ans sheet qr codes  */}
            <div className='p-6 bg-white shadow-md rounded-lg mb-5 w-fit grid gap-4'>
                <h1 className='font-semibold text-center text-xl flex gap-5 items-center mx-auto'>
                    Answer Sheet QR Codes <FaQrcode className='size-10'/>
                </h1>
                <form onSubmit={e=>e.preventDefault()}>
                    <div className='grid grid-cols-2 w-fit gap-4 text-right items-center'>
                            <h1>Start Number :</h1>
                            <input type="text" value={startNumber} onChange={(e) => setStartNumber(e.target.value)} placeholder="2111020" name='ans-sheet-start-number' id='ans-sheet-start-number' className="input input-neutral border-neutral-500" />
                            <h1>Number of QR Codes :</h1>
                            <input type="text" value={numberOfQRCodes} onChange={(e) => setNumberOfQRCodes(e.target.value)} placeholder="500"name='ans-sheet-number-of-sheets' id='ans-sheet-number-of-sheets' className="input input-neutral border-neutral-500" />
                    </div>
                </form>
                <button type='button' onClick={()=>ansSheetQRCodeGenHandler(startNumber,numberOfQRCodes)} className='btn btn-primary mx-auto'> 
                    <FaDownload />Generate QR Codes
                </button>
            </div>

            
            {/* sample admit card */}
            <div className='p-6 bg-white shadow-md rounded-lg mb-5 w-fit grid gap-4 h-fit'>
                <h1 className='font-semibold text-center text-xl flex gap-5 items-center mx-auto'>
                    Sample Admit Card <FaRegAddressCard className='size-10'/>
                </h1>
                <button type='button' onClick={sampleAdmitCardGenerator} className='btn btn-primary mx-auto'>
                    <FaDownload /> Generate Sample Admit Card
                </button>
            </div>
        </div>
    </>
  )
}

export default Reports