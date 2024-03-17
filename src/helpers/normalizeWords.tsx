import type { WordApi } from "@models/Library.models";

export type Alphabet =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

type NormalizeWords = Record<Alphabet, WordApi[]>;

export const normalizeWords = (words: WordApi[]): NormalizeWords => {
  const initialObject: NormalizeWords = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: [],
    k: [],
    l: [],
    m: [],
    n: [],
    o: [],
    p: [],
    q: [],
    r: [],
    s: [],
    t: [],
    u: [],
    v: [],
    w: [],
    x: [],
    y: [],
    z: [],
  };

  for (let word of words) {
    const firstChar = word.word[0].toLowerCase() as Alphabet;

    initialObject[firstChar] = [...initialObject[firstChar], word];
  }

  return initialObject;
};
