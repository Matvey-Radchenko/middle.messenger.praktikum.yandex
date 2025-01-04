const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

function handleHistoryChange() {
    setTimeout(() => {
        const event = new Event('historychange');
        window.dispatchEvent(event);
    });
}

history.pushState = function (...args) {
    handleHistoryChange();
    return originalPushState.apply(this, args);
};

history.replaceState = function (...args) {
    handleHistoryChange();
    return originalReplaceState.apply(this, args);
};

window.addEventListener('popstate', () => {
    handleHistoryChange();
});
