import {useState} from 'react'
import {Input} from '@chakra-ui/react'
import ipfs from '../ipfs'

const InputComp = () => {
    let reader;

    const [buffer,setBuffer] = useState(null);
    
    
    const captureFile = (event) => {
        event.preventDefault()
        const file = event.target.files[0];
        reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            setBuffer(Buffer(reader.result));
        }
        
        
    }

    const onSubmit = (event) => {
        event.preventDefault();
        ipfs.add(data,()=>{
            //Do stuff here
        })
    }
    
    return (
        <div>
            <form onSubmit={onSubmit}>
            <Input type='file' onChange={captureFile}/>
            <Input type='submit'/>
            </form>
        </div>
    )
}



export default InputComp
