import React, { useState , useEffect, Fragment} from 'react'

import axios from "axios"
import { server } from '../index'
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import Loader from "./Loader"


const Exchanges = () => {
    const [loading, setLoading] = useState(true)
    const [exchanges, setExchanges] = useState([])

    useEffect(()=>{

        const fetchData = async ()=>{

            try{
                const {data} = await axios.get(`${server}/exchanges`)
                setExchanges(data)
                setLoading(false)      
                
            }
            catch(error){
                setLoading(false)

            }
        }
        fetchData();
        
    }, []);

   return <Container maxW={"container.xl"}>
    {loading? <Loader/>:<>
    <HStack wrap={"wrap"}>

        {
            exchanges.map((i)=>(
              <ExchangeCard
              name ={i.name}
              img = {i.image}
              url = {i.url}
              rank ={i.trust_score_rank} 
              trust = {i.trust_score_rank }
              country = {i.country}
              key = {i.id}
              />
            ))
        }
       
    </HStack>
    </>}

   </Container>

}

const ExchangeCard = ({name, img, url, rank, id, trust, country}) =>{
    return(
        <>
    <a href ={url} target= {'blank'} >
        <VStack w = {"52"}  shadow={"lg"} p = {"8"} borderRadius={"lg"} transition={"all 0.5s"}
        m = {"4"} 
        css ={{
            "&:hover":{
                transform: "Scale(1.1)"
            }
        }}
        >
           <Image
           src = {img}
           w ={"12"}
           h ={"12"}
           objectFit={"contain"}
           alt = {"Exchange"}
           />
           <Heading size={"md"} noOfLines={"1"}>{rank}</Heading>
           <Text noOfLines = {"1"}>{name}</Text>
           <Text noOfLines={"2"} textAlign={"center"}>{`Country: ${country}`}</Text>
           <Text noOfLines = {"1"}>{`Trust Rank: ${trust}`}</Text>
        </VStack>
    </a>
    </>
    )
}

export default Exchanges
