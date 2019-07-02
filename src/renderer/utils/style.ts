interface Style {
  [key: string]: string;
}

export const setStyle = (el: HTMLElement, style: Style) => {
  Object.assign(el.style, style);
}
