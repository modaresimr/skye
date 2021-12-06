import { ITheme } from '~/interfaces';

export const skyeLight: ITheme = {
  titlebar: {
    background: '#fff',
  },
  addressbar: {
    text: '#000',
    background: '#F4F4F4',
  },
  toolbar: {
    background: '#F4F4F4',
    border: 'rgba(0, 0, 0, 0.12)',
    seperator: 'rgba(0, 0, 0, 0.12)',
  },
  tab: {
    selected: {
      text: '#000',
      background: '#F1F1F1',
    },
    background: '#F9F9F9',
    text: 'rgba(0, 0, 0, 0.7)',
  },
  control: {
    background: '#F4F4F4',
    hover: {
      background: 'rgba(0, 0, 0, 0.1)',
    },
    value: '#000',
    border: '#E5F1FF',
  },
  button: {
    primary: {
      text: '#fff',
      background: '#000',
    },
    secondary: {
      text: '#fff',
      background: '#000',
    },
    dark: {
      text: '#fff',
      background: '#000',
    },
    light: {
      text: '#000',
      background: '#fff',
    },
    danger: {
      text: '#fff',
      background: '#f86464',
    },
    warning: {
      text: '#fff',
      background: '#ff7d0e',
    },
    success: {
      text: '#fff',
      background: '#23db5f',
    },
  },
  switch: {
    background: 'rgba(0, 0, 0, 0.16)',
  },
  dialog: {
    seperator: 'rgba(0,0,0,0.12)',
    background: '#FFF',
    text: '#000',
  },
  searchbox: {
    background: '#F7FBFF',
  },
  pages: {
    background: '#fff',
    text: '#000',
    navigationDrawer1: {
      background: '#E5F1FF',
    },
    navigationDrawer2: {
      background: '#F2F8FF',
      searchBar: {
        background: '#ffffff',
      },
    },
  },
  dropdown: {
    background: {
      color: '#fff',
      translucent: 'rgba(255, 255, 255, 0.7)',
    },
    seperator: 'rgba(0, 0, 0, 0.12)',
  },
  accentColor: '#fff',
  backgroundColor: '#fff',
  easingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  dialogEasing: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
};

export const skyeDark: ITheme = {
  titlebar: {
    background: '#070B10',
  },
  addressbar: {
    text: '#fff',
    background: '#1F1F1F',
  },
  toolbar: {
    background: '#000',
    border: 'rgba(255, 255, 255, 0.08)',
    seperator: 'rgba(255, 255, 255, 0.12)',
  },
  tab: {
    selected: {
      text: '#fff',
      background: '#1F1F1F',
    },
    background: '#121212',
    text: 'rgba(255, 255, 255, 0.54)',
  },
  control: {
    background: '#11151A',
    hover: {
      background: 'rgba(255, 255, 255, 0.12)',
    },
    value: '#fff',
    border: '#10121a',
  },
  button: {
    primary: {
      text: '#000',
      background: '#fff',
    },
    secondary: {
      text: '#000',
      background: '#fff',
    },
    dark: {
      text: '#fff',
      background: '#000',
    },
    light: {
      text: '#000',
      background: '#fff',
    },
    danger: {
      text: '#fff',
      background: '#f86464',
    },
    warning: {
      text: '#fff',
      background: '#ff7d0e',
    },
    success: {
      text: '#fff',
      background: '#23db5f',
    },
  },
  switch: {
    background: 'rgba(255, 255, 255, 0.24)',
  },
  dialog: {
    seperator: 'rgba(255, 255, 255, 0.12)',
    background: '#000',
    text: '#fff',
  },
  searchbox: {
    background: '#070B10',
  },
  pages: {
    background: '#000',
    text: '#fff',
    navigationDrawer1: {
      background: '#12151f',
    },
    navigationDrawer2: {
      background: '#10121a',
      searchBar: {
        background: '#000000',
      },
    },
  },
  dropdown: {
    background: {
      color: '#1A1E2C',
      translucent: 'rgb(60, 60, 60, 0.6)',
    },
    seperator: 'rgba(255, 255, 255, 0.12)',
  },
  backgroundColor: '#000',
  accentColor: '#fff',
  easingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  dialogEasing: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
};
