import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    fontFamily: string;
    transitionTimingFunction: string;
    disabledColor: string;
    roundHeaders: {
      background: string;
    };
    matchBackground: {
      wonColor: string;
      lostColor: string;
    };
    border: {
      color: string;
      highlightedColor: string;
    };
    textColor: {
      highlighted: string;
      main: string;
      dark: string;
      disabled: string;
    };
    score: {
      text: {
        highlightedWonColor: string;
        highlightedLostColor: string;
      };
      background: {
        wonColor: string;
        lostColor: string;
      };
    };
    canvasBackground: string;
  }
}
