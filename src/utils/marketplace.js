export const setTokenImage = (
    callback,
    token,
    isCloudheadsCollection = false,
    isJoepegsCollection = false,
    isCommunityCollection = false
) => {
    if (isCloudheadsCollection) {
        callback(token?.metadata?.cached_image?.length
            ? token?.metadata?.cached_image
            : null)
    } else if (isJoepegsCollection) {
        callback(token?.metadata?.image?.length
            ? `https://ipfs.io/${token?.metadata?.image?.split(':')?.join('')}`
            : null)
    } else if (isCommunityCollection) {
        callback(token?.fileLinkCDN?.length
            ? token?.fileLinkCDN
            : token?.metadata?.image?.length
                ? token?.metadata?.image
                : null)
    } else {
        callback(token?.metadata?.image)
    }
}
