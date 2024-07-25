import { useCallback, useState } from "react";

interface MultiSelectPopProps {
    required?: boolean
    type: string
    names?: string[]
    // num: number | null
    active?: number | null
    onClick: (id: number | null, type: string) => void
}

export function MultiSelectPopup({ required = true, onClick, type, names, active }: MultiSelectPopProps) {
    const [open, setOpen] = useState(false)
    const _onClick = useCallback((id: number | null) => {
        setOpen(false)
        onClick(id, type)
    }, [onClick, type])
    return (<>
        <button className={"selector_small color " + (open ? "" : "hover ") + (active !== undefined ? "checked" : "")} onClick={() => { setOpen(!open) }}>{active === null ? `no ${type}` : type === "Ladegerät/Service Dongle" ? "Ladegeräte \nService Dongle" : `${type} ${active === undefined ? "" : names?.[active] ?? ""}`}</button>
        <div className={"comp_selector " + (open ? "" : "hidden")} id="comp_selector">
            {!required && <CustomButton type={type} name={""} onClick={_onClick} id={null} active={active} />}
            {names?.map((name, i) => (
                <CustomButton type={type} name={name} onClick={_onClick} id={i} key={i} active={active} />
            ))}
        </div>
    </>)
}

// Button
interface ButtonProps {
    type: string;
    id: number | null;
    name: string
    onClick: (id: number | null) => void;
    active: number | undefined | null;
}
const CustomButton: React.FC<ButtonProps> = ({
    id,
    name,
    onClick,
    active,
    type = 'Motor',
}) => {
    const click = useCallback(() => {
        onClick(id);
    }, [id, onClick]);
    console.log(name, id)
    return (
        <button
            onClick={click}
            className={"selector_small manu hover " + (id === active ? "checked" : "")}
        >{id === null ? `no ${type}` : `${name}`}</button>
    );
}
