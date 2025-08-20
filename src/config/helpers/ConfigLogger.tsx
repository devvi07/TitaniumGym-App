import { logger, configLoggerType } from 'react-native-logs';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';
const config: configLoggerType<any, LogLevel> = {
  severity: 'debug',
  transportOptions: {
    _def: 'console', 
    colors: {
      debug: 'blueBright',
      info: 'greenBright',
      warn: 'yellow',
      error: 'red',
    },
  },
};

const log = logger.createLogger(config);

export default log;