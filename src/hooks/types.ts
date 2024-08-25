

type PruefstandKomponente = { name: string | null, serial: string | null, relay: number }
export type Metadata = { filename: string, created_at: number, emcy: boolean }

export type Comp_Konfig = ConfigBase<PruefstandKomponente[]>
export type SingleConfig = ConfigBase<PruefstandKomponente>
export type Combination = ConfigBase<number | null>
export type TestResults = Result<Metadata>


type ConfigBase<A> = {
    Motor: A
    Display: A
    Battery: A
    Smartbox: A
    "Range EXT": A
    "Ladegerät/Service Dongle": A
}

type Result<A> = Record<string, A>


export interface DeviceContextType {
    testnum: number
    setTestnum: (v: number) => void
    konfigquantity: number
    setKonfigQuantity: (v: number) => void
    testcombinations: Partial<SingleConfig>[]
    setTestcombinations: (v: Partial<SingleConfig>[]) => void
    first: boolean
    setFirst: (v: boolean) => void
    popup: boolean
    setPopup: (v: boolean) => void
    running: boolean
    setRunning: (v: boolean) => void
    checkifconfig: boolean
    setCheckifconfig: (v: boolean) => void
    master?: Comp_Konfig
    setMaster: (v?: Comp_Konfig) => void
    checkdone: boolean
    setCheckdone: (v: boolean) => void
    checkifauto: boolean
    setCheckifauto: (v: boolean) => void
    odds: string[]
    setOdds: (v: string[]) => void
    results: TestResults | undefined
    setResults: (v: TestResults) => void
}
