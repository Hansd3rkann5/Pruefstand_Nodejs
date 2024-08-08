import { useNavigate } from "react-router"
import { useMyWebsocket } from "../hooks/websocket";
import React, { ReactHTML, useState } from "react";

export function Drop() {

    const { sendMessage } = useMyWebsocket();

    const onUpload: React.ChangeEventHandler<HTMLInputElement> = (data) => {
        if (data.target.files) {
            console.log(data.target.files[0].text().then((text) => {
                sendMessage(JSON.stringify({ "type": "Konfig-File", text }))
            }))

        }
    }

    return <>
        <div className="window" id="window">
            <div id="wrapper">
                <label htmlFor="input-file" id="fileDropBox">
                    <form action="" method="get" style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "17vh" }}>
                        <img id="upload" src="/assets/upload.png" alt="" />
                        <div id="file-upload">Upload file here.</div>
                        <input onChange={onUpload} type="file" id="input-file" />
                    </form>
                </label>
            </div>
        </div >
    </>
}