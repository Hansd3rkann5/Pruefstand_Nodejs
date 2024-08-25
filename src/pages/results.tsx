import 'react-circular-progressbar/dist/styles.css';
import { ShowResults } from "../components/ShowResult";
import { useMyWebsocket } from '../hooks/websocket';


export function Results() {

    const { results } = useMyWebsocket();

    return <>
        {window.location.hostname === 'localhost' ? <div id='done'>DONE</div> :
            <div className='window download'>
                {/* <div className="file_selector"> */}
                {/* <div className="browserheader">
                    <div className='text'>Testergebnisse</div>
                    <hr className='sep' style={{ position: 'relative', width: '90%' }} />
                    </div> */}
                <div className='browser'>
                    <table className="table-fixed">
                        <thead className='browserheader'>
                            <tr>
                                <th style={{ width: "100%" }}>Testergebnisse</th>
                            </tr>
                            <hr className='sep' style={{ position: 'relative', width: '99%' }} />
                            <tr className=''>
                                <th>Datum</th>
                                <th>Uhrzeit</th>
                                <th></th>
                            </tr>
                        </thead>
                        <div className='shadow'></div>
                        <tbody>
                            {Object.values(results ?? {}).map((g, i) => (
                                <ShowResults result={g} key={i} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>}
    </>
}