import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StudentStore } from "./types/Student.types";
import { nanoid } from "nanoid";

export const useStudentStore = create<StudentStore>()(
	persist(
		(set) => ({
			students: [],
			addStudent: (data) => {
				set((state) => ({
					students: [
						{
							id: nanoid(),
							...data,
						},
						...state.students,
					],
				}));
			},
			updateStudent: (
				id: string,
				data: Partial<StudentStore["students"][0]>,
			) => {
				set((state) => ({
					students: state.students.map((student) =>
						student.id === id ? { ...student, ...data } : student,
					),
				}));
			},
			deleteStudent: (id: string) => {
				set((state) => ({
					students: state.students.filter((student) => student.id !== id),
				}));
			},
		}),
		{ name: "StudentRegistryDetails" },
	),
);
