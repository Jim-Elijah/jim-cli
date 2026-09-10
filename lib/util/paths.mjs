import os from 'os';
import path from 'path';

const APP_NAME = 'jim-cli';

/**
 * Platform-standard config directory for jim-cli.
 * - macOS: ~/Library/Preferences/jim-cli
 * - Windows: %APPDATA%\jim-cli
 * - Linux/others: $XDG_CONFIG_HOME/jim-cli or ~/.config/jim-cli
 */
export function getConfigDir() {
  switch (process.platform) {
    case 'darwin':
      return path.join(os.homedir(), 'Library', 'Preferences', APP_NAME);
    case 'win32':
      return path.join(
        process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'),
        APP_NAME
      );
    default:
      return path.join(
        process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.config'),
        APP_NAME
      );
  }
}

export function getTemplatePath() {
  return path.join(getConfigDir(), 'template.json');
}
