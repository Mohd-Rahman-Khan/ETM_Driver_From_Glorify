import React, { Component } from 'react';
import { View, Text, Button, Platform, PermissionsAndroid } from 'react-native';
import actions from '../redux/actions';
import DeviceInfo from 'react-native-device-info';
import { checkPermission } from 'react-native-floating-bubble';
import { BatteryOptEnabled } from 'react-native-battery-optimization-check/lib/commonjs';
import { showError } from './helperFunction';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  async addCrashData(error, errorInfo) {
    if (Platform.OS == "android") {
      const backgroundgranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: "ETravelMate",
          message: "ETavelmate want to access your background location to get your current position.",
          buttonNeutral: "Ok",
        }
      );
      const data = {
        ipAddress: await DeviceInfo.getIpAddress(),
        deviceType: 'mobile',
        deviceName: await DeviceInfo.getDeviceName(),
        oS: Platform.OS,
        activeStatus: 'YES',
        appVersion: version, // Ensure 'version' is defined or imported
        osVersion: Platform.OS === 'android' ? Platform.constants.Release : Platform.constants.osVersion,
        locationPermission: backgroundgranted === 'granted' ? 'granted' : 'denied', // Ensure 'backgroundgranted' is defined or imported
        displayOverOtherApp: await checkPermission(), // Ensure 'checkPermission' is defined or imported
        batteryOptimisationStatus: await BatteryOptEnabled(),
        error: error,
        errorInfo: errorInfo
      };

      actions
      .addCrashData(data)
      .then((res) => {
        console.log('error added => '+ JSON.stringify(res))
      })
      .catch((err) => {
        showError(err);
      });
    } else {
      let data = {
        ipAddress: await DeviceInfo.getIpAddress().then((ip) => {
          return ip;
        }),
        deviceType: "mobile",
        deviceName: await DeviceInfo.getDeviceName().then((deviceName) => {
          return deviceName;
        }),
        oS: Platform?.OS,
        activeStatus: "YES",
        appVersion: version,
        osVersion:
          Platform?.OS == "android"
            ? Platform.constants["Release"]
            : Platform.constants["osVersion"],
        locationPermission: "granted",
        displayOverOtherApp: null,
        batteryOptimisationStatus: null,
      };
      
      actions
      .addCrashData(data)
      .then((res) => {
        console.log('error added => '+ JSON.stringify(res))
      })
      .catch((err) => {
        showError(err);
      });
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });

    this.addCrashData(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View>
          <Text>Something went wrong.</Text>
          <Text>{this.state.error && this.state.error.toString()}</Text>
          <Text>{this.state.errorInfo.componentStack}</Text>
          <Button
            title="Try again"
            onPress={() => this.setState({ hasError: false })}
          />
        </View>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
