import React,{useState} from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button, Grid, IconButton, Typography,Link } from '@material-ui/core';
import { AiOutlineLike,AiOutlineDislike } from "react-icons/ai";
import * as  moment from 'moment'
import CommentArea from "./CommentArea"
import * as Empty from "../../../component/Empty"
import Logindialog from '../../Login & Sign up/Login';
export default function Comment(props) {
    const [value,setValue] = useState("")
    const [sended,setSend] = useState([])
    const {decoded,handleClickOpen} = props
    const handleRemove=(index)=>{
        console.log(index)
        let array = []
            for(let i=0;i<sended.length;i++){
                array.push(sended[i])
            }
        array.splice(index,1)
        setSend(array)
        console.log("after",sended)

    }
    function handleSend(){
        if(decoded){
            if(value===""){
                return
            }
            else{
                console.log(value,sended)
                let array = []
                for(let i=0;i<sended.length;i++){
                    array.push(sended[i])
                    console.log(array)
                }
                array.push({"comment":value,"like":0,"dislike":0})
                setSend(array)
                setValue("")
                console.log(array)
            }
        }
        else{
            handleClickOpen()
        }
        
    }
  return (
      <div>
    <TextareaAutosize
      rowsMax={3}
      placeholder="Write your comment here"
      defaultValue=""
      value={value}
      style={{width:"90%"}}
      onChange = {e=>{if(decoded){setValue(e.target.value)}else{handleClickOpen()}}}
    />
    <Button onClick={()=>handleSend()}>
        send
    </Button>
    <CommentArea sended={sended} handleRemove={handleRemove} decoded={decoded}/>
</div>
  );
}