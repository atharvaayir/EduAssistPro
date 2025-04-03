// // Frontend/src/components/ExamGroupTable.jsx
// import React, { useState } from "react";
// import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
// import EditExamGroupOverlay from "./EditExamGroupOverlay";
// import SubjectsOverlay from "./SubjectsOverlay";

// const ExamGroupTable = () => {
//   // placeholder state: examGroups with group name and associated subjects
//   const [examGroups, setExamGroups] = useState([
//     { id: 1, name: "Group Alpha", subjects: [] },
//     { id: 2, name: "Group Beta", subjects: [] },
//   ]);

//   // overlay controls
//   const [editingGroup, setEditingGroup] = useState(null);
//   const [subjectOverlayGroupId, setSubjectOverlayGroupId] = useState(null);

//   const deleteGroup = (id) => {
//     setExamGroups((prev) => prev.filter((g) => g.id !== id));
//   };

//   const updateGroupName = (id, newName) => {
//     setExamGroups((prev) =>
//       prev.map((g) => (g.id === id ? { ...g, name: newName } : g))
//     );
//     setEditingGroup(null);
//   };

//   const addSubjectsToGroup = (groupId, subjects) => {
//     setExamGroups((prev) =>
//       prev.map((g) =>
//         g.id === groupId ? { ...g, subjects: [...g.subjects, ...subjects] } : g
//       )
//     );
//   };

//   const deleteSubjectFromGroup = (groupId, subjectId) => {
//     setExamGroups((prev) =>
//       prev.map((g) =>
//         g.id === groupId
//           ? { ...g, subjects: g.subjects.filter((s) => s.id !== subjectId) }
//           : g
//       )
//     );
//   };

//   // Pagination: simple example with 2 groups per page
//   const itemsPerPage = 2;
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(examGroups.length / itemsPerPage);
//   const currentGroups = examGroups.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
//       <table className="table w-full">
//         <thead>
//           <tr>
//             <th>Exam Group Name</th>
//             <th>Details</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentGroups.map((group) => (
//             <tr key={group.id}>
//               <td className="py-4">
//                 <div className="font-semibold">{group.name}</div>
//                 <div className="flex gap-2 mt-2">
//                   <button
//                     className="btn btn-sm btn-primary"
//                     onClick={() => setEditingGroup(group)}
//                   >
//                     <FaEdit /> Edit
//                   </button>
//                   <button
//                     className="btn btn-sm btn-secondary"
//                     onClick={() => deleteGroup(group.id)}
//                   >
//                     <FaTrash /> Delete
//                   </button>
//                   <button
//                     className="btn btn-sm btn-accent"
//                     onClick={() => setSubjectOverlayGroupId(group.id)}
//                   >
//                     <FaPlus /> Add Subjects
//                   </button>
//                 </div>
//               </td>
//               <td>
//                 {group.subjects.map((subj) => (
//                   <div key={subj.id} className="flex justify-between items-center border-b py-1">
//                     <span className="text-sm">
//                       {subj.code}, {subj.name}, Sem {subj.semester}, {subj.department}
//                     </span>
//                     <button
//                       className="btn btn-xs btn-error"
//                       onClick={() => deleteSubjectFromGroup(group.id, subj.id)}
//                     >
//                       <FaTimes />
//                     </button>
//                   </div>
//                 ))}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {/* Pagination */}
//       <div className="flex justify-center my-4 gap-2">
//         <button
//           className="btn btn-sm"
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(currentPage - 1)}
//         >
//           &lt;
//         </button>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : ""}`}
//             onClick={() => setCurrentPage(i + 1)}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button
//           className="btn btn-sm"
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage(currentPage + 1)}
//         >
//           &gt;
//         </button>
//       </div>
//       {editingGroup && (
//         <EditExamGroupOverlay
//           initialName={editingGroup.name}
//           onClose={() => setEditingGroup(null)}
//           onSave={(newName) => updateGroupName(editingGroup.id, newName)}
//         />
//       )}
//       {subjectOverlayGroupId && (
//         <SubjectsOverlay
//           onClose={() => setSubjectOverlayGroupId(null)}
//           onSelectSubjects={(subjects) =>
//             addSubjectsToGroup(subjectOverlayGroupId, subjects)
//           }
//         />
//       )}
//     </div>
//   );
// };

// export default ExamGroupTable;

// Frontend/src/components/ExamGroupTable.jsx
import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import EditExamGroupOverlay from "./EditExamGroupOverlay";
import SubjectsOverlay from "./SubjectsOverlay";

const ExamGroupTable = ({ examGroups, setExamGroups }) => {
  // overlay controls
  const [editingGroup, setEditingGroup] = useState(null);
  const [subjectOverlayGroupId, setSubjectOverlayGroupId] = useState(null);

  const deleteGroup = (id) => {
    setExamGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const updateGroupName = (id, newName) => {
    setExamGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, name: newName } : g))
    );
    setEditingGroup(null);
  };

  const addSubjectsToGroup = (groupId, subjects) => {
    setExamGroups((prev) =>
      prev.map((g) =>
        g.id === groupId ? { ...g, subjects: [...g.subjects, ...subjects] } : g
      )
    );
  };

  const deleteSubjectFromGroup = (groupId, subjectId) => {
    setExamGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, subjects: g.subjects.filter((s) => s.id !== subjectId) }
          : g
      )
    );
  };

  // Pagination: simple example with 2 groups per page
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(examGroups.length / itemsPerPage);
  const currentGroups = examGroups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Exam Group Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {currentGroups.map((group) => (
            <tr key={group.id}>
              <td className="py-4">
                <div className="font-semibold">{group.name}</div>
                <div className="flex gap-2 mt-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => setEditingGroup(group)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => deleteGroup(group.id)}
                  >
                    <FaTrash /> Delete
                  </button>
                  <button
                    className="btn btn-sm btn-accent"
                    onClick={() => setSubjectOverlayGroupId(group.id)}
                  >
                    <FaPlus /> Add Subjects
                  </button>
                </div>
              </td>
              <td>
                {group.subjects.map((subj) => (
                  <div key={subj.id} className="flex justify-between items-center border-b py-1">
                    <span className="text-sm">
                      {subj.code}, {subj.name}, Sem {subj.semester}, {subj.department}
                    </span>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => deleteSubjectFromGroup(group.id, subj.id)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-center my-4 gap-2">
        <button
          className="btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          &gt;
        </button>
      </div>
      {editingGroup && (
        <EditExamGroupOverlay
          initialName={editingGroup.name}
          onClose={() => setEditingGroup(null)}
          onSave={(newName) => updateGroupName(editingGroup.id, newName)}
        />
      )}
      {subjectOverlayGroupId && (
        <SubjectsOverlay
          onClose={() => setSubjectOverlayGroupId(null)}
          onSelectSubjects={(subjects) =>
            addSubjectsToGroup(subjectOverlayGroupId, subjects)
          }
        />
      )}
    </div>
  );
};

export default ExamGroupTable;