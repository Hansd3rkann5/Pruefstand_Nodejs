import { useCallback, useState } from "react";
import { useMyWebsocket } from "../hooks/websocket";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export function Results() {

    return <>
        <div className="window manuell" id="done">
            DONE
        </div>
    </>
}