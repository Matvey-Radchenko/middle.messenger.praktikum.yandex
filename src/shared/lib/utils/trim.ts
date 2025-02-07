export function trim(target: string, symbols = '') {
    const search = symbols + '\\s';
    const regexp = new RegExp(`(^[${search}]*|[${search}]*$)`, 'gm');

    return target.replace(regexp, '');
}
