import { useState, useEffect } from "react";
import { Input, Text, Image, Center } from "@chakra-ui/react";
import ipfs from "../ipfs";
import getWeb3 from "../web3";
import contractAbi from "../abis/abis.json"
const InputComp = () => {
  let reader;
  
  const [buffer, setBuffer] = useState(null);

  const [account, setAccount] = useState(null);

  const [previewImg,setPreviewImg] = useState("QmVheGWgmEbmANUbaQ6xKRajsfGD9WfmzvFpaid4QqEVT8");

  useEffect(() => {
    blockchainInfo();
  }, []);

  
  const blockchainInfo = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId()
    if(networkId == '80001'){
      console.log(networkId)
      console.log(contractAbi)
      const abi = []
      const address = ''
      //const myContract = new web3.eth.Contract(abi,address)
    }
    else{
      window.alert('Please switch to matic network')
    }
    
  };

  const captureFile = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
    };
  };
  //cid : QmVheGWgmEbmANUbaQ6xKRajsfGD9WfmzvFpaid4QqEVT8
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log('submitting form')
    console.log(buffer);
    const {cid} = await ipfs.add(buffer)
    const imageHash = cid;
    setPreviewImg(imageHash.string);
    };
  

  return (
    <div>
      <Text p={5} fontSize='xl'>Hi {account}</Text>
      <Center>
      <Image
      p={10}
      boxSize="400px"
      objectFit="cover"
       src={`https://ipfs.infura.io/ipfs/${previewImg}`}/>
      <form onSubmit={onSubmit}>
        <Input type="file" onChange={captureFile} />
        <Input type="submit" />
      </form>
      </Center>
    </div>
  );
};

export default InputComp;
