// Change this variable to false in production.
export const DEBUG = true;

export function consoleLog(message: string | number | number[]): void {
    if (DEBUG) {
        console.log(message)
    }
}
