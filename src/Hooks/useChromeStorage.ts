export const useChromeStorage = () => {
    const get = async (key: string) => {


            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const result = await chrome.storage.local.get(key);
            return result[key];


        // return new Promise((resolve) => {
        //     chrome.storage.local.get(key, (result : any) => {
        //         resolve(result[key] || null);
        //     });
        // });
    };

    const set = async (key: string, value: string) => {

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return chrome.storage.local.set ( { [key] : value } )

    };

    // const remove = async (key: string): Promise<void> => {
    //     return new Promise((resolve) => {
    //         chrome.storage.local.remove(key, () => {
    //             resolve();
    //         });
    //     });
    // };

    return { get, set };
}