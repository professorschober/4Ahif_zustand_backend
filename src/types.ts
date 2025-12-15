// Typ, der dem Frontend entspricht.
// Achtung: Beim Senden über HTTP wird releaseDate als String serialisiert.
// Im Frontend kannst du dann new Date(releaseDate) verwenden.
export type Movie = {
    id: number;
    title: string;
    // A|B|C -> [A, B, C] passiert im Frontend; hier speichern wir bereits als Array.
    genre: string[];          // Liste einzelner Genres
    actors: string;
    duration: string;         // "02:20"
    releaseDate: Date;        // wird beim JSON-Export automatisch zu String
    isAvailable: boolean;
};
