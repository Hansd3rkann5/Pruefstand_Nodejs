import { SingleConfig } from "../hooks/types";


export const ConfigCards:React.FC<{configs:Partial<SingleConfig>[]}>  = ({configs})=>{

    return (<div className="window konfig">
        {configs.map((c,i)=><ConfigCard key={i} config={c} name={String(i+1)}/>)}
    </div>)
}

export const ConfigCard:React.FC<{config:Partial<SingleConfig>,name:string}> = ({config,name}) =>{
    return <div className="konfigframe">
                <div className="konfig component">Konfig {name}</div>
                <div className="compframe">
                    <div className="component">
                        <div className="component name">Motor:</div>
                        <div className="component choice">{config.Motor?.name??"-"}</div>
                    </div>
                    <hr />
                    <div className="component">
                        <div className="component name">Display:</div>
                        <div className="component choice">{config.Display?.name??"-"}</div>
                    </div>
                    <hr />
                    <div className="component">
                        <div className="component name">Battery:</div>
                        <div className="component choice">{config.Battery?.name??"-"}</div>
                    </div>
                    <hr />
                    <div className="component">
                        <div className="component name">Charger:</div>
                        <div className="component choice">{config.Charger?.name??"-"}</div>
                    </div>
                    <hr />
                    <div className="component">
                        <div className="component name">Range Ext:</div>
                        <div className="component choice">{config["Range EXT"]?.name??"-"}</div>
                    </div>
                    <hr />
                    <div className="component">
                        <div className="component name">Service Dongle:</div>
                        <div className="component choice">{config["Service Dongle"]?.name??"-"}</div>
                    </div>
                </div>
        </div>
}