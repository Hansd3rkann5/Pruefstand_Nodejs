import YAML from 'yaml'
import { useState } from "react";
import React from 'react'
import { useMyWebsocket } from "../hooks/websocket";


interface PopupProps {
    trigger?: boolean
    children?: React.ReactNode
    setTrigger: (v: boolean) => void
}

export function Popup(props: PopupProps) {

    const { konfig, sendMessage } = useMyWebsocket();


    function download_master() {
        console.log("click")
        let text = YAML.stringify(konfig)
        let filename = 'Master_Konfig.txt'
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
        props.setTrigger(false)
    }

    const onUpload: React.ChangeEventHandler<HTMLInputElement> = (data) => {
        if (data.target.files) {
            console.log(data.target.files[0].text().then((text) => {
                props.setTrigger(false)
                sendMessage(JSON.stringify({ type: "Master-File", text }))
            }))
        }
    }

    return <>
        <div className={'popup-backdrop' + (!props.trigger ? ' hide' : '')} onClick={() => props.setTrigger(false)} />
        <div className={'popup' + (!props.trigger ? ' hide' : '')}>
            <div className={'popup' + (props.trigger ? 'window download' : ' hide')}>
                {(props.trigger) && (<>
                    <div className='button' onClick={(download_master)}><span className='pop'>download master</span></div>
                    <hr id="sep" />
                    <label htmlFor="input-file">
                        <form action="" method='get'>
                            <div className='button'>
                                <span className='pop'>upload master</span>
                                <input onChange={(onUpload)} type="file" id="input-file" />
                            </div>
                        </form>
                    </label>
                    {props.children}</>)}
            </div>
        </div></>

}
