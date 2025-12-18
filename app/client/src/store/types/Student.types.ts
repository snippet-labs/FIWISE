export interface Student {
  id: string;
  name: string;
  level: string;
  year: number;
  joined: number;
  subjects: string[];
  days: string[];
  fees: number;
  feeTracking: Record<number, string[]>; // year -> array of paid months
}

export type StudentStore = {
  students: Student[];
  addStudent: (data: Omit<Student, "id">) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
};
