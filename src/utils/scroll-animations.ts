export class ScrollAnimations {
  private observer: IntersectionObserver | null = null;
  private revealFrameId: number | null = null;
  private cleanupTimeouts = new Set<number>();
  private revealQueue = new Set<HTMLElement>();
  private prefersReducedMotion: boolean;
  private containerSelector = '[data-animate]';
  private targetSelector = '[data-stagger-index], .scroll-animations-hidden';
  private hiddenClass = 'scroll-animations-hidden';
  private transitionClass = 'scroll-animations-transition';
  private willChangeClass = 'scroll-animations-will-change';
  private defaultStaggerDelay = 100;
  private defaultDuration = 1000;
  private containers: HTMLElement[] = [];

  constructor() {
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    this.init();
  }

  private init() {
    this.containers = Array.from(
      document.querySelectorAll<HTMLElement>(this.containerSelector),
    );

    if (this.prefersReducedMotion) {
      this.revealImmediately();
      return;
    }

    if (this.containers.length === 0) return;

    this.applyInitialState();

    this.observer = new IntersectionObserver(
      (entries) => {
        let shouldFlush = false;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          this.revealQueue.add(entry.target as HTMLElement);
          this.observer?.unobserve(entry.target);
          shouldFlush = true;
        });

        if (!shouldFlush || this.revealFrameId !== null) return;

        this.revealFrameId = requestAnimationFrame(() => {
          this.revealFrameId = null;
          this.flushRevealQueue();
        });
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -12% 0px',
      },
    );

    this.containers.forEach((element) => {
      this.observer?.observe(element);
    });
  }

  private applyInitialState() {
    const preparedElements = new Set<HTMLElement>();

    this.containers.forEach((container) => {
      this.collectTargets(container).forEach((target, fallbackIndex) => {
        if (preparedElements.has(target)) return;

        preparedElements.add(target);

        const staggerIndex = this.getNumericDataAttribute(
          target.dataset.staggerIndex,
          fallbackIndex,
        );
        const staggerDelay = this.getNumericDataAttribute(
          target.dataset.staggerDelay,
          this.defaultStaggerDelay,
        );
        const duration = this.getNumericDataAttribute(
          target.dataset.duration,
          this.defaultDuration,
        );

        target.style.setProperty(
          '--scroll-animations-stagger-index',
          String(staggerIndex),
        );
        target.style.setProperty(
          '--scroll-animations-stagger-delay',
          `${staggerDelay}ms`,
        );
        target.style.setProperty('--scroll-animations-duration', `${duration}ms`);

        target.classList.add(this.hiddenClass, this.transitionClass);
      });
    });
  }

  private flushRevealQueue() {
    this.revealQueue.forEach((container) => {
      const targets = this.collectTargets(container);
      let longestTransition = 0;

      targets.forEach((target, fallbackIndex) => {
        const staggerIndex = this.getNumericDataAttribute(
          target.dataset.staggerIndex,
          fallbackIndex,
        );
        const staggerDelay = this.getNumericDataAttribute(
          target.dataset.staggerDelay,
          this.defaultStaggerDelay,
        );
        const duration = this.getNumericDataAttribute(
          target.dataset.duration,
          this.defaultDuration,
        );

        longestTransition = Math.max(
          longestTransition,
          staggerIndex * staggerDelay + duration,
        );

        target.classList.add(this.willChangeClass);
      });

      targets.forEach((target) => {
        target.classList.remove(this.hiddenClass);
      });

      const timeoutId = window.setTimeout(() => {
        targets.forEach((target) => {
          target.classList.remove(this.willChangeClass);
        });
        this.cleanupTimeouts.delete(timeoutId);
      }, longestTransition + 120);

      this.cleanupTimeouts.add(timeoutId);
    });

    this.revealQueue.clear();
  }

  private revealImmediately() {
    const targets = document.querySelectorAll<HTMLElement>(this.targetSelector);

    targets.forEach((target) => {
      target.classList.remove(
        this.hiddenClass,
        this.transitionClass,
        this.willChangeClass,
      );
    });
  }

  private collectTargets(container: HTMLElement) {
    const allTargets = Array.from(
      container.querySelectorAll<HTMLElement>(this.targetSelector),
    );
    const uniqueTargets: HTMLElement[] = [];
    const seenTargets = new Set<HTMLElement>();

    if (container.matches(this.targetSelector)) {
      allTargets.unshift(container);
    }

    allTargets.forEach((target) => {
      if (seenTargets.has(target)) return;
      seenTargets.add(target);
      uniqueTargets.push(target);
    });

    return uniqueTargets;
  }

  private getNumericDataAttribute(value: string | undefined, fallback: number) {
    const parsed = Number.parseInt(value ?? '', 10);
    return Number.isNaN(parsed) ? fallback : parsed;
  }

  destroy() {
    this.observer?.disconnect();
    this.observer = null;

    if (this.revealFrameId !== null) {
      cancelAnimationFrame(this.revealFrameId);
      this.revealFrameId = null;
    }

    this.cleanupTimeouts.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });

    this.cleanupTimeouts.clear();
    this.revealQueue.clear();
    this.containers = [];
  }
}
