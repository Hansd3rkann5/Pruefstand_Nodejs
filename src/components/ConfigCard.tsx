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

    const { konfigquantity, checkifmanu, checkifconfig } = useMyWebsocket()

    return (<div className="window konfig" style={{ justifyContent: (konfigquantity == 1 && !checkifconfig || checkifmanu ? 'center' : konfigquantity < 4 ? 'flex-start' : 'center') }}>
        {configs.map((c, i) => <ConfigCard key={i} config={c} name={String(i + 1)} />)}
    </div>)
}

export const ConfigCard: React.FC<{ config: Partial<SingleConfig>, name: string }> = ({ config, name }) => {

    const { testnum, progress, checkifmanu, checkifconfig, checkifauto, testcombinations, konfigquantity, odds, sendMessage } = useMyWebsocket()
    const mycardRef = useRef<HTMLDivElement>(null)
    const mybuttonRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        console.log(odds, konfigquantity)
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
    }

    return <>
        <div ref={mycardRef}
            className={"konfigframe" + (String(testnum) == name ? " focus" : " nofocus") + (konfigquantity == 1 && !checkifconfig ? " single" : "") + (konfigquantity < 4 ? " focus3" : "")}
            style={(name == '1' && String(testnum) == '1' && konfigquantity > 3 ? { marginLeft: '7vw' } : {}) || (name == '1' ? { marginLeft: '1vw' } : {}) || (konfigquantity < 4 ? { marginRight: '1vw' } : {})}>
            <div className={"konfig component"}>Konfig {konfigquantity == 1 && !checkifconfig ? "" : name}</div>
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
                    <div className="component name">Smartbox:</div>
                    <div className="component choice">{config.Smartbox?.serial ?? "-"}</div>
                </div>
                <hr />
                <div className="component">
                    <div className="component name">Range Ext:</div>
                    <div className="component choice">{config["Range EXT"]?.serial ?? "-"}</div>
                </div>
                <hr />
                <div className="component">
                    <div className="component name">{(config["Ladegerät/Service Dongle"])?.name ?? "Ladegerät / SD"}</div>
                    <div className="component choice">{(config["Ladegerät/Service Dongle"]?.name === "Ladegerät" ? config["Ladegerät/Service Dongle"]?.serial : "")}</div>
                </div>
            </div>
            <div style={{ width: "100%" }} className={(String(testnum) == name ? "" : "hidden")}>
                <LinearProgressWithLabel className={(name < String(testnum) ? "done" : "")} value={String(testnum) == name ? progress : testnum <= Number(name) ? 0 : 100} />
            </div>
        </div>
        <div ref={mybuttonRef} className={(testcombinations.length == testnum || checkifmanu ? "hidden hide" : String(testnum) == name && checkifauto == false ? "next" : "hidden hide")}>
            <button onClick={(progress != 100 ? undefined : next_test)} className={"button manuell" + (progress != 100 ? " not_allow" : " allow")}>{(">")} </button>
        </div>
    </>
}