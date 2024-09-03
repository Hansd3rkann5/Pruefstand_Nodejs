# Quellcode des Clients

In diesem Repository ist der gesamte Quellcode des Clients hinterlegt. Alle programmierten Dateien sind im Ordner "src" abgespeichert.

## [components](https://github.com/Hansd3rkann5/Pruefstand_Nodejs/tree/main/src/componentes)
_Components_ im _React_ Kontext sind, eigenständige Bausteine in einer React-Anwendung, die UI-Elemente definieren und verwalten, wie sie gerendert und mit Daten und Benutzerinteraktionen umgehen. 

### ConfigCard
Anzeige einer Konfiguration nach Start eines Tests
### MultiSelectPopUp
Anzeige der Variantenauswahl einer Komponentenkategorie
### Popup
Kein wiederholendes Element. Zeigt die Oberfläche für "download master"/"upload master" auf der Startseite der Anwendung an
### ShowResult
Repräsentiert eine Zeile der Ergebnisdarstellung. Dabei werden Datum und Uhrzeit eines Testergebnisses angezeigt

## [hooks](https://github.com/Hansd3rkann5/Pruefstand_Nodejs/tree/main/src/hooks)
_Hooks_ sind ein _React_ spezifisches Feature. Diese ermöglichen es, State und andere React-Features in funktionalen Komponenten zu nutzen, ohne dass Klassenkomponenten erforderlich sind.
### types und context
Über die Dateien "deviceContext.ts", "deviceContextProvider.ts", "types.ts" und "useDeviceContext.ts" sind die Variablentypisierungen und weitere Typisierungen abgelegt. Dieses Konstrukt beruht auf der Verwendung von _React_

### websocket
Hierin findet die Kommunikation mit dem Server statt. Nachrichten werden empfangen und gesendet.

## [pages](https://github.com/Hansd3rkann5/Pruefstand_Nodejs/tree/main/src/pages)
In diesem Ordner sind alle Seiten abgespeichert, welche die einzelnen Oberfläche der Webanwendung repräsentieren.
