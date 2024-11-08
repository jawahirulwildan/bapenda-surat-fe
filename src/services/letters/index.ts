import {useQuery} from "@tanstack/react-query";
import ky from "ky";
import type {Letters} from "./types";
import Cookies from "js-cookie";

export const getLetters = async (params?: Record<string, string>) => {
	const token = Cookies.get("authToken")

	const res = await ky.get("http://localhost:5000/api/letter", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		searchParams: params
	}).json<Letters[]>();
	return res;
};

export const useLetters = () =>
	useQuery<Letters[]>({
		queryKey: ["Letters"],
		queryFn: () => getLetters(),
	});

export const getSpareLetters = async () => {
	return getLetters({reserved: "false"});
};

export const useSpareLetters = () =>
	useQuery<Letters[]>({
		queryKey: ["SpareLetters"],
		queryFn: () => getSpareLetters(),
	});
