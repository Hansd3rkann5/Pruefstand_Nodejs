import { useRef, createRef, useState, useEffect } from 'react';
import { SingleConfig } from "../hooks/types";
import { useMyWebsocket } from '../hooks/websocket';
import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';


function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <LinearProgress color="secondary" sx={{ width: "100%", height: "20px", 'borderRadius': "7px 7px 0px 7px" }} variant="determinate" {...props} />
    )
}

export const ConfigCards: React.FC<{ configs: Partial<SingleConfig>[] }> = ({ configs }) => {

    return (<div className="window konfig">
        {configs.map((c, i) => <ConfigCard key={i} config={c} name={String(i + 1)} />)}
    </div>)
}

export const ConfigCard: React.FC<{ config: Partial<SingleConfig>, name: string }> = ({ config, name }) => {

    const { testnum, progress, checkifmanu, checkifauto, testcombinations, odds, sendMessage } = useMyWebsocket()
    const mycardRef = useRef<HTMLDivElement>(null)
    const mybuttonRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        console.log(odds)
    }, [odds])

    useEffect(() => {
        if (String(testnum) == name) {
            if (checkifauto) {
                mycardRef.current?.scrollIntoView({ "behavior": "smooth", block: "start" })
            }
            else {
                mybuttonRef.current?.scrollIntoView({ "behavior": "smooth", block: "start" })
            }
        }
    }, [testnum])

    function next_test() {
        sendMessage(JSON.stringify({ type: "next", id: null }))
        console.log("next")
    }

    return <>
        <div ref={mycardRef} className={"konfigframe" + (String(testnum) == name && checkifmanu == false ? " focus" : " nofocus") + (checkifmanu ? " single" : "")}>
            <div className={"konfig component"}>Konfig {checkifmanu ? "" : name}</div>
            <div className="compframe">
                <div className="component">
                    <div className="component name">Motor:</div>
                    <div className="component choice">{config.Motor?.name ?? "-"}</div>
                </div>
                <hr />
                <div className="component">
                    <div className="component name">Display:</div>
                    <div className="component choice">{config.Display?.name ?? "-"}</div>
                </div>
                <hr />
                <div className="component">
                    <div className="component name">Battery:</div>
                    <div className="component choice">{config.Battery?.name ?? "-"}</div>
                </div>
                <hr />
                <div className="component">
                    <div className="component name">Charger:</div>
                    <div className="component choice">{config.Charger?.name ?? "-"}</div>
                </div>
                <hr />
                <div className="component">
                    <div className="component name">Range Ext:</div>
                    <div className="component choice">{config["Range EXT"]?.name ?? "-"}</div>
                </div>
                <hr />
                <div className="component">
                    <div className="component name">Service Dongle:</div>
                    <div className="component choice">{config["Service Dongle"]?.name ?? "-"}</div>
                </div>
            </div>
            <div style={{ width: "100%" }} className={(String(testnum) == name ? "" : "hidden")}>
                <LinearProgressWithLabel value={String(testnum) != name ? 0 : progress} />
            </div>
        </div>
        <div ref={mybuttonRef} className={(testcombinations.length == testnum ? "hidden" : String(testnum) == name && checkifauto == false ? "next" : "hidden")}>
            <button onClick={(progress != 100 ? undefined : next_test)} className={"button manuell" + (progress != 100 ? " not_allow" : " allow")}>{(">")} </button>
        </div>
    </>
}