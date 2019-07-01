export const resizeTextarea = (el: HTMLTextAreaElement) => {
  el.style.padding = '';
  el.style.height = '0px';

  requestAnimationFrame(() => {
    el.style.padding = '4px 8px';
    el.style.height = `${el.scrollHeight}px`;
  });
}

export const selectFileName = (el: HTMLTextAreaElement | HTMLInputElement) => {
  const value = el.value;
  const dotIndex = value.lastIndexOf('.');
  const endIndex = dotIndex === -1 ? value.length : dotIndex

  el.setSelectionRange(0, endIndex);
}
