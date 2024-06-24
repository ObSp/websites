export class GistDatabase{

    constructor(TOKEN, ID){
        this.TOKEN = TOKEN;
        this.GIST_ID = ID;
        this.FETCH_URL = `https://api.github.com/gists/${this.GIST_ID}`

        /**A cache of all entries (new or existing) that were modified in the current session.*/
        this.ENTRY_CACHE = {}
    }

    /**Returns the value of the JSON file with the specified key
     * 
     * @param {*} key - The key of the value to look for
     * @returns The value of the specified key
     */
    async get(key){
        key += ".json" //add .json extension to end of files

        const req = await fetch(this.FETCH_URL);
        const gist = await req.json();

        const keyFile = gist.files[key];

        if (keyFile == undefined)
            return;

        return JSON.parse(keyFile.content);
    }

    /**Sets the content of the JSON file corresponding to the key parameter's contents
     * to be the data parameter, creating a new file if one doesn't exist yet.
     * 
     * @param {*} key 
     * @param {*} data 
     */
    async set(key, data){
        this.ENTRY_CACHE[key] = new Entry(key, data)

        key += ".json" //add file extension to make sure it generates a JSON file

        const req = await fetch(this.FETCH_URL, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${this.TOKEN}`
            },
            body: JSON.stringify({
                files: {
                    [key]: {
                        content: JSON.stringify(data)
                    }
                }
            })
        })
        return req.json()
    }

    
    /**Removes the specified key from the database
     * 
     * @param {*} key 
     */
    async remove(key){
        key += ".json"

        const req = await fetch(this.FETCH_URL, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${this.TOKEN}`
            },
            body: JSON.stringify({
                files: {
                    [key]: null
                }
            })
        })
        return req.json()
    }

    /** @deprecated
     * Sets the raw value of the JSON file to the value of the data parameter
     * 
     * @param {*} data - The data to set the JSON file to
     * @returns The new value of the JSON file
     */
    async rawset(data){
        const req = await fetch(this.FETCH_URL, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${this.TOKEN}`
            },
            body: JSON.stringify({
                files: {
                    [this.DATABASE_NAME]: {
                        content: JSON.stringify(data)
                    }
                }
            })
        })
        return req.json()
    }
}

class Entry{
    constructor(key, value){
        this.key = key;
        this.value = value;
    }
}