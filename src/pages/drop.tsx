import { useNavigate } from "react-router"
import { useMyWebsocket } from "../hooks/websocket";
import React, { ReactHTML, useState } from "react";

export function Drop() {
    
    const navigate = useNavigate();
    const { sendMessage } = useMyWebsocket();

    const onUpload:React.ChangeEventHandler<HTMLInputElement> = (data) => {  
        if ( data.target.files ) {
            console.log(data.target.files[0].text().then((text) => { 
                sendMessage(JSON.stringify({ "type": "Konfig-File", text }))}))
            
        }
    }

    return <>
        <div className="window" id="window">
            <div id="wrapper">
                <form action="" method="get" id="fileDropBox">
                    <label htmlFor="input-file">
                        <img id="upload" src="/static/upload.png" alt="" />
                        <div id="file-upload">Drop or upload file here.</div>   
                        <input onChange={ onUpload } type="file" id="input-file"/>
                </label>
            </form>
        </div>
    </div >
    </>
}