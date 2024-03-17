import type { RuleObject } from "antd/es/form";

const TAG_PATTERN = /^[а-яА-ЯёЁ\s]+$/;
const WORD_PATTERN = /^[a-zA-Z\s]+$/;
// const TRANSLATE_PATTERN = /^[а-яА-ЯёЁ\s]+$/;

export const Fields = {
  word: "word",
  translate: "translate",
  pined: 'pined',
};

export const FormFields = {
  [Fields.word]: {
    name: Fields.word,
    rules: [
      {
        required: true,
        message: "This field is required!",
      },
      {
        pattern: WORD_PATTERN,
        message: "Unacceptable symbol!",
      },
    ],
  },
  [Fields.translate]: {
    name: [Fields.translate],
    rules: [
      {
        required: true,
        message: "This field is required!",
      },
      () => ({
        validator(_: RuleObject, value: string[]) {
          let error = "";

          if (!value.length) {
            return Promise.resolve()
          }

          value?.forEach((tag) => {
            if (tag.match(TAG_PATTERN)?.length) {
              return Promise.resolve()
            }

            error = `${tag} is unacceptable symbol!`;
          });

          if (error) {
            return Promise.reject(new Error(error));
          }

          return Promise.resolve();
        },
      }),
    ],
  },
};
