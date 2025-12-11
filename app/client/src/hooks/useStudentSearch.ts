import { useCallback, useEffect, useMemo, useState } from "react";

export interface Student {
	id: string;
	name: string;
	level?: string;
	year?: number;
	joined?: string;
	subjects?: string[];
	days?: string[];
	fees?: number;
}

export interface UseStudentSearchOptions {
	debounceMs?: number;
	keys?: Array<keyof Student>;
	minQueryLength?: number;
}

export function useStudentSearch(
	students: Student[],
	opts: UseStudentSearchOptions = {},
) {
	const { debounceMs = 250, keys = ["name"], minQueryLength = 1 } = opts;

	const [query, setQuery] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [results, setResults] = useState<Student[]>(students);

	const normalize = useCallback(
		(s: string) =>
			s
				.normalize?.("NFKD")
				.replace(/\p{Diacritic}/gu, "")
				.toLowerCase()
				.trim(),
		[],
	);

	const indexed = useMemo(() => {
		return students.map((stu) => {
			const indexRecord: { student: Student; searchable: string } = {
				student: stu,
				searchable: keys
					.map((k) => {
						const v = (stu as unknown as Record<string, unknown>)[k];
						if (!v && v !== 0) return "";
						if (Array.isArray(v)) return v.join(" ");
						return String(v);
					})
					.join(" "),
			};
			indexRecord.searchable = normalize(indexRecord.searchable);
			return indexRecord;
		});
	}, [students, keys, normalize]);

	useEffect(() => {
		if (query.length < minQueryLength) {
			setResults(students);
			return;
		}

		setIsSearching(true);
		const t = setTimeout(() => {
			const q = normalize(query);

			const tokens = q.split(/\s+/).filter(Boolean);

			const filtered = indexed
				.filter((rec) => {
					return tokens.every((token) => rec.searchable.includes(token));
				})
				.map((rec) => rec.student);

			setResults(filtered);
			setIsSearching(false);
		}, debounceMs);

		return () => clearTimeout(t);
	}, [query, indexed, debounceMs, minQueryLength, students, normalize]);

	useEffect(() => {
		if (!query) setResults(students);
	}, [students, query]);

	return {
		query,
		setQuery,
		results,
		isSearching,
		clear: () => setQuery(""),
	};
}
