export const resizeTextarea = (el: HTMLTextAreaElement) => {
  el.style.padding = '';
  el.style.height = '0px';

  requestAnimationFrame(() => {
    el.style.padding = '4px 8px';
    el.style.height = `${el.scrollHeight}px`;
  });
}
