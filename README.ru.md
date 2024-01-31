# @2e32/react-select

React select.

## Установка

```bash
yarn add @2e32/react-select
```

## Использование

App.js

```javascript
// Единожды подключить стиль селекта на уровне приложения (точки входа)
import '@2e32/react-select/css';

const App = () => <Page />;

export default App;
```

Page.js

```javascript
// Импортировать компонент
import Select from '@2e32/react-select';

const Page = () => {
  return <Select />;
};

export default Page;
```

## Примеры

Смотри [storybook](https://github.com/2e32/react-select-storybook).

## Лицензия

[MIT](https://choosealicense.com/licenses/mit)
