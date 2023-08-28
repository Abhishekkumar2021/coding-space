import React from 'react'

const GoBack = () => {
    window.history.go(-window.history.length);
    return (
        <div>
        </div>
    )
}

export default GoBack