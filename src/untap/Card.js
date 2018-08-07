import PropTypes from 'prop-types';

export const CardShape = PropTypes.shape(
    {
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }
)