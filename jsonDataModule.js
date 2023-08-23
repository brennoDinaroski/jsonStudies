export let jsonData = null
let jsonDataPromise = null

export function setJsonData(data) {

    console.log('setJsonData executed')
    jsonData = data
    console.log('setJsonData after executed', jsonData )

    if(jsonDataPromise) {
        jsonDataPromise.resolve(data)
    }
}

export function getJsonData() {
    console.log('getJsonData executed')

    if (jsonData) {
        return jsonData
        /* return Promise.resolve(jsonData) */
        
    } else {
        if (!jsonDataPromise) {
            jsonDataPromise = {}
            jsonDataPromise.promise = new Promise((resolve) => {
                jsonDataPromise.resolve = resolve
            })
        }
        return jsonDataPromise.promise 
    }
}