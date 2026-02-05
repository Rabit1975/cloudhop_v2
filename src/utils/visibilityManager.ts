type Subscriber = () => void;

class GlobalVisibilityManager {
  activeScreen: string = 'home';
  visibleComponents = new Set<string>();
  subscribers = new Set<Subscriber>();

  setActiveScreen(screen: string) {
    this.activeScreen = screen;
    this.notify();
  }

  setComponentVisible(id: string, isVisible: boolean) {
    if (isVisible) {
      this.visibleComponents.add(id);
    } else {
      this.visibleComponents.delete(id);
    }
    this.notify();
  }

  isComponentVisible(id: string) {
    return this.visibleComponents.has(id);
  }

  subscribe(fn: Subscriber) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }

  private notify() {
    this.subscribers.forEach(fn => fn());
  }
}

export const VisibilityManager = new GlobalVisibilityManager();
