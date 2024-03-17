import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { useForm } from "react-hook-form";

import "@testing-library/jest-dom/extend-expect";

import {WordModal} from "../WordModal";
import type { WordForm } from "models/Library.models";

afterEach(cleanup);

it("WordModal render correctly", () => {
  const Component = () => {
    const { control } = useForm<WordForm>({
      mode: "onChange",
    });

    return <WordModal isOpened={true} onClose={() => {}} onSubmit={() => {}} />;
  };

  render(<Component />);
});

describe("Test button text", () => {
  it("Add button text", () => {
    const Component = () => {
      const { control } = useForm<WordForm>({
        mode: "onChange",
      });

      return (
        <WordModal
          isOpened={true}
          onClose={() => {}}
          onSubmit={() => {}}
          isUpdate={false}
        />
      );
    };

    render(<Component />);

    expect(screen.getByText("Add")).toBeTruthy();
  });

  it("Update button text", () => {
    const Component = () => {
      const { control } = useForm<WordForm>({
        mode: "onChange",
      });

      return (
        <WordModal
          isOpened={true}
          isUpdate={true}
          onClose={() => {}}
          onSubmit={() => {}}
        />
      );
    };

    render(<Component />);

    expect(screen.getByText("Update")).toBeTruthy();
  });
});

describe("Check component clicks", () => {
  const handleSubmit = jest.fn();
  const handleClose = jest.fn();

  const Component = () => {
    const { control } = useForm<WordForm>({
      mode: "onChange",
    });

    handleSubmit.mockImplementation((event) => {
      event.preventDefault();
    });

    return (
      <WordModal
        isOpened={true}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    );
  };

  it("Click submit", async () => {
    render(<Component />);

    const submitButton = screen.getByText("Add");

    fireEvent.click(submitButton);

    await waitFor(() => expect(handleSubmit).toBeCalled());
  });

  it("Click close modal", () => {
    render(<Component />);

    const form = screen.getByTestId("word-modal-form");

    fireEvent.keyDown(form, {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27,
    });

    expect(handleClose).toBeCalled();
  });
});

describe("Check fields errors", () => {
  const handleSubmit = jest.fn();

  const Component = () => {
    const { control } = useForm<WordForm>({
      mode: "onChange",
    });

    return (
      <WordModal isOpened={true} onClose={() => {}} onSubmit={handleSubmit} />
    );
  };

  it("Check word required message", async () => {
    render(<Component />);

    fireEvent.change(screen.getByTestId("text-field"), {
      target: {
        value: "test",
      },
    });

    fireEvent.change(screen.getByTestId("text-field"), {
      target: {
        value: "",
      },
    });

    const error = await screen.findByText("Field is required!");

    expect(error).toBeInTheDocument();
  });
});
