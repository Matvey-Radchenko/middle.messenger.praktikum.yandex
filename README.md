# Memessenger

Это учебный проект чата, разработанный с целью понять,
как мы дошли до жизни такой (с React'ом).

## Технологии

- **Vite** — Быстрая сборка проекта
- **Handlebars (hbs)** — Шаблонизатор для отрисовки страниц
- **PostCSS** — Для обработки CSS, включая поддержку автопрефиксов и вложенности
- **TypeScript** — Статическая типизация для надежного кода
- **ESLint** — Линтер для TypeScript с поддержкой современных правил
- **Stylelint** — Линтер для CSS с поддержкой современных правил
- **Prettier** — Форматирование кода
- **Mocha** — Фреймворк для тестирования
- **Husky** — Git-хуки для автоматизации проверок перед коммитом

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone git@github.com:Matvey-Radchenko/middle.messenger.praktikum.yandex.git
cd middle.messenger.praktikum.yandex
```

### 2. Установка зависимостей

Убедитесь, что у вас установлен Node.js (требуется версия >=18).

```bash
npm install
```

### 3. Запуск проекта

**Режим разработки**

```bash
npm run dev
```

Проект будет доступен по адресу http://localhost:5173 с автоматическим открытием в браузере.

**Сборка и запуск для продакшена**

```bash
npm run start
```

Соберет проект и запустит сервер на http://localhost:3000.

### 4. Дополнительные команды

```bash
npm run test          # Запуск тестов
npm run lint         # Проверка TypeScript файлов линтером
npm run lint:fix     # Исправление ошибок линтера в TypeScript файлах
npm run lint:styles  # Проверка CSS файлов линтером
npm run lint:styles:fix # Исправление ошибок линтера в CSS файлах
npm run format       # Форматирование кода через Prettier
npm run typecheck    # Проверка типов TypeScript
npm run check        # Запуск всех проверок (линтеры, тесты, типы)
```

## Архитектура проекта

В проекте применена современная frontend архитектура Feature Sliced Design.
[Подробнее об FSD](https://feature-sliced.design/ru/docs/get-started/overview)

```bash
src/
├── app/            # Точка входа, глобальные стили, роутинг, состояние приложения
├── pages/          # Страницы приложения
├── features/       # Реализация фич продукта
├── entities/       # Бизнес сущности
└── shared/         # Переиспользуемые компоненты, утилиты, типы
    ├── lib/        # Базовые классы и утилиты
    └── ui/         # UI компоненты
```

## Git Workflow

Проект использует git-хуки для обеспечения качества кода:

- **pre-commit**: запускает проверки линтеров, тестов и типов
- **pre-push**: проверяет успешность сборки проекта

## Дизайн проекта

Проект реализован по [учебным макетам](https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0-1&node-type=canvas&t=qHweDGTmqQE5gDoN-0)

## Навигация

Netlify: https://dashing-kashata-cb33c9.netlify.app  
• [Авторизация](https://dashing-kashata-cb33c9.netlify.app/login)  
• [Регистрация](https://dashing-kashata-cb33c9.netlify.app/sign-up)  
• [Список чатов и просмотр переписки](https://dashing-kashata-cb33c9.netlify.app/chat)  
• [Профиль пользователя](https://dashing-kashata-cb33c9.netlify.app/settings)  
• [404](https://dashing-kashata-cb33c9.netlify.app/404)  
• [500](https://dashing-kashata-cb33c9.netlify.app/500)

## TODO

- Добавить поддержку темной темы
- Улучшить покрытие тестами

## Контакты

**Разработчик**: Матвей Радченко  
**GitHub**: https://github.com/Matvey-Radchenko  
**Telegram**: @tg_matvey
