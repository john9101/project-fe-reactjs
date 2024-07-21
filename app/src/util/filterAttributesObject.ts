type Entry<T> = {
    [K in keyof T]: [K, T[K]]
}[keyof T]

export default function filterAttributesObject<T extends object>(
    obj: T,
    fn: (entry: Entry<T>, i: number, arr: Entry<T>[]) => boolean
) {
    return Object.fromEntries(
        (Object.entries(obj) as Entry<T>[]).filter(fn)
    ) as Partial<T>
}