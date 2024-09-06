import { useCallback, useState } from "react";

interface MultiSelectPopProps {
    required?: boolean
    type: string
    names?: (string | null)[]
    serials?: (string | null)[]
    relays?: (number | null)[]
    active?: number | null
    onClick: (id: number | null, type: string) => void
}

function nullish<T>(v?: T | null): v is undefined | null {
    return v === undefined || v === null
}

export function MultiSelectPopUp({ required = true, onClick: onClicking, type, names, serials, relays, active }: MultiSelectPopProps) {
    const [open, setOpen] = useState(false)
    const _onClick = useCallback((id: number | null) => {
        setOpen(false)
        onClicking(id, type)
    }, [onClicking, type])
    let text = ""
    if (nullish(active)) {
        if (active === null) {
            if (type === "Ladegerät/Service Dongle") {
                text = 'kein ' + 'Ladegerät oder\nService Dongle'
            } else {
                text = 'kein ' + type
            }
        }
        else if (type === "Ladegerät/Service Dongle") {
            text = "Ladegeräte\nService Dongle"
        } else { text = `${type}` }
    } else if (relays?.[active] !== null) {
        const name = names?.[active]
        const serial = serials?.[active]
        const _type = type === "Ladegerät/Service Dongle" ? name : type
        const _name = type === "Ladegerät/Service Dongle" ? serial : name
        text = `${_type} ${type === 'Battery' ? _name + 'kWh' : _name ?? serial ?? ""}`
    }
    return (<>
        <div className={'selector-backdrop' + (!open ? ' hide' : '')} onClick={() => setOpen(!open)} />
        <button
            className={"selector_small color " + (open ? "" : "hover ") + (active !== undefined ? "checked" : "")}
            id={(type === "Ladegerät/Service Dongle" ? "LadSeDo" : "")}
            onClick={() => { setOpen(!open) }}>
            {text}
            <div className={typeof active === 'number' && relays?.[active] === undefined ? "hide hidden" : "relay"}>{typeof active === 'number' ? `Relais: ${relays?.[active]}` : ""}</div>
        </button>
        <div className={"comp_selector " + (open ? "" : "hidden")} id="comp_selector">
            {!required && <CustomButton type={type} name={"kein"} serial={""} onClick={_onClick} id={null} active={active} relay={null} />}
            {names?.map((n, i) => (
                <CustomButton type={type} name={n ?? serials?.[i]} serial={!n ? '' : serials?.[i]} relay={relays?.[i]} onClick={_onClick} id={i} key={i} active={active} />
            ))}
        </div>
    </>)
}

// Button
interface ButtonProps {
    type: string;
    id: number | null
    relay: number | null | undefined
    name?: string | null
    serial?: string | null
    onClick: (id: number | null) => void;
    active: number | undefined | null;
}
const CustomButton: React.FC<ButtonProps> = ({
    type = 'Motor',
    id,
    name,
    relay,
    serial,
    onClick,
    active,
}) => {
    const click = useCallback(() => {
        onClick(id);
    }, [id, onClick]);
    if (!name && !serial) { return null }
    return (
        <button
            onClick={click}
            className={"selector_small manu hover " + (id === active ? "checked" : "")}
            id={(type === "Ladegerät/Service Dongle" ? "LadSeDo" : "")}>
            {id === null ? `kein ${type}` : type === 'Battery' ? `${name}kWh` : `${name}`}
            <div className={(serial ? "small_serial" : "hidden")}>
                {serial ?? serial}</div>
            <div className={relay ? "relay" : "hidden"}>{relay === null ? '' : `Relais: ${relay}`}</div>
        </button>
    );
}

