
/*
 * WKWebView
*/
import React, {
  PropTypes,
  Component
} from 'react';

import ReactNative, {
  requireNativeComponent,
  View
} from 'react-native';

import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'

var RCTWKWebView = requireNativeComponent('RCTWKWebView', WKWebView);

/**
 * Renders a native WebView.
 */
export default class WKWebView extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    ...View.propTypes,
    source: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
        method: PropTypes.string,
        headers: PropTypes.object,
        body: PropTypes.string,
      }),
      PropTypes.shape({
        html: PropTypes.string,
        baseUrl: PropTypes.string,
      }),
      PropTypes.number,
    ]),
  }
  render() {
    return (
      <View style={styles.container}>
        <RCTWKWebView
          ref={'webview'}
          key="webViewKey"
          style={[this.props.style]}
          source={resolveAssetSource(this.props.source)}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  }
}
