interface Window {
    api: {
        sendText: (channel: string, text: string) => void,
        receiveText: (channel: string, func: (event: Event, text: string) => void) => void,
    },
}