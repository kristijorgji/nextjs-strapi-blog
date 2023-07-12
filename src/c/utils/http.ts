export function addOrUpdateUrlQueryParameter(uri: string, key: string, value: string): string {
    const i = uri.indexOf('#');
    const hash = i === -1 ? '' : uri.substr(i);
    uri = i === -1 ? uri : uri.substr(0, i);
    const encodedValue = encodeURIComponent(value);

    const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';

    if (!encodedValue) {
        // remove key-value pair if value is empty
        uri = uri.replace(new RegExp('([?&]?)' + key + '=[^&]*', 'i'), '');
        if (uri.slice(-1) === '?') {
            uri = uri.slice(0, -1);
        }
        // replace first occurrence of & by ? if no ? is present
        if (uri.indexOf('?') === -1) {
            uri = uri.replace(/&/, '?');
        }
    } else if (uri.match(re)) {
        uri = uri.replace(re, '$1' + key + '=' + encodedValue + '$2');
    } else {
        uri = `${uri}${separator}${key}=${encodedValue}`;
    }
    return uri + hash;
}

export function addOrUpdateUrlQueryParameters(uri: string, paramsMap: Record<string, string>): string {
    let newUri = uri;
    for (const key in paramsMap) {
        newUri = addOrUpdateUrlQueryParameter(newUri, key, paramsMap[key]);
    }
    return newUri;
}

export async function getJson<T>(r: Response): Promise<T | null> {
    try {
        return JSON.parse(await r.text());
    } catch (err) {
        return null;
    }
}

export const removeGivenQueryParams = function (url: string, keys: string[]): string {
    const parsedUrl = new URL(url);
    const params = new URLSearchParams(parsedUrl.search);
    for (const key of keys) {
        if (params.has(key)) {
            params.delete(key);
        }
    }
    const qs = params.toString();
    return `${url.replace(/\?.*/, '')}${qs.length === 0 ? '' : '?'}${params.toString()}${parsedUrl.hash}`;
};
