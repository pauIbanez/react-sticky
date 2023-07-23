import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Reference = styled.div<{ $height: number; $width: number }>`
  position: relative;
  height: ${(props) => props.$height}px;
  width: ${(props) => props.$width}px;

  min-height: ${(props) => props.$height}px;
  min-width: ${(props) => props.$width}px;
`;

const StickyHolder = styled.div<{ $sticky: boolean; offset?: number }>`
  position: ${(props) => (props.$sticky ? "fixed" : "absolute")};
  top: ${(props) => (props.$sticky ? (props.offset || 0) + "px" : "0")};
`;

interface Props {
  offset?: number;
  children: JSX.Element;
}

/**
 * Create a sticky element under any parent while respecting other sticky/fixed elements.
 *
 * @param offset - (Optional) An offset from the top (or above fixed/sticky) element.
 * @param children - React children.
 */

const Stickyy = ({ offset, children }: Props) => {
  const [sticky, setSticky] = useState(false);
  const refrenceRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ height: number; width: number }>({
    height: 100,
    width: 100,
  });
  const [realOffset, setRealOffset] = useState<number>(0);

  useEffect(() => {
    const allFixedElements = [...document.querySelectorAll("*")].filter(
      (element) => {
        const elementRect = element.getBoundingClientRect();
        const refrenceRect = refrenceRef.current?.getBoundingClientRect();

        const isAbove = elementRect.bottom <= refrenceRect?.top!;
        if (!isAbove) return false;

        const [elementLeft, elementRight] = [
          elementRect.left,
          elementRect.right,
        ];
        const [referenceLeft, referenceRight] = [
          refrenceRect?.left!,
          refrenceRect?.right!,
        ];

        const isInTop =
          (elementLeft <= referenceLeft && elementRight >= referenceRight) ||
          (elementLeft >= referenceRight && elementRight <= referenceRight) ||
          (elementLeft <= referenceLeft && elementRight >= referenceLeft) ||
          (elementRight >= referenceRight && elementLeft <= referenceRight);

        if (!isInTop) return false;

        const positionValue = window
          .getComputedStyle(element)
          .getPropertyValue("position");
        if (positionValue === "fixed" || positionValue === "sticky") {
          return true;
        }
        return false;
      }
    );

    const itemsOffset = allFixedElements.reduce<number>(
      (acumulator, current) => acumulator + current.clientHeight,
      0
    );

    setRealOffset(itemsOffset + (offset || 0));
  }, [offset]);

  const onScroll = useCallback(() => {
    const ref = refrenceRef.current!;

    const stickyStartPos = ref.offsetTop - (realOffset || 0);

    if (ref.getBoundingClientRect().top) {
      if (!sticky && window.scrollY >= stickyStartPos) {
        setSticky(true);
      } else if (sticky && window.scrollY <= stickyStartPos) {
        setSticky(false);
      }
    }
  }, [sticky, realOffset]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    setSize({
      height: contentRef.current?.clientHeight ?? 100,
      width: contentRef.current?.clientWidth ?? 100,
    });
  }, [contentRef.current?.clientHeight, contentRef.current?.clientWidth]);

  return (
    <Reference ref={refrenceRef} $height={size.height} $width={size.width}>
      <StickyHolder
        ref={contentRef}
        $sticky={sticky}
        offset={realOffset}
        data-testid="sticky"
      >
        {children}
      </StickyHolder>
    </Reference>
  );
};

export default Stickyy;
