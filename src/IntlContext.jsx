import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import uk from 'react-intl/locale-data/uk';
import enTranslation from './lang/en';
import ukTranslation from './lang/uk';

addLocaleData([...en, ...uk]);

const { Provider, Consumer } = React.createContext();

class IntlProviderWrapper extends React.Component {
  switchToEnglish = () => this.setState({ locale: 'en', messages: enTranslation });
  switchToUkrainian = () => this.setState({ locale: 'uk', messages: ukTranslation });
  state = {
    locale: 'uk',
    messages: enTranslation,
    switchToEnglish: this.switchToEnglish,
    switchToUkrainian: this.switchToUkrainian,
  };

  componentDidMount() {
    if (navigator.language.startsWith('en')) this.setState({ locale: 'en', messages: ukTranslation });
  }

  render() {
    const { locale } = this.state;
    return (
      <Provider value={this.state} switchToUkrainian={this.switchToUkrainian} switchToEnglish={this.switchToEnglish}>
        <IntlProvider key={locale} {...this.state} defaultLocale={locale}>
          {this.props.children}
        </IntlProvider>
      </Provider>
    );
  }
}

export { IntlProviderWrapper as IntlProvider, Consumer as IntlConsumer };
