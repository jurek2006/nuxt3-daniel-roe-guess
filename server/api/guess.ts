import { defineHandler, useBody, createError, useCookie, setCookie } from "h3";

const decode = (state = "[]"): GameState => JSON.parse(state);
const encode = (state: GameState): string => JSON.stringify(state);

export default defineHandler(async (req, res) => {
  const { guess } = await useBody(req);

  if (!guess || guess.length !== 5) {
    return createError({
      statusCode: 422,
      message: "Invalid guess " + guess,
    });
  }

  const word = "super";
  const state: GameState = decode(useCookie(req, "state"));
  state.push([guess, generateHint(word, guess)]);
  setCookie(req, "state", encode(state));

  return state;
});

function generateHint(word: string, guess: string): string {
  const source = [...word];
  return [...guess]
    .map((letter, i) => {
      if (letter === word[i]) {
        source[i] = null;
        return true;
      }
      return false;
    })
    .map((exact, i) => {
      if (exact) return "2";
      if (source.includes(guess[i])) return "1";
      return "0";
    })
    .join("");
}
