import React,{ useState, useEffect } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

export default function BraftEditorDemo(props){

    const {id,content,handleContent}=props;
  
    const [value,setValue]=useState({
        content:""
    })
    console.log(content,value)
    useEffect(()=>{
        setValue({...value,content:content})
        console.log(content,value)
    },[content])
    const [state1,setEditorState]=useState({ editorState: BraftEditor.createEditorState(null)});
    //  const { id } = props.match.params;
    
    const  getContent =async()=> {
        //假设此处从服务端获取html格式的编辑器内容
        //const htmlContent = await fetchEditorContent()
        console.log("content",value.content)
        const htmlContent = value.content
        // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
        setEditorState({
            editorState: BraftEditor.createEditorState(htmlContent)
        })
    };

    useEffect(()=>{
        getContent();
    }, [value.content])
    // const updateContent= async content=>{
    //     console.log("showcontent",content)
    //    const updateContentReponse = await eventAPI.updateContentById(id, content);
    //    console.log("updateContentReponse",updateContentReponse)
    //   //  props.history.goBack();
    // }
   const  submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        console.log("editorState",state1.editorState)
       
         const htmlContent = state1.editorState.toHTML()
         if(handleContent){
           handleContent(htmlContent)
         }
        
          
		console.log('htmlContent=',htmlContent);
        // const result = await saveEditorContent(htmlContent)
    }

    
    const handleEditorChange = (editorState1) => {
		console.log(editorState1);
        setEditorState({ editorState :editorState1})
    }
    // const myUploadFn = async (param) => {

	// 	const serverURL = 'http://upload-server'
	// 	const xhr = new XMLHttpRequest
	// 	const fd = new FormData()
	// 	console.log( "xhr=",xhr);
	// 	console.log( "fd=",param.file);
	// 	const imageBase64 = await UploadAPI.encodeImageFileAsURL(
	// 		param.file
	// 	  );
	// 	  const image_url = await UploadAPI.upload({
	// 		folder: 'desk_image',
	// 		data: imageBase64
	// 	  });
		
	// 	const successFn = (image_url) => {
	// 	  // 假设服务端直接返回文件上传后的地址
	// 	  // 上传成功后调用param.success并传入上传后的文件地址
	// 	  console.log( "image_url=",image_url);
	// 	  param.success({
	// 		url: image_url.Location,
	// 		meta: {
	// 		  id: 'xxx',
	// 		  title: 'xxx',
	// 		  alt: 'xxx',
	// 		  loop: true, // 指定音视频是否循环播放
	// 		  autoPlay: true, // 指定音视频是否自动播放
	// 		  controls: true, // 指定音视频是否显示控制栏
	// 		//   poster: 'http://xxx/xx.png', // 指定视频播放器的封面
	// 		}
	// 	  })
	// 	}
	// 	successFn(image_url);
	  
    //   }
      return (
        <div className="my-component">
            <BraftEditor
                value={state1.editorState}
                onChange={handleEditorChange}
                onBlur={submitContent}
                language='en'
                // onSave={submitContent}
                // media={{uploadFn: myUploadFn}}
            />
        </div>
    )
      

}
