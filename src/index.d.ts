import 'styled-components';
import { ITheme } from './interfaces';

declare module '*.svg';
declare module '*.png';
declare module '*.woff2';

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
