/**
 * Scroll Animations using Intersection Observer API
 * Supports fade-up animation with blur effect and stagger delays
 * Respects prefers-reduced-motion for accessibility
 */

class ScrollAnimations {
  private observer: IntersectionObserver | null = null;
  private prefersReducedMotion: boolean;
  private readonly defaultStaggerDelay = 100;

  constructor() {
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    this.init();
  }

  private init(): void {
    if (this.prefersReducedMotion) {
      // Skip animations but still show content
      document
        .querySelectorAll('[data-animate], [data-stagger-index]')
        .forEach((el) => {
          el.classList.remove('opacity-0', 'blur-md');
        });
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target as HTMLElement);
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    // Observe all elements with data-animate attribute
    const elements = document.querySelectorAll<HTMLElement>('[data-animate]');
    elements.forEach((el) => {
      if (!el.hasAttribute('data-animate-observed')) {
        const rect = el.getBoundingClientRect();
        const isInViewport =
          rect.top < window.innerHeight &&
          rect.bottom > 0 &&
          rect.left < window.innerWidth &&
          rect.right > 0;

        if (isInViewport) {
          this.animateElement(el);
        } else {
          this.observer?.observe(el);
        }
        el.setAttribute('data-animate-observed', 'true');
      }
    });
  }

  private animateElement(element: HTMLElement): void {
    const staggerIndex = parseInt(element.dataset.staggerIndex || '0', 10);
    const staggerDelay =
      parseInt(element.dataset.staggerDelay || '0', 10) ||
      this.defaultStaggerDelay;
    const delay = staggerIndex * staggerDelay;

    // Remove initial state and apply animation
    element.classList.remove('opacity-0', 'translate-y-3', 'blur-md');
    element.style.transitionDelay = `${delay}ms`;
    element.classList.add(
      'transition-[opacity,translate,filter]',
      'duration-1500',
      'ease-spring',
    );

    // Force reflow to ensure transition triggers
    void element.offsetHeight;
    element.classList.add('opacity-100');

    // Animate child elements with stagger
    const childElements = element.querySelectorAll<HTMLElement>(
      '[data-stagger-index]:not([data-animate])',
    );

    childElements.forEach((child) => {
      const childStaggerIndex = parseInt(child.dataset.staggerIndex || '0', 10);
      const childStaggerDelay =
        parseInt(child.dataset.staggerDelay || '0', 10) || staggerDelay;
      const childDelay = childStaggerIndex * childStaggerDelay;

      child.classList.remove('opacity-0', 'translate-y-3', 'blur-md');
      child.style.transitionDelay = `${childDelay}ms`;
      child.classList.add(
        'transition-[opacity,translate,filter]',
        'duration-1500',
        'ease-spring',
      );

      void child.offsetHeight;
      child.classList.add('opacity-100');
    });
  }

  public destroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}

// Initialize on page load
function initScrollAnimations(): void {
  // Clean up any existing instances
  document
    .querySelectorAll('[data-animate-observed]')
    .forEach((el) => el.removeAttribute('data-animate-observed'));

  new ScrollAnimations();
}

export default initScrollAnimations;
