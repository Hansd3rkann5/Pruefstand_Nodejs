import { useCallback, useState } from "react";
import Picker from "react-mobile-picker";
import { useMyWebsocket } from "../hooks/websocket";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



export function Running() {

    const { progress, testnum, testcombinations, checkdone, checkifconfig, checkifauto, sendMessage } = useMyWebsocket();
    const selections = { test: testnum }
    let r = false
    
    function MyPicker() {
        const [pickerValue, setPickerValue] = useState({
            test: testnum
        })
    }

    function next_test() {
        sendMessage(JSON.stringify({ type: "next", id: null }))
        r = true
    }


    return <>
        <div className="window manuell" id="window">
            <div className={(checkifconfig ? "" : "hidden")} id="test_num" >
                {/* <Picker value={{'Test' pickerValue}}>
                    {Object.keys(selections).map(name => (
                        <Picker.Column key={name} name={name}>
                            {selections[name].map(option => (
                                <Picker.Item key={option} value={option}>
                                    {option}
                                </Picker.Item>
                            ))}
                        </Picker.Column>
                    ))}
                </Picker> */}
                <h2 id="test" >Test {testnum} von {testcombinations.length}</h2>
            </div>
            <div className="wrapper">
                <CircularProgressbar value={progress} text={`${progress}%`} styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                    //rotation: 0.25,

                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    //strokeLinecap: 'butt',

                    // Text size
                    textSize: '22px',

                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.2,

                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',

                    // Colors
                    pathColor: `#00a6e5`,
                    textColor: '#e0e0e0',
                    trailColor: '#e0e0e0',
                    backgroundColor: '#3e98ff',
                })} />
            </div>
            <div className={"start_wrapper " + (checkifauto ? "hidden" : " ")}>
                <button className={"start " + (checkdone ? "not_allow " : "allow ")} onClick={checkdone ? undefined : next_test} id="start">{r ? "weiter" : "Test starten"}</button>
            </div>
        </div>
    </>
}