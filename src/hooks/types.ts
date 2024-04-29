

type PruefstandKomponente = { name: string, relay: number }

export type Comp_Konfig = ConfigBase<PruefstandKomponente[]>
export type SingleConfig = ConfigBase<PruefstandKomponente>


type ConfigBase<A> = {
    Motor: A
    Display: A
    Battery: A
    Charger: A
    "Range EXT": A
    "Service Dongle": A
}

export interface DeviceContextType{
    testnum:number
    setTestnum:(v:number)=>void
    testcombinations:Partial<SingleConfig>[]
    setTestcombinations:(v:Partial<SingleConfig>[])=>void
    checkifconfig:boolean
    setCheckifconfig:(v:boolean)=>void
    konfig?:Comp_Konfig
    setKonfig:(v?:Comp_Konfig)=>void
    checkdone:boolean
    setCheckdone:(v:boolean)=>void
    checkifauto:boolean
    setCheckifauto:(v:boolean)=>void
    odds:string[]
    setOdds:(v:string[])=>void
}
