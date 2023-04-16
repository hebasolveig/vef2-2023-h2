export function generateApiUrl(path) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    //console.log('base:', baseUrl);
    //console.log('path:', path);
    const url = new URL(path, baseUrl);

    return url;
}