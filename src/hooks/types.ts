

type PruefstandKomponente = { name: string | null, serial: string | null, relay: number }

export type Comp_Konfig = ConfigBase<PruefstandKomponente[]>
export type SingleConfig = ConfigBase<PruefstandKomponente>
export type Combination = ConfigBase<number | null>


type ConfigBase<A> = {
    Motor: A
    Display: A
    Battery: A
    Smartbox: A
    "Range EXT": A
    "Ladegerät/Service Dongle": A
}

export interface DeviceContextType {
    testnum: number
    setTestnum: (v: number) => void
    konfigquantity: number
    setKonfigQuantity: (v: number) => void
    testcombinations: Partial<SingleConfig>[]
    setTestcombinations: (v: Partial<SingleConfig>[]) => void
    checkifmanu: boolean
    setCheckifmanu: (v: boolean) => void
    running: boolean
    setRunning: (v: boolean) => void
    checkifconfig: boolean
    setCheckifconfig: (v: boolean) => void
    konfig?: Comp_Konfig
    setKonfig: (v?: Comp_Konfig) => void
    checkdone: boolean
    setCheckdone: (v: boolean) => void
    checkifauto: boolean
    setCheckifauto: (v: boolean) => void
    odds: string[]
    setOdds: (v: string[]) => void
}
