const form = document.querySelector("form");
const listaZadataka = document.getElementById("lista-zadataka");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const naziv = document.getElementById("naziv").value.trim();
        const opis = document.getElementById("opis").value.trim();
        const jezik = document.getElementById("jezik").value;
        const kod = document.getElementById("kod").value;

        try {
            const response = await fetch("https://programiranje-sajt.onrender.com/api/zadaci", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    naziv: naziv,
                    opis: opis,
                    jezik: jezik,
                    kod: kod
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert("Greška: " + data.error);
                return;
            }

            alert("Zadatak je uspešno sačuvan!");
            form.reset();

        } catch (error) {
            alert("Greška pri povezivanju sa backendom.");
        }
    });
}

if (listaZadataka) {
    async function ucitajZadatke() {
        try {
            const response = await fetch("https://programiranje-sajt.onrender.com/api/zadaci");
            const zadaci = await response.json();

            if (zadaci.length === 0) {
                listaZadataka.innerHTML = "<p>Nema sačuvanih zadataka.</p>";
                return;
            }

            listaZadataka.innerHTML = "";

            zadaci.forEach((zadatak) => {
                const article = document.createElement("article");

                article.innerHTML = `
    <h3>${zadatak.naziv}</h3>
    <p>${zadatak.opis}</p>
    <p><strong>Jezik:</strong> ${zadatak.jezik}</p>

    <h4>Kod zadatka:</h4>
    <pre><code>${zadatak.kod || "Nema dodatog koda."}</code></pre>
`;

                listaZadataka.appendChild(article);
            });

        } catch (error) {
            listaZadataka.innerHTML = "<p>Greška pri učitavanju zadataka.</p>";
        }
    }

    ucitajZadatke();
}