import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import uk from 'react-intl/locale-data/uk';
import enTranslation from './lang/en';
import ukTranslation from './lang/uk';

addLocaleData([...en, ...uk]);

const { Provider, Consumer } = React.createContext();

class IntlProviderWrapper extends React.Component {
  state = {
    locale: 'en',
    messages: enTranslation,
  };

  switchToEnglish = () => this.setState({ locale: 'en', messages: enTranslation });

  switchToUkrainian = () => this.setState({ locale: 'uk', messages: ukTranslation });

  render() {
    const { locale, messages } = this.state;
    return (
      <Provider value={this.state}>
        <IntlProvider key={locale} locale={locale} messages={messages} defaultLocale="en">
          {this.props.children}
        </IntlProvider>
      </Provider>
    );
  }
}

export { IntlProviderWrapper as IntlProvider, Consumer as IntlConsumer };
