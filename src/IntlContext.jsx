import React from "react";
import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import de from "react-intl/locale-data/de";
import deTranslation from "./lang/de";
import enTranslation from "./lang/en";

addLocaleData([...en, ...de]);

const { Provider, Consumer } = React.createContext();

class IntlProviderWrapper extends React.Component {
  constructor(...args) {
    super(...args);

    this.switchToEnglish = () =>
      this.setState({ locale: "en", messages: enTranslation });

    this.switchToDeutsch = () =>
      this.setState({ locale: "de", messages: deTranslation });

    this.state = {
      locale: "en",
      messages: enTranslation,
      switchToEnglish: this.switchToEnglish, 
      switchToDeutsch: this.switchToDeutsch 
    };
  }

  render() {
    const { children } = this.props;
    const { locale, messages } = this.state;
    return (
      <Provider value={this.state}>
        <IntlProvider
          key={locale}
          locale={locale}
          messages={messages}
          defaultLocale="en"
        >
          {children}
        </IntlProvider>
      </Provider>
    );
  }
}

export { IntlProviderWrapper as IntlProvider, Consumer as IntlConsumer };