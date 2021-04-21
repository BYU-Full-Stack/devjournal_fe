export type RouteMatchType = {
    path?: string,
    params?: { username?: string, id?: string },
    url?: string,
    isExact?: boolean,
}