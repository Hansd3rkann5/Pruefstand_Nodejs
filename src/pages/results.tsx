import 'react-circular-progressbar/dist/styles.css';
import { ShowResults } from "../components/ShowResult";
import { useMyWebsocket } from '../hooks/websocket';


export function Results() {

    const { results } = useMyWebsocket();

    return <>
        {<div className='window download'>
            {window.location.hostname === 'localhost' ? <div className='res_local'>
                <div>
                </div>Alle Konfigurationen getestet.<br /> <br />Testergebnisse stehen zur Einsicht<br />am Computer zur Verfügung</div> :
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
            }</div>}
    </>
}