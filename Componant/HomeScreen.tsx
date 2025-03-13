import { View,Text } from "react-native";
import { NativeBaseProvider, Box, Center, Heading } from "native-base";

const  HomeScreen=()=>{




    return(
        <NativeBaseProvider>
     <Center>
        <Heading>Hello world</Heading>
      </Center>
        </NativeBaseProvider>

     
    )
}

export default HomeScreen