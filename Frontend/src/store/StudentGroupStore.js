import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useStudentGroupStore = create((set) => ({
  studentGroups: [],
  addStudentGroup: (group) => set((state) =>{
    
      if (group.name.trim().length === 0) {
          toast.error("Empty Group Name");
          return { studentGroups: [...state.studentGroups] };
      }
  
      // Check if the group name already exists (case-insensitive comparison)
      const groupExists = state.studentGroups.some(
          (g) => g.name.toLowerCase() === group.name.toLowerCase()
      );
  
      if (groupExists) {
          toast.error("Group of this name already exists");
          return { studentGroups: [...state.studentGroups] };
      }
  
      return { studentGroups: [...state.studentGroups, group] };
  }),
  updateStudentGroup: (id, newName) => set((state) => ({
    studentGroups: state.studentGroups.map((group) =>
      group.id === id ? { ...group, name: newName } : group
    ),
  })),
  deleteStudentGroup: (id) => set((state) => ({
    studentGroups: state.studentGroups.filter((group) => group.id !== id),
  })),
  addFileToGroup: (groupId, file) => set((state) => ({
    studentGroups: state.studentGroups.map((group) =>
      group.id === groupId ? { ...group, files: [...group.files, file] } : group
    ),
  })),
  deleteFileFromGroup: (groupId, fileName) => set((state) => ({
    studentGroups: state.studentGroups.map((group) =>
      group.id === groupId ? { ...group, files: group.files.filter((file) => file !== fileName) } : group
    ),
  })),
}));