import React from 'react'
import PageHeader from "../../components/PageHeader";

const NewExam = () => {

    const classroomObjs = [
        
    ];

    const action = (
        <button className='btn btn-primary'>
            Save
        </button>
    );
  return (
    <>
        <PageHeader heading="New Exam" action={action}/>
        <form>
            <div>
                <label htmlFor="exam-name">Exam Name : </label>
                <input type="text" name="exam-name" id="exam-name" className='input bg-gray-300' />
            </div>
            
            <div>
                <label htmlFor="exam-name"> : </label>
                
            </div>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Class Room Object</span>
                    {/* <span className="label-text-alt">Alt label 1</span> */}
                </div>
                <select className="select select-bordered">
                    <option disabled selected>Pick one</option>
                    <option>Star Wars</option>
                    <option>Harry Potter</option>
                    <option>Lord of the Rings</option>
                    <option>Planet of the Apes</option>
                    <option>Star Trek</option>
                </select>
                <div className="label">
                    {/* <span className="label-text-alt">Alt label 2</span> */}
                    {/* <span className="label-text-alt">Alt label 3</span> */}
                </div>
            </label>

        </form>
    </>
  )
}

export default NewExam