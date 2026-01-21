// GameHub iframe messaging bridge

export interface IframeMessage {
  type: 'keydown' | 'keyup' | 'focus' | 'blur' | 'gamemode';
  data: any;
}

export class GameHubIframeBridge {
  private iframe: HTMLIFrameElement | null = null;
  private messageHandlers: Map<string, (data: any) => void> = new Map();

  setIframe(iframe: HTMLIFrameElement | null) {
    this.iframe = iframe;
    
    if (iframe) {
      window.addEventListener('message', this.handleMessage);
    } else {
      window.removeEventListener('message', this.handleMessage);
    }
  }

  private handleMessage = (event: MessageEvent) => {
    if (!this.iframe || event.source !== this.iframe.contentWindow) {
      return;
    }

    const message = event.data as IframeMessage;
    const handler = this.messageHandlers.get(message.type);
    
    if (handler) {
      handler(message.data);
    }
  };

  on(type: string, handler: (data: any) => void) {
    this.messageHandlers.set(type, handler);
  }

  off(type: string) {
    this.messageHandlers.delete(type);
  }

  sendToIframe(message: IframeMessage) {
    if (this.iframe && this.iframe.contentWindow) {
      this.iframe.contentWindow.postMessage(message, '*');
    }
  }

  forwardKey(event: KeyboardEvent) {
    this.sendToIframe({
      type: event.type as 'keydown' | 'keyup',
      data: {
        key: event.key,
        code: event.code,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
      },
    });
  }

  destroy() {
    window.removeEventListener('message', this.handleMessage);
    this.messageHandlers.clear();
    this.iframe = null;
  }
}
