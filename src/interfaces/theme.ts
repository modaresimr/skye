export interface ITheme {
  titlebar: {
    background: string;
  };
  addressbar: {
    text: string;
    background: string;
  };
  toolbar: {
    background: string;
    seperator: string;
    border: string;
  };
  tab: {
    text: string;
    selected: {
      text: string;
      background: string;
    };
    background: string;
  };
  control: {
    background: string;
    value: string;
    border: string;
    hover: {
      background: string;
    };
  };
  switch: {
    background: string;
  };
  button: {
    primary: {
      background: string;
      text: string;
    };
    secondary: {
      background: string;
      text: string;
    };
    dark: {
      background: string;
      text: string;
    };
    light: {
      background: string;
      text: string;
    };
    danger: {
      background: string;
      text: string;
    };
    warning: {
      background: string;
      text: string;
    };
    success: {
      background: string;
      text: string;
    };
  };

  dialog: {
    seperator: string;
    background: string;
    text: string;
  };

  searchbox: {
    background: string;
  };

  pages: {
    background: string;
    text: string;
    navigationDrawer1: {
      background: string;
    };
    navigationDrawer2: {
      background: string;
      searchBar: {
        background: string;
      };
    };
  };

  dropdown: {
    background: {
      color: string;
      translucent: string;
    };
    seperator: string;
  };
  backgroundColor: string;
  accentColor: string;

  animations?: boolean;

  titlebarHeight?: number;
  tabHeight?: number;
  tabMarginTop?: number;
  isCompact?: boolean;

  dark?: boolean;
  easingFunction: string;
  dialogEasing: string;
}
