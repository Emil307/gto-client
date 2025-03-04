// telegram.d.ts
interface TelegramWebApp {
  expand(): void;
  // Добавьте другие методы, если нужно
}

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export {};
