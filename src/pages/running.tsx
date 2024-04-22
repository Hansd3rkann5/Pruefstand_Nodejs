import { useCallback, useState } from "react";
import { useMyWebsocket } from "../hooks/websocket";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export function Running() {

    const { progress } = useMyWebsocket();
    

    return <>
        <div className="window manuell" onClick={() => { console.log("window") }} id="window">
            <div className="wrapper">
                <CircularProgressbar value={progress} text={`${progress}%`} styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                    //rotation: 0.25,

                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    //strokeLinecap: 'butt',

                    // Text size
                    textSize: '25px',

                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,

                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',

                    // Colors
                    pathColor: `#00a6e5`,
                    textColor: '#e0e0e0',
                    trailColor: '#e0e0e0',
                    backgroundColor: '#3e98ff',
                })} />;
            </div>
        </div>
    </>
}