import React,{useState, useEffect} from 'react'
//chakra UI
import { Box, Image, Badge } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
//sweetalert
import swal from 'sweetalert';

const Nominations = ({nomMovie, setNomIDS}) => {
    const [nominationList, setNominationList] = useState([])
    const placeholderImage = "https://via.placeholder.com/150?text=N/A";

    useEffect(() => {
        const response = JSON.parse(localStorage.getItem('nominations'))||[];
        setNominationList(response);
    }, [nomMovie])

    const handleClick = (e, id) => {
        swal(
        {
            title: "Think Again Buddy ?",
            text: "Movie will be removed from nomination list",
            buttons: true
          }).then((value) => {
             if (value) {
                 swal("Success !", "Movie removed from list successfully", "success")
                const copy = nominationList.filter((movie) => movie.imdbID !== id)
                localStorage.setItem('nominations', JSON.stringify(copy));
                setNominationList(copy);
                setNomIDS(copy.map((movie) => movie.imdbID));
             }

          }
        )
    }
    
    return (
        <div className="nominations">
            <p className="title">Nominations</p>
            <div className="nominations-list">
            {nominationList.map((movie, index) => {
                return (
                    <Box w="100%" maxW="500px" borderWidth="1px" borderRadius="lg" overflow="hidden" key={index} m="2" d="flex" bg="gray.200" mx="auto">
                        <Image src={movie.Poster !== "N/A" ? movie.Poster : placeholderImage} alt={movie.Title} height="200px" width="150px"/>
                        <Box p="2" width="100%" d="flex" flexDirection="column" justifyContent="space-around">
                            <Box d="flex" alignItems="baseline" mt="2">
                                <Badge borderRadius="full" px="2" colorScheme="teal" >
                                {movie.Type}
                                </Badge>
                            </Box>
                        <Box
                            my="1"
                            fontWeight="semibold"
                            lineHeight="tight"
                        >
                            {movie.Title}
                        </Box>
                        <Box fontSize="12px" className="italic">
                           Released: {movie.Year}
                        </Box>
                        <Button size="sm" colorScheme="white" variant="outline" onClick={(e) => handleClick(e, movie.imdbID)}>
                            Remove
                        </Button>
                    </Box>
                </Box>
                )   
                })
            }
            </div>
        </div>
    )
}

export default Nominations
