import React from 'react'
//chakra UI
import { Input, InputLeftElement, InputGroup } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'

const SearchInput = ({searchTerm, setSearchTerm , setLoading}) => {
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        setLoading(true);
    }

    return (
        <div className="search-box">
            <h1 className="title">The Shoppies</h1>
            <InputGroup>
                <InputLeftElement height="100%" children={<SearchIcon color="gray.300" size="lg"/>} />
                <Input 
                    size="lg" 
                    placeholder="Search for movies..." 
                    value={searchTerm} 
                    onChange={handleChange}
                    focusBorderColor="teal.400"
                />
            </InputGroup>
            <p className="italic">Note: Please enter at least 3 characters for the best search experiences</p>
        </div>
    )
}

export default SearchInput;
