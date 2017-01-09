var NativeModules, PropTypes, RNSearchBar, React, ReactNative, SearchBar, TextInputState;

React = require('react');

ReactNative = require('react-native');

TextInputState = require('react-native/Libraries/Components/TextInput/TextInputState');

RNSearchBar = ReactNative.requireNativeComponent('RNSearchBar', null);

PropTypes = React.PropTypes;

NativeModules = ReactNative.NativeModules;

SearchBar = React.createClass({
  propTypes: {
    placeholder: PropTypes.string,
    text: PropTypes.string,
    barTintColor: PropTypes.string,
    tintColor: PropTypes.string,
    textColor: PropTypes.string,
    textFieldBackgroundColor: PropTypes.string,
    showsCancelButton: PropTypes.bool,
    onChange: PropTypes.func,
    onChangeText: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onSearchButtonPress: PropTypes.func,
    onCancelButtonPress: PropTypes.func,
    enablesReturnKeyAutomatically: PropTypes.bool,
    hideBackground: PropTypes.bool,
    barStyle: PropTypes.oneOf(['default', 'black']),
    searchBarStyle: PropTypes.oneOf(['default', 'prominent', 'minimal']),
    editable: PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      barStyle: 'default',
      searchBarStyle: 'default',
      editable: true
    };
  },
  _onChange: function(e) {
    var base, base1;
    if (typeof (base = this.props).onChange === "function") {
      base.onChange(e);
    }
    return typeof (base1 = this.props).onChangeText === "function" ? base1.onChangeText(e.nativeEvent.text) : void 0;
  },
  _onPress: function(e) {
    var base, base1, button;
    button = e.nativeEvent.button;
    if (button === 'search') {
      return typeof (base = this.props).onSearchButtonPress === "function" ? base.onSearchButtonPress(e.nativeEvent.searchText) : void 0;
    } else if (button === 'cancel') {
      return typeof (base1 = this.props).onCancelButtonPress === "function" ? base1.onCancelButtonPress() : void 0;
    }
  },
  _onFocus: function() {
    var base, handle;
    handle = ReactNative.findNodeHandle(this);
    TextInputState._currentlyFocusedID = handle;
    return typeof (base = this.props).onFocus === "function" ? base.onFocus(e.nativeEvent.text) : void 0;
  },
  _onBlur: function() {
    var base;
    TextInputState._currentlyFocusedID = null;
    return typeof (base = this.props).onBlur === "function" ? base.onBlur(e.nativeEvent.text) : void 0;
  },
  _setCurrentlyFocused: function(viewID) {
    return TextInputState._currentlyFocusedID = viewID;
  },
  blur: function() {
    return NativeModules.RNSearchBarManager.blur(ReactNative.findNodeHandle(this));
  },
  focus: function() {
    return NativeModules.RNSearchBarManager.focus(ReactNative.findNodeHandle(this));
  },
  unFocus: function() {
    return NativeModules.RNSearchBarManager.unFocus(ReactNative.findNodeHandle(this));
  },
  render: function() {
    return <RNSearchBar
      style={{height: NativeModules.RNSearchBarManager.ComponentHeight}}
      onChange={this._onChange}
      onPress={this._onPress}
      {...this.props}
      onFocus={this._onFocus}
      onBlur={this._onBlur}
    />;
  }
});

module.exports = SearchBar;
