import { useState, useEffect } from "react";
import { Input, Text } from "@chakra-ui/react";
import ipfs from "../ipfs";
import getWeb3 from "../web3";

const InputComp = () => {
  let reader;
  
  const [buffer, setBuffer] = useState(null);

  const [account, setAccount] = useState(null);

  useEffect(() => {
    blockchainInfo();
  }, []);

  
  const blockchainInfo = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
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
    console.log(cid);
    };
  

  return (
    <div>
      <Text fontSize='xl'>Hi {account}</Text>
      <form onSubmit={onSubmit}>
        <Input type="file" onChange={captureFile} />
        <Input type="submit" />
      </form>
    </div>
  );
};

export default InputComp;
