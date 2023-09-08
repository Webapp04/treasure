import React from "react";
import { default as CurrencyInputStory } from "./currencyInput";

export default {
  title: "Atom/CurrencyInput",
  component: CurrencyInputStory,
  argTypes: {},
};

const Template = (args) => <CurrencyInputStory {...args} />;

export const CurrencyInput = Template.bind({});

CurrencyInput.args = {
  isDark: true,
  price: 0,
  onChangePrice: () => {},
  isOpenCurrencyList: true,
  onOpenCurrencyList: () => {},
  onCloseCurrencyList: () => {},
  selectedCurrency: () => {},
  onChangeCurrency: () => {},
  hideCurrencyList: false,
};
