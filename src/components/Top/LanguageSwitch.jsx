import React from "react";
import { IntlConsumer } from "../../IntlContext";

const LanguageSwitch = () => (
  <IntlConsumer>
    {({ switchToEnglish, switchToDeutsch }) => (
      <React.Fragment>
        <button onClick={switchToEnglish}>
          English
        </button>
        <button onClick={switchToDeutsch}>
          Deutsch
        </button>
      </React.Fragment>
    )}
  </IntlConsumer>
);

export default LanguageSwitch;