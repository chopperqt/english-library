import { array, boolean, number, object, Output, string } from "valibot";

export const WordSchema = object({
  id: number(),
  userID: string(),
  word: string(),
  translate: array(string()),
  pined: boolean(),
  createdAt: string(),
});

export const WordCreateSchema = object({
  word: string(),
  translate: array(string()),
  pined: boolean(),
  userID: string(),
});

export const WordUpdateSchema = object({
  word: string(),
  translate: array(string()),
  pined: boolean(),
  userID: string(),
  wordID: number(),
});

export const WordFormSchema = object({
  word: string(),
  translate: array(string()),
  pined: boolean(),
});

export type WordApi = Output<typeof WordSchema>;
export type WordCreateApi = Output<typeof WordCreateSchema>;
export type WordUpdateApi = Output<typeof WordUpdateSchema>;
export type WordForm = Output<typeof WordFormSchema>;

export type WordID = WordApi["id"];
