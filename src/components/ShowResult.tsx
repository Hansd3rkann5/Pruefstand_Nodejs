import { useCallback, useEffect, useState } from "react"
import { Metadata } from "../hooks/types"
import { useMyWebsocket } from "../hooks/websocket"
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from "@mui/material";

interface ResultProps {
    result: Metadata
}


export function ShowResults({ result }: ResultProps) {

    const { sendMessage } = useMyWebsocket()
    const [x, setX] = useState(false)

    const date = new Date(result.created_at * 1000)

    const send_filename = useCallback((filename: string, action: string) => {
        setTimeout(() => {
            sendMessage(JSON.stringify({ type: action, message: filename }))
        }, 500)

    }, [sendMessage])

    useEffect(() => {
        setX(false)
    }, [result])

    return (<>
        <tr className={(result.emcy ? "flag" : "noflag") + (x ? " inprog" : "")}>
            <td className="one">{date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
            <td className="one">{`${date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`}</td>
            <td>
                <IconButton onClick={() => { send_filename(result.filename, 'delete'); setX(true) }}>
                    <DeleteIcon style={{ transition: 'all 0.2s' }} fontSize="large" className="iconbutton" color="error" />
                </IconButton>
                <IconButton onClick={() => { send_filename(result.filename, 'download') }}>
                    <DownloadIcon style={{ transition: 'all 0.2s' }} fontSize="large" className="iconbutton" sx={{ color: '#00ff5a' }} />
                </IconButton>
            </td>
        </tr>
    </>)
}