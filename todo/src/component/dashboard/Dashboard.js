import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Todos from '../todos/Todos'

const Dashboard = props => {
    return (
        <Fragment>
            <Todos/>
        </Fragment>
    )
}

Dashboard.propTypes = {

}

export default Dashboard
