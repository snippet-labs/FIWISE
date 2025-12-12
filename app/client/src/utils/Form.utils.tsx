import type { Student as StudentTypes } from "../store/types/Student.types";

export const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const AVAILABLE_SUBJECTS = [
	"Maths",
	"Computer Science",
	"Biology",
	"English",
	"Bengali",
	"Hindi",
	"Chemistry",
	"Physics",
];
export const MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const GROUPS: Record<string, StudentTypes[]> = {
	"1": [],
	"2": [],
	"3": [],
	"4": [],
	"5": [],
	"6": [],
	"7": [],
	"8": [],
	"9": [],
	"10": [],
	"11": [],
	"12": [],
	UG: [],
	PG: [],
};
