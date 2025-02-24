import { create } from 'zustand';

export const useStudentGroupStore = create((set) => ({
  studentGroups: [],
  addStudentGroup: (group) => set((state) => ({ studentGroups: [...state.studentGroups, group] })),
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