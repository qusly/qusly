export const resizeInput = (el: HTMLInputElement | HTMLTextAreaElement) => {
  el.style.height = '0px';

  requestAnimationFrame(() => {
    el.style.height = `${el.scrollHeight}px`;
  });
}
