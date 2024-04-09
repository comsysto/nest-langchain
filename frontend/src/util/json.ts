

export function isValidJSON(str : string) : boolean {
    try {
        JSON.parse(str)
        return true
    } catch (_) {}

    return false
}

export function readableJSON(json : string | object) : string {


    if(typeof json == "string" && isValidJSON(json))
        json = JSON.parse(json)
        

    return JSON.stringify(json, null, 2)
}