import React,{useEffect} from 'react'
//chakra UI
import { Box, Image, Badge } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { useToast } from "@chakra-ui/react"
// sweetalert
import swal from 'sweetalert';

const DisplayMovies = ({movies, setNomMovie, nomIDS}) => {

    const toast = useToast();
    const placeholderImage = "https://via.placeholder.com/150?text=N/A"
    let nominationList = JSON.parse(localStorage.getItem("nominations")) || [];
    useEffect((nominationList) => {
       nominationList = JSON.parse(localStorage.getItem("nominations")) || []; 
    }, [setNomMovie])
    
    useEffect(() => {
    }, [nomIDS])

    const handleClick = (e, movie) => {
        let foundMatch = false;
        if (nominationList.length < 5) {
            for (let i = 0; i < nominationList.length; i++) {
                if (nominationList[i].imdbID === movie.imdbID) {
                    toast(
                        {
                            title: "An error occurred.",
                            description: "you already nominated this movie",
                            status: "error",
                            duration: 3000,
                            isClosable: true,
                        }
                    )
                    foundMatch = true;
                } 
            }
            if (!foundMatch) {
                nominationList.unshift(movie)
                localStorage.setItem("nominations", JSON.stringify(nominationList))
                setNomMovie(movie);
                if (nominationList.length <= 4) {
                    swal("Success !", "Movie nominated successfully", "success");
                } else {
                    swal("Awesome !", "nominations completed successfully", "success")
                }
                
            }
        } else {
            toast(
                {
                    title: "An error occurred.",
                    description: "maximum number of nominations reached",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                }
            )
        }
        
    }

    return (
        <div className="movie-list">
            {movies.map((movie,index) => {
                return (
                    <Box w="100%" maxW="300px" borderWidth="1px" borderRadius="lg" overflow="hidden" key={index} m="2" d="flex" bg="gray.200" mx="auto">
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
                        <Button size="sm" colorScheme="white" variant="outline" onClick={(e) => handleClick(e, movie)}  disabled={nominationList.map((item) => item.imdbID).includes(movie.imdbID) ? true : false}  >
                            {nominationList.map((item) => item.imdbID).includes(movie.imdbID) ? "Nominated" : "Nominate"}
                        </Button>
                    </Box>
                </Box>
                )   
                })
            }
        </div>
    )
}

export default DisplayMovies;

