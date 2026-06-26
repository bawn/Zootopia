# Zootopia

Zootopia is a React Native mobile application built for iOS and Android. The app uses `react-native-router-flux` for navigation, Realm for local data storage, and a set of custom screens for browsing content, managing user accounts, and handling order-related flows.

## Features

- Cross-platform support for iOS and Android
- Tab-based navigation with login and account flows
- Content browsing pages such as Home, Discovery, Category, and Channel Detail
- Product detail and order confirmation flows
- User center pages for likes, subscriptions, coupons, orders, and support
- Web view and camera roll integration

## Tech Stack

- React Native 0.40
- React 15.4
- `react-native-router-flux` for routing
- Realm for local persistence
- Jest for unit tests

## Project Structure

- `index.android.js` and `index.ios.js`: platform entry points
- `app/render/`: screen components and shared UI pieces
- `app/models/`: local data models and user helpers
- `app/assets/`: static JSON data and HTML assets
- `android/` and `ios/`: native platform projects

## Prerequisites

- Node.js and npm
- React Native CLI compatible with the installed React Native version
- Xcode for iOS development
- Android Studio and the Android SDK for Android development

## Installation

```bash
npm install
```

If you are working on the native projects, install the iOS dependencies as well:

```bash
cd ios && pod install
```

## Running the App

Start the Metro bundler:

```bash
npm start
```

Run on iOS from Xcode or with the React Native CLI available in this project setup.

Run on Android from Android Studio or by using the Android build configuration in `android/`.

## Testing

```bash
npm test
```

## Notes

- This codebase is built on an older React Native stack, so some setup steps may differ from modern React Native projects.
- The app currently fetches content from external APIs, so some screens may depend on backend availability.

## License

No license file is included in this repository.