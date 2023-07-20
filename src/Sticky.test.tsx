import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
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

  describe("When it's instanciated and the user scrolls", () => {
    test("Then it should change the style from absolute to fixed", () => {
      const testId = "sticky";
      const expectedStyle = {
        position: "fixed",
      };

      render(
        <>
          <Sticky>
            <p>"test</p>
          </Sticky>
          <div style={{ height: 4000 }}></div>
        </>
      );

      const foundElement = screen.getByTestId(testId);

      fireEvent.scroll(document, {
        scrollY: 3000,
      });

      console.log(foundElement.style.position);
      expect(foundElement).toHaveStyle(expectedStyle);
    });
  });
});
