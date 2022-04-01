import { questionSelector } from "../questionSlice";
import { Question } from "../types";

const KEY = "questions";

function getQuestions(): Question[] {
  const serialized = localStorage.getItem(KEY);
  if (!serialized) localStorage.setItem(KEY, JSON.stringify([]));
  return JSON.parse(localStorage.getItem(KEY)!) as Question[];
}

function setQuestions(questions: Question[]) {
  localStorage.setItem(KEY, JSON.stringify(questions));
}

async function add(question: Question) {
  setQuestions([...getQuestions(), question]);
}

async function update(id: string) {
  const newQuestion = questionSelector.selectEntities(window._store.getState())[
    id
  ];
  if (!newQuestion) return;
  const questions = getQuestions().filter((q) => q.id !== id);
  questions.push(newQuestion);
  setQuestions(questions);
}

async function remove(id: string) {
  setQuestions(getQuestions().filter((q) => q.id !== id));
}

async function removeMany(ids: string[]) {
  setQuestions(getQuestions().filter((q) => !ids.includes(q.id)));
}

async function getAll() {
  return getQuestions();
}

export const questionApi = {
  add,
  update,
  remove,
  getAll,
  removeMany,
};
