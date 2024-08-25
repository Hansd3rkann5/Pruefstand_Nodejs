import { useRef, useEffect, useCallback } from 'react';
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

    const { konfigquantity, checkifconfig } = useMyWebsocket()

    return (<div className="window konfig" style={{ justifyContent: (konfigquantity == 1 && !checkifconfig ? 'center' : konfigquantity < 5 ? 'center' : '') }}>
        {configs.map((c, i) => <ConfigCard key={i} config={c} name={String(i + 1)} />)}
    </div>)
}

export const ConfigCard: React.FC<{ config: Partial<SingleConfig>, name: string }> = ({ config, name }) => {

    const { testnum, progress, checkifconfig, checkifauto, testcombinations, konfigquantity, sendMessage } = useMyWebsocket()
    const mycardRef = useRef<HTMLDivElement>(null)
    const mybuttonRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (String(testnum) == name) {
            if (checkifauto) {
                mycardRef.current?.scrollIntoView({ "behavior": "smooth", block: "start" })
            }
            else {
                mybuttonRef.current?.scrollIntoView({ "behavior": "smooth", block: "start" })
            }
        }
    }, [checkifauto, name, testnum])


    const next_test = useCallback(() => {
        sendMessage(JSON.stringify({ type: "next", id: null }))
    }, [sendMessage])

    return <>
        <div ref={mycardRef}
            className={"konfigframe" + (String(testnum) == name ? " focus" : " nofocus") + (konfigquantity == 1 && !checkifconfig ? " single" : "") + (konfigquantity < 5 ? " focus3" : "") + (window.location.hostname !== 'localhast' ? " pc" : "")}
            style={(name == '1' && String(testnum) == '1' && konfigquantity > 4 ? { marginLeft: '7vw' } : {}) ||
                (name == '1' ? { marginLeft: '1vw' } : {}) || (konfigquantity < 5 ? { marginRight: '1vw' } : {})}>
            <div className={"konfig component"}>Konfig. {konfigquantity == 1 && !checkifconfig ? "" : name}</div>
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
                    <div className="component choice">{config.Battery?.name + 'kWh'}</div>
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
                    <div className="component choice">{(config["Ladegerät/Service Dongle"]?.name === "Ladegerät" ? config["Ladegerät/Service Dongle"]?.serial : "-")}</div>
                </div>
            </div>
            <div style={{ width: "100%" }} /*className={(String(testnum) == name ? "" : "")}*/>
                <LinearProgressWithLabel className={(name < String(testnum) ? "done" : "")} value={String(testnum) == name ? progress : testnum <= Number(name) ? 0 : 100} />
            </div>
        </div>
        <div ref={mybuttonRef} className={(testcombinations.length == testnum || checkifauto || String(testnum) !== name ? "hidden hide" : konfigquantity < 5 ? "next4" : "next")}>
            <button onClick={(progress != 100 ? undefined : next_test)} className={"button manuell" + (progress != 100 ? " not_allow" : " allow")}>{(">")} </button>
        </div>
    </>
}