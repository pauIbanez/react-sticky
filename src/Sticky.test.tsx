import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Stickyy from "./Sticky";

describe("Given the Sticky component", () => {
  describe("When it's instanciated with no scroll", () => {
    test("Then it should render the child components with no change", () => {
      const text = "test";

      render(
        <Stickyy>
          <p>{text}</p>
        </Stickyy>
      );

      const foundText = screen.getByText(text);

      expect(foundText).toBeInTheDocument();
    });
  });
});
