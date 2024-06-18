export class GistDatabase{

    constructor(TOKEN, ID, DATABASE_NAME, MISC_NAME){
        this.TOKEN = TOKEN;
        this.GIST_ID = ID;
        this.DATABASE_NAME = DATABASE_NAME
        this.MISC_NAME = MISC_NAME
        this.FETCH_URL = `https://api.github.com/gists/${this.GIST_ID}`

        /**A cache of all entries (new or existing) that were modified in the current session.*/
        this.ENTRY_CACHE = {}
    }

    /**Returns the value of the specified key in the JSON file.
     * 
     * @param {*} key - The key of the value to look for
     * @returns The value of the specified key
     */
    async get(key){
        const data = await this.rawget();
        const val = data[key]
        return val
    }

    /**Sets the value of the key parameter in the database to the given data.
     * 
     * @param {*} key 
     * @param {*} data 
     */
    async set(key, data){
        this.ENTRY_CACHE[key] = new Entry(key, data)

        const curdata = await this.rawget()
        curdata[key] = data;
        this.rawset(curdata);
    }

    async removeKey(key){
        const curdata = await this.rawget();
        const newdata = {};
        Object.keys(curdata).forEach(k => {
            if (k !== key) newdata[k] = curdata[k];
        })
        this.rawset(newdata);
    }

    /**Returns a list of Entry objects, created from the keys and values in the database
     * 
     * @returns 
     */
    async getEntries(){
        const data = await this.rawget()
        const entries = []
        Object.keys(data).forEach(key => {
            entries.push(new Entry(key, data[key]))
        })
        return entries
    }

    /**Clears all data in the database
     * 
     */
    async clear(){
        this.rawset({})
    }

    /**Returns the raw data of the JSON file
     * 
     */
    async rawget(){
        const req = await fetch(this.FETCH_URL);
        const gist = await req.json();

        return JSON.parse(gist.files[this.DATABASE_NAME].content);
    }

    /**Sets the raw value of the JSON file to the value of the data parameter
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