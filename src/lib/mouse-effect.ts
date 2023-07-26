type Position = { x: number; y: number };

type GetMouseState = (
  element: HTMLElement,
  event: MouseEvent,
  range: number
) => {
  isInRange: boolean;
  position: Position;
};

export const getMouseState: GetMouseState = (element, event, range) => {
  const { left, top, width, height } = element.getBoundingClientRect();
  const [x, y] = [event.clientX - left, event.clientY - top];
  const isXInRange = x >= -range && x <= width + range;
  const isYInRange = y >= -range && y <= height + range;
  return { isInRange: isXInRange && isYInRange, position: { x, y } };
};

type UpdateMousePosition = (element: HTMLElement, position: Position) => void;

export const updateMousePosition: UpdateMousePosition = (element, { x, y }) => {
  element.style.setProperty('--mouse-x', `${x}px`);
  element.style.setProperty('--mouse-y', `${y}px`);
};

type RemoveMousePosition = (element: HTMLElement) => void;

export const removeMousePosition: RemoveMousePosition = (element) => {
  element.style.removeProperty('--mouse-x');
  element.style.removeProperty('--mouse-y');
};
