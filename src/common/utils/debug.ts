/**
 * Change this variable to false in production.
 */
export const DEBUG = true;

/**
 * Conditional console.log() that only works when DEBUG is enabled.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LOG(message: any): void {
  if (DEBUG) {
    console.log(message);
  }
}
