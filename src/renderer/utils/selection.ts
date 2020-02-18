import { IPos } from '../interfaces';

export const getScrollMousePos = (
  e: MouseEvent | React.MouseEvent,
  ref: HTMLElement,
): IPos => {
  return [e.pageX + ref.scrollLeft, e.pageY + ref.scrollTop];
};

export const getRelPos = (pos: IPos, ref: HTMLElement): IPos => {
  return [pos[0] + ref.scrollLeft, pos[1] + ref.scrollTop];
};

export const getBoxSize = ([mouseX, mouseY]: IPos, [startX, startY]: IPos) => {
  const width = Math.abs(mouseX - startX);
  const height = Math.abs(mouseY - startY);

  return [width, height];
};

export const getBoxPos = (
  ref: HTMLElement,
  [mouseX, mouseY]: IPos,
  [startX, startY]: IPos,
  width: number,
  height: number,
): IPos => {
  const rect = ref.getBoundingClientRect();

  const x = mouseX < startX ? startX - width : startX;
  const y = mouseY < startY ? startY - height : startY;

  return [x - rect.left, y - rect.top];
};

const limitSize = (size: number, parentSize: number, offset: number) => {
  return Math.min(size, parentSize - offset);
};

export const updateBoxRect = (
  ref: HTMLElement,
  boxRef: HTMLElement,
  rawMousePos: IPos,
  startPos: IPos,
) => {
  if (!startPos) return;

  const mousePos = getRelPos(rawMousePos, ref);

  const [width, height] = getBoxSize(mousePos, startPos);
  const [x, y] = getBoxPos(ref, mousePos, startPos, width, height);

  Object.assign(boxRef.style, {
    width: `${limitSize(width, ref.scrollWidth, x)}px`,
    height: `${limitSize(height, ref.scrollHeight, y)}px`,
    left: `${x}px`,
    top: `${y}px`,
  });
};

export const cursorDistance = (
  [firstX, firstY]: IPos,
  [secondX, secondY]: IPos,
) => {
  return Math.sqrt(
    Math.pow(firstY - secondY, 2) + Math.pow(firstX - secondX, 2),
  );
};

export const isBoxVisible = (
  rawMousePos: IPos,
  startPos: IPos,
  ref: HTMLElement,
  minDistance: number,
) => {
  if (!rawMousePos || !startPos) return false;

  const relMousePos = getRelPos(rawMousePos, ref);
  const distance = cursorDistance(startPos, relMousePos);

  return distance >= minDistance;
};

export const elementsCollide = (first: HTMLElement, second: HTMLElement) => {
  const rect1 = first.getBoundingClientRect();
  const rect2 = second.getBoundingClientRect();

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
};

export const toggleBox = (ref: HTMLElement, visible = false) => {
  Object.assign(ref.style, {
    display: visible ? 'block' : 'none',
  });
};
