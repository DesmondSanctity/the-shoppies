import React from 'react'
import { Spinner } from "@chakra-ui/react"

const Loader = () => {
    return (
        <div className="loader">
            <Spinner
            m="5"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
            />
            <p>Getting Movies...</p>
        </div>
    )
}

export default Loader
