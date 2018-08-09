import PropTypes from 'prop-types';

export class UntapClient {
    constructor(baseUrl, axios){
        this.http = axios.create({
            baseURL: baseUrl
        });
    }

    getPack(drafter) {
        return this.http.get("/pack/" + drafter)
            .then((response) => {
                return response.data.map((card) => this.toCardShape(card));
            })
    }

    createDrafter(drafter) {
        return this.http.post('/drafter/create', {
            drafter: drafter
        })
    }

    pickCard(drafter, cardId) {
        return this.http.post('/drafter/' + drafter + '/pickCard', {
            cardId: cardId
        })
    }

    pickedCards(drafter) {
        return this.http.get("/drafter/" + drafter + "/pickedCards")
            .then((response) => {
                return response.data.map((card) => this.toCardShape(card));
            })
    }

    toCardShape(card) {
        return {
            id: card.id,
            name: card.name,
            image: card.image,
        }
    }
}

export const UntapClientShape = PropTypes.shape(
    {
        getPack: PropTypes.func.isRequired,
        createDrafter: PropTypes.func.isRequired,
        pickCard: PropTypes.func.isRequired,
        pickedCards: PropTypes.func.isRequired,
    }
)