import PropTypes from 'prop-types';

export class UntapClient {
    constructor(baseUrl, axios){
        this.baseUrl = baseUrl;
        this.axios = axios;
    }

    getPack(drafter) {
        return this.axios.get(this.baseUrl + "/pack/" + drafter)
            .then((response) => {
                return response.data;
            })
    }

    createDrafter(drafter) {
        return this.axios.post(this.baseUrl + '/drafter/create', {
            drafter: drafter
        }).then((response) => {
            return true
        })
    }
}

export const UntapClientShape = PropTypes.shape(
    {
        getPack: PropTypes.func.isRequired,
        createDrafter: PropTypes.func.isRequired,
    }
)