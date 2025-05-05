import React from 'react'
import FormInputBox from '../../components/FormInputBox';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import "react-day-picker/style.css";
import toast from 'react-hot-toast';

const Page2 = ({currentStage,timetable,setTimetable,timeTableDisabled,setTimeTableDisabled,groups}) => {
  const handleTimeTableSave = ()=>{
    const subjectIds = [];
    let updated_timetable = [];

    for (const subjectGroup of groups) {
        for (const subject of subjectGroup.subjects) {
            subjectIds.push(subject._id);
        }
    }
    console.log(subjectIds);
    
    for (let index = 0; index < subjectIds.length; index++) {
        const subjectId = subjectIds[index];
        const sub_date = document.getElementById(`${subjectId}-date`)?.value;
        const sub_starttime = document.getElementById(`${subjectId}-starttime`)?.value;
        const sub_endtime = document.getElementById(`${subjectId}-endtime`)?.value;
        if (!sub_date || !sub_starttime || !sub_endtime) {
          toast.error("Time Table Cannot be saved with empty or incorrect entries");
          return;
        }
        updated_timetable.push({subjectId,sub_date,sub_starttime,sub_endtime});
        
    }
    setTimetable(updated_timetable);
    toast.success("Time Table Saved");
    console.log(timetable);
    setTimeTableDisabled(true);
  }
  const dateTimePickerValueAssignHandler = (value,elementId,TOD)=>{
    if (value) {
      if(TOD === "date"){
        // Use local time to avoid timezone shift
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const day = String(value.getDate()).padStart(2,"0");
        const formattedDate = `${year}-${month}-${day}`; // 'YYYY-MM-DD'

        document.getElementById(elementId).value = formattedDate;
        console.log("date updated", formattedDate);
      } else if (TOD === 'time') {
        // Extract hours and minutes in local time
        const hours = String(value.getHours()).padStart( 2, "0" );
        const minutes = String(value.getMinutes()).padStart(2, "0");
        const formattedTime = `${hours}:${minutes}`; // Format: "HH:MM"
        
        // Assign to the input
        document.getElementById(elementId).value = formattedTime;
        console.log("time updated", formattedTime);
      }
    } 
  }
  return (
    <section className={currentStage === 1 ? "" : "hidden"}>
      <FormInputBox>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Exam Timetable</h2>
            <div>
              {timeTableDisabled ? (
                <button
                  type="button"
                  onClick={() => setTimeTableDisabled(false)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleTimeTableSave}
                  className="btn btn-primary"
                >
                  Save
                </button>
              )}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full border rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((batch) =>
                  batch.subjects.map((subject) => (
                    <tr key={subject._id} className="border">
                      <td className="p-2">{subject.name}</td>
                      <td>
                        <input
                          type="date"
                          className="hidden"
                          id={`${subject._id}-date`}
                          disabled={timeTableDisabled}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="DD MMM YYYY"
                            format="dd MMM yyyy"
                            onChange={(dateValue) =>
                              dateTimePickerValueAssignHandler(
                                dateValue,
                                `${subject._id}-date`,
                                "date"
                              )
                            }
                            disabled={timeTableDisabled}
                          />
                        </LocalizationProvider>
                      </td>
                      <td>
                        <input
                          type="time"
                          className="hidden"
                          id={`${subject._id}-starttime`}
                          disabled={timeTableDisabled}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <TimePicker
                            label="Start Time"
                            onChange={(timeValue) =>
                              dateTimePickerValueAssignHandler(
                                timeValue,
                                `${subject._id}-starttime`,
                                "time"
                              )
                            }
                            disabled={timeTableDisabled}
                          />
                        </LocalizationProvider>
                      </td>
                      <td>
                        <input
                          type="time"
                          className="hidden"
                          id={`${subject._id}-endtime`}
                          disabled={timeTableDisabled}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <TimePicker
                            label="End Time"
                            onChange={(timeValue) =>
                              dateTimePickerValueAssignHandler(
                                timeValue,
                                `${subject._id}-endtime`,
                                "time"
                              )
                            }
                            disabled={timeTableDisabled}
                          />
                        </LocalizationProvider>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </FormInputBox>
    </section>
  );
}

export default Page2