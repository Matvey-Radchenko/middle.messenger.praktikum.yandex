export function trim(target: string, symbols = '') {
    const search = symbols + '\\s';
    console.log(search, `(^[${search}]*|[${search}]*$)`);

    const regexp = new RegExp(`(^[${search}]*|[${search}]*$)`, 'gm');
    console.log(target.match(regexp));
    return target.replace(regexp, '');
}
