export default function TermekKartya({ termek }) {
    return (
        <div>
            <h3>{termek.nev}</h3>
            <p>Ár: {termek.ar} Ft</p>
            <p>Készlet: {termek.keszlet}</p>
        </div>
    );
}