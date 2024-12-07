const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

function handleHistoryChange(method: any, ...args: any) {
    setTimeout(() => {
        const event = new Event('historychange');
        window.dispatchEvent(event);
    });
}

history.pushState = function (...args) {
    handleHistoryChange('pushState', ...args);
    return originalPushState.apply(this, args);
};

history.replaceState = function (...args) {
    handleHistoryChange('replaceState', ...args);
    return originalReplaceState.apply(this, args);
};
