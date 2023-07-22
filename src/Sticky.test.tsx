import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Sticky from "./Sticky";

describe("Given the Sticky component", () => {
  describe("When it's instanciated with no scroll", () => {
    test("Then it should render the child components with no change", () => {
      const text = "test";

      render(
        <Sticky>
          <p>{text}</p>
        </Sticky>
      );

      const foundText = screen.getByText(text);

      expect(foundText).toBeInTheDocument();
    });
  });
});
