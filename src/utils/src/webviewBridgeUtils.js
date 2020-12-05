import {
  browserReactNativeModuleProviderFactory
} from 'fengwuxp-react-native-webview-bridge/browser'
// import { BrowserNativeModuleInterface } from 'fengwuxp-declarative-webview-bridge-adapter/browser'

// export interface NativeModuleInterface {

//     Toast: NativeToastModuleInterface
// }

// export interface NativeToastModuleInterface extends BrowserNativeModuleInterface {
//     show: (message: string) => Promise<void>;
// }

// export interface NativeAppRouter {
//     reLaunchIndex: () => Promise<void>;
// }

// 调用原生能力
export const WebviewBridgeHolder = browserReactNativeModuleProviderFactory()

export const NativeToastModule = WebviewBridgeHolder.getModule('Toast')
export const NativeAppRouter = WebviewBridgeHolder.getModule('AppRouter')
export const TestNativeModule = WebviewBridgeHolder.getModule('Test')
