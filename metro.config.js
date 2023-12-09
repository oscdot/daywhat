/* eslint-env node */
import { getDefaultConfig } from 'expo/metro-config'

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
})

export default config
