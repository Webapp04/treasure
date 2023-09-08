import React from "react";
import { BrowserRouter } from "react-router-dom";

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  ),
];
