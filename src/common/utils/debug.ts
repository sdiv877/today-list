/**
 * Change this variable to false in production.
 */
export const DEBUG = true;

/**
 * Conditional console.log() that only works when DEBUG is enabled.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LOG(msg: any, serviceName: string = null, leadingNL = false): void {
  if (DEBUG) {
    if (serviceName != null) {
      msg = `[${serviceName}] ${msg}`;
    }
    if (leadingNL) {
      msg = '\n' + msg;
    }
    console.log(msg);
  }
}
