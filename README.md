# Периодическая таблица элементов

Интерактивная таблица Менделеева с карточками элементов, коллекцией Мамонтова и справочными данными (NFPA, GHS, изотопы, γ-спектры).

## Разработка

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
npm run preview
```

## Проверки

```bash
npm run check      # typecheck + eslint
npm run typecheck  # только TypeScript
npm run lint       # только ESLint
```

## Обновление данных

| Команда | Назначение |
|---------|------------|
| `npm run data:details` | Свойства элементов → `src/data/details.json` |
| `npm run data:images` | Фото элементов → `src/assets/element-images/` |
| `npm run data:spectra` | Спектры → `src/assets/element-spectra/` |
| `npm run data:grids` | Структуры решётки → `src/assets/grid-structures/` |
| `npm run data:nfpa:apply` | NFPA-рейтинги → `details.json` |
| `npm run data:nfpa:validate` | Проверка `scripts/data/nfpa-element-ratings.json` |
| `npm run data:ghs` | GHS-пиктограммы → `src/data/element-ghs.json` |
| `npm run data:youtube` | Ссылки Thoisoi → `src/data/thoisoi-youtube.json` |
| `npm run data:spectrum:convert` | RadiaCode XML → JSON для коллекции |
