import React from 'react'
import { Spinner } from "@chakra-ui/react"

const Loader = () => {
    return (
        <div className="loader">
            <Spinner size="xl" />
            <p>Getting Movies...</p>
        </div>
    )
}

export default Loader
