export class ScrollAnimations {
  private observer: IntersectionObserver | null = null;
  private prefersReducedMotion: boolean;
  private hiddenClass = 'scroll-animations-hidden';
  private transitionClass = 'scroll-animations-transition';
  private defaultStaggerDelay = 100;

  constructor() {
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    this.init();
  }

  private init() {
    if (this.prefersReducedMotion) return;

    this.applyInitialState();

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target as HTMLElement);
            this.animateChildElements(entry.target as HTMLElement);
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    const elements = document.querySelectorAll<HTMLElement>('[data-animate]');

    elements.forEach((element) => {
      this.observer?.observe(element);
    });
  }

  private applyInitialState() {
    const elements = document.querySelectorAll<HTMLElement>(
      '[data-animate], [data-stagger-index]',
    );

    elements.forEach((element) => {
      element.classList.add(this.hiddenClass);
    });
  }

  private animateElement(element: HTMLElement) {
    const staggerIndex = parseInt(element.dataset.staggerIndex || '0', 10);
    const staggerDelay =
      parseInt(element.dataset.staggerDelay || '0', 10) ||
      this.defaultStaggerDelay;
    const delay = staggerIndex * staggerDelay;

    element.classList.add(this.transitionClass);

    setTimeout(() => {
      element.classList.remove(this.hiddenClass);
    }, delay);
  }

  private animateChildElements(parent: HTMLElement) {
    const childElements = parent.querySelectorAll<HTMLElement>(
      '[data-stagger-index]:not([data-animate])',
    );

    childElements.forEach((child) => {
      this.animateElement(child);
    });
  }
}
