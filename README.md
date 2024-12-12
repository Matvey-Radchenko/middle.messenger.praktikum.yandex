# Memessenger

Это учебный проект чата, разработанный с целью понять,
как мы дошли до жизни такой (с React'ом).

## Технологии

- **Vite** — Быстрая сборка проекта.
- **Handlebars (hbs)** — Шаблонизатор для отрисовки страниц.
- **PostCSS** — Для обработки CSS, включая поддержку автопрефиксов.
- **TypeScript** — Статическая типизация для надежного кода.

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone git@github.com:Matvey-Radchenko/middle.messenger.praktikum.yandex.git
cd middle.messenger.praktikum.yandex
```

### 2. Установка зависимостей

Убедитесь, что у вас установлен Node.js (рекомендуемая версия: >=18.0.0).

```bash
npm install
```

### 3. Запуск проекта

**Режим разработки**

Для локального запуска:

```bash
npm run dev
```

Проект будет запущен по адресу http://localhost:3000.

**Сборка проекта**

Для подготовки к продакшену:

```bash
npm run build
```

Собранный проект будет находиться в папке dist.

## Файловая структура проекта

В проекте применена современная frontend архитектура Feature Sliced Design.
[Подробнее об FSD](https://feature-sliced.design/ru/docs/get-started/overview)

```bash
src/
├── app/            # Точка входа, глобальные CSS-стили, роутинг, state приложения
├── pages/          # Страницы приложения, их шаблоны и обработчики
├── widgets/        # пока не задействован
├── features/       # Повторно используемые реализации целых фич продукта
├── entities/       # Бизнес сущности проекта
└── shared/         # HBS-шаблоны, утилиты и вспомогательные функции
```

## Дизайн проекта

Проект реализован по [учебным макетам](https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0-1&node-type=canvas&t=qHweDGTmqQE5gDoN-0)

## Навигация

Netlify: https://dashing-kashata-cb33c9.netlify.app  
• [Авторизация](https://dashing-kashata-cb33c9.netlify.app/login)  
• [Регистрация](https://dashing-kashata-cb33c9.netlify.app/create-account)  
• [Список чатов и просмотр переписки](https://dashing-kashata-cb33c9.netlify.app/chat)  
• [Профиль пользователя](https://dashing-kashata-cb33c9.netlify.app/profile)  
• [404](https://dashing-kashata-cb33c9.netlify.app/404)  
• [500](https://dashing-kashata-cb33c9.netlify.app/500)

## TODO

    •	Реализовать свой фреймворк для ускорения дальнейшей разработки
    •	Подключить WebSocket для обмена сообщениями в реальном времени
    •	Добавить поддержку темной темы

## Контакты

**Разработчик**: Матвей Радченко  
**GitHub**: https://github.com/Matvey-Radchenko  
**Telegram**: @tg_matvey
