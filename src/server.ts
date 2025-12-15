import express from "express";
import cors from "cors";
import { movies } from "./data.js";
import type { Movie } from "./types.ts";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

/**
 * GET /genres
 * Liefert alle Genres
 */
app.get("/genres", (_req, res) => {
    const allGenres = movies.flatMap((m) => m.genre);
    const uniqueGenres = Array.from(new Set(allGenres)).sort((a, b) =>
        a.localeCompare(b)
    );
    res.json(uniqueGenres);
});

/**
 * GET /movies
 * Liefert alle Filme.
 * Hinweis: Date wird automatisch zu ISO-String serialisiert.
 */
app.get("/movies", (_req, res) => {
    res.json(movies);
});

/**
 * GET /movie?id=129
 * Liefert einen Film nach id, oder 404 wenn nicht gefunden.
 */
app.get("/movie", (req, res) => {
    const idParam = req.query.id;
    const id = typeof idParam === "string" ? Number(idParam) : NaN;
    if (!Number.isFinite(id)) {
        res.status(400).json({ error: "Invalid or missing 'id' query parameter" });
        return;
    }
    const movie: Movie | undefined = movies.find((m) => m.id === id);
    if (!movie) {
        res.status(404).json({ error: `Movie with id ${id} not found` });
        return;
    }
    res.json(movie);
});

app.listen(PORT, () => {
    console.log(`Movies backend running on http://localhost:${PORT}`);
});