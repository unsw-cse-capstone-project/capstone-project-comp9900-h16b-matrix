import React,{useState} from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button, Grid, IconButton, Typography,Link } from '@material-ui/core';
import { AiOutlineLike,AiOutlineDislike } from "react-icons/ai";
import * as  moment from 'moment'
import CommentArea from "./CommentArea"
import * as Empty from "../../../component/Empty"
import Logindialog from '../../Login & Sign up/Login';
import * as commentAPI from '../../../api/commentAPI'
export default function Comment(props) {
    const [value,setValue] = useState("")
    const [sended,setSend] = useState([])
    const {decoded,handleClickOpen,movieId} = props
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
        const sendComment = async()=>{
            const data={
                'uid':decoded.id,
                'movie_id':movieId,
                'n_likes':0,
                'content':value
            }
            const res = await commentAPI.sendComment(data)
            console.log(res)
        }
        if(decoded){
            if(value===""){
                return
            }
            else{
                console.log(value,sended)
                sendComment()
                let array = []
                for(let i=0;i<sended.length;i++){
                    array.push(sended[i])
                    console.log(array)
                }
                array.push({"comment":value,"n_like":0,'like':false,'release_date':moment().format("DD-MM-YY, hh:mm:ss")})
                setSend(array)
                setValue("")
                console.log(array)
            }
        }
        else{
            handleClickOpen()
        }
        
    }
    const handleLike=async(index)=>{
        let array = []
        for(let i = 0;i<sended.length;i++){
            if(i==index){
                let item = sended[i]
                if(item.like){
                    item.like=false
                    item.n_like -=1
                    
                }
                else{
                    item.like=true
                    item.n_like +=1
                }
                console.log(item)
                // const res = await commentAPI.updateNlike({'id':decoded.id,'n_like':item.n_like})
                array.push(item)
            }
            else{
                array.push(sended[i])
            }
        }
        setSend(array)

    }
  return (
      <div>
    <TextareaAutosize
        rows={3}
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
    <CommentArea sended={sended} handleRemove={handleRemove} decoded={decoded} handleLike={handleLike}/>
</div>
  );
}