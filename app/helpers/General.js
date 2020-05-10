import AsyncStorage from '@react-native-community/async-storage';
import DocumentPicker from 'react-native-document-picker';

/**
 * Get data from store
 *
 * @param {string} key
 * @param {boolean} isString
 */
export async function GetStoreData(key, isString = true) {
  try {
    let data = await AsyncStorage.getItem(key);

    if (isString) {
      return data;
    }

    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
  return false;
}

/**
 * Set data from store
 *
 * @param {string} key
 * @param {object} item
 */
export async function SetStoreData(key, item) {
  try {
    //we want to wait for the Promise returned by AsyncStorage.setItem()
    //to be resolved to the actual value before returning the value
    if (typeof item !== 'string') {
      item = JSON.stringify(item);
    }

    return await AsyncStorage.setItem(key, item);
  } catch (error) {
    console.log(error.message);
  }
}

export async function pickFile() {
  // Pick a single file - returns actual path on Android, file:// uri on iOS
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.zip, DocumentPicker.types.allFiles],
      usePath: true,
    });
    return res.uri;
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
}

/**
 * Log all keys of AsyncStorage
 */
export async function logAsyncStorageKeys() {
  await AsyncStorage.getAllKeys((err, keys) => {
    console.log('AsyncStorage keys: ', keys);
  });
}

/**
 * Log all key-value pairs from AsyncStorage
 */
export async function logAsyncStorageValues() {
  try {
    let keys = await AsyncStorage.getAllKeys();
    var length = keys.length;
    console.log('AsyncStorage consists of:');
    for (var i = 0; i < length; i++) {
      let res = await GetStoreData(keys[i]);
      console.log('Storage item: ', keys[i] + ': ' + res);
    }
  } catch (err) {
    console.log(err);
  }
}
