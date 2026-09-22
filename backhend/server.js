const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend radi!");
});

app.get("/api/zadaci", async (req, res) => {
    const { data, error } = await supabase
        .from("zadaci")
        .select("*");

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
});

app.post("/api/zadaci", async (req, res) => {
    const { naziv, opis, jezik, kod } = req.body;
    console.log("STIGAO KOD:", kod);

    if (!naziv || !opis) {
        return res.status(400).json({
            error: "Naziv i opis su obavezni."
        });
    }

    const { data, error } = await supabase
        .from("zadaci")
        .insert([
            {
                
                naziv: naziv,
                opis: opis,
                jezik: jezik,
                kod: kod
            
            }
        ])
        .select();

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.status(201).json(data[0]);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend radi na portu ${PORT}`);
});