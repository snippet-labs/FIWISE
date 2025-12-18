import { CLASS_ORDER_MAP } from "../constants";
import type { Student } from "../store/types/Student.types";

export function groupStudentsByClass(
  students: Student[],
): Array<[string, Student[]]> {
  const groups: Record<string, Student[]> = {};

  for (const student of students) {
    const level = student.level.toUpperCase();
    if (!groups[level]) {
      groups[level] = [];
    }
    groups[level].push(student);
  }

  return Object.entries(groups).sort((a, b) => {
    const orderA = CLASS_ORDER_MAP[a[0].toLowerCase()] ?? 999;
    const orderB = CLASS_ORDER_MAP[b[0].toLowerCase()] ?? 999;
    return orderA - orderB;
  });
}

export function sortByClassOrder<T extends { level: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const orderA = CLASS_ORDER_MAP[a.level.toLowerCase()] ?? 999;
    const orderB = CLASS_ORDER_MAP[b.level.toLowerCase()] ?? 999;
    return orderA - orderB;
  });
}
