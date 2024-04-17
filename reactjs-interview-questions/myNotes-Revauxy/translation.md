there are different translatio tools depending on class or functional components:

class components rely on a HOC, while functional components on a in-component hook:

- Functional
```js
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();

  return <p>{t('key')}</p>;
}
```

- Class

```js
import { withTranslation } from 'react-i18next';

class MyClassComponent extends React.Component {
  render() {
    const { t, i18n } = this.props;

    return <p>{t('key')}</p>;
  }
}

export default withTranslation()(MyClassComponent);
```