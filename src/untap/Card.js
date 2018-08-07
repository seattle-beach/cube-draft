import PropTypes from 'prop-types';

export const CardShape = PropTypes.shape(
    {
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }
)