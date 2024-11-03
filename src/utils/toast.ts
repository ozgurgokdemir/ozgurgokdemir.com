type ShowToastProps = {
  title: string;
  description: string;
  status: 'success' | 'error';
};

export const toastElement = document.getElementById('toast') as HTMLDivElement;
const titleElement = toastElement.querySelector(
  '[data-slot="title"]',
) as HTMLHeadingElement;
const descriptionElement = toastElement.querySelector(
  '[data-slot="description"]',
) as HTMLParagraphElement;
export const closeButtonElement = toastElement.querySelector(
  '[data-slot="close"]',
) as HTMLButtonElement;

let timeout: NodeJS.Timeout | undefined;

export function showToast({ title, description, status }: ShowToastProps) {
  cancelTimeout();

  titleElement.textContent = title;
  descriptionElement.textContent = description;

  toastElement.setAttribute('data-status', status);
  toastElement.setAttribute('aria-hidden', 'false');

  startTimeout();
}

export function cancelTimeout() {
  clearTimeout(timeout);
}

export function startTimeout() {
  timeout = setTimeout(() => {
    closeToast();
  }, 5000);
}

export function closeToast() {
  toastElement.setAttribute('aria-hidden', 'true');
}
