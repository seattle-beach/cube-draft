export class UntapClient {
    constructor(baseUrl, axios){
        this.baseUrl = baseUrl;
        this.axios = axios;
    }

    getPack() {
        return this.axios.get(this.baseUrl + "/pack")
            .then((response) => {
                return response.data;
            })
    }
}