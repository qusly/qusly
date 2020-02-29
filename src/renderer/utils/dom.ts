export const resizeTextarea = (ref: HTMLTextAreaElement) => {
  ref.style.height = '0px';

  requestAnimationFrame(() => {
    ref.style.height = `${ref.scrollHeight + 2}px`;
  });
};

export const selectFileName = (ref: HTMLTextAreaElement | HTMLInputElement) => {
  const dotIndex = ref.value.lastIndexOf('.');
  const endIndex = dotIndex <= 0 ? ref.value.length : dotIndex;

  ref.setSelectionRange(0, endIndex);
};
