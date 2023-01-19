import React, {
  Component
} from 'react';

import ReactNative, {
  View,
  WebView
} from 'react-native';

export default class WKWebView extends WebView {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <WKWebView style={styles.container}>
      </WKWebView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  }
}
