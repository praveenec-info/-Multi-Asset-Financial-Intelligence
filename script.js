/* =========================
   SPLASH SCREEN
========================= */

window.addEventListener("load", function () {

    setTimeout(function () {

        const splash = document.getElementById("splashScreen");

        splash.style.opacity = "0";

        setTimeout(function () {
            splash.style.display = "none";
        }, 800);

    }, 2500);

});


/* =========================
   SCROLL TO ASSETS
========================= */

function scrollToAssets() {

    document.getElementById("assets").scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================
   PERIOD BUTTONS
========================= */

function changePeriod(button) {

    const buttons =
        document.querySelectorAll(".period-buttons button");

    buttons.forEach(function (btn) {
        btn.classList.remove("active");
    });

    button.classList.add("active");

}


/* =========================
   BACKTEST
========================= */

function runBacktest() {

    const strategy =
        document.getElementById("strategy").value;

    const asset =
        document.getElementById("asset").value;

    const results =
        document.getElementById("backtestResults");

    results.style.opacity = "0.5";

    setTimeout(function () {

        document.getElementById("btReturn").textContent =
            "+28.40%";

        document.getElementById("btSharpe").textContent =
            "1.38";

        document.getElementById("btVolatility").textContent =
            "32.10%";

        document.getElementById("btDrawdown").textContent =
            "-14.20%";

        results.style.opacity = "1";

        alert(
            "Backtest completed for " +
            strategy +
            " on " +
            asset +
            "."
        );

    }, 700);

}


/* =========================
   STRATEGY VALIDATION
========================= */

function validateStrategy() {

    const asset =
        document.getElementById("validationAsset").value;

    const strategy =
        document.getElementById("validationStrategy").value;

    const results =
        document.getElementById("validationResults");

    const title =
        document.getElementById("resultTitle");

    const pastStart =
        document.getElementById("pastStart").value;

    const pastEnd =
        document.getElementById("pastEnd").value;

    const recentStart =
        document.getElementById("recentStart").value;

    const recentEnd =
        document.getElementById("recentEnd").value;


    /*
        DEMO DATA

        These values are only for frontend demonstration.
        They are NOT real market data.
    */

    const demoData = {

        "SMA Crossover": {
            pastReturn: "+32.40%",
            recentReturn: "+14.80%",
            pastSharpe: "1.45",
            recentSharpe: "0.82"
        },

        "EMA Trend": {
            pastReturn: "+29.70%",
            recentReturn: "+18.20%",
            pastSharpe: "1.31",
            recentSharpe: "0.94"
        },

        "Momentum": {
            pastReturn: "+38.60%",
            recentReturn: "+11.50%",
            pastSharpe: "1.58",
            recentSharpe: "0.67"
        },

        "Mean Reversion": {
            pastReturn: "+21.30%",
            recentReturn: "+16.40%",
            pastSharpe: "1.12",
            recentSharpe: "0.96"
        }

    };


    const data =
        demoData[strategy];


    /*
        Check that validation period
        comes after the historical period.
    */

    if (
        Number(pastEnd) >= Number(recentStart)
    ) {

        alert(
            "Please select a validation period after the past period."
        );

        return;
    }


    /*
        Update result title
    */

    title.textContent =
        strategy + " — " + asset;


    /*
        Update values
    */

    document.getElementById("pastReturn")
        .textContent = data.pastReturn;

    document.getElementById("recentReturn")
        .textContent = data.recentReturn;

    document.getElementById("pastSharpe")
        .textContent = data.pastSharpe;

    document.getElementById("recentSharpe")
        .textContent = data.recentSharpe;


    /*
        Calculate return difference
    */

    const past =
        parseFloat(
            data.pastReturn.replace("%", "")
        );

    const recent =
        parseFloat(
            data.recentReturn.replace("%", "")
        );

    const difference =
        recent - past;


    document.getElementById("returnChange")
        .textContent =
        (difference >= 0 ? "+" : "") +
        difference.toFixed(2) +
        "%";


    /*
        Show validation results
    */

    results.classList.add("show");


    /*
        Scroll to result
    */

    setTimeout(function () {

        results.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);


    /*
        Update validation message
    */

    const message =
        document.getElementById("validationMessage");

    if (recent >= past) {

        message.innerHTML = `
            <span>●</span>
            <p>
                The strategy produced results that were
                relatively consistent or stronger during the
                selected validation period.
            </p>
        `;

    } else {

        message.innerHTML = `
            <span>●</span>
            <p>
                The strategy produced lower returns during the
                selected validation period compared with the
                historical period. This indicates a change in
                performance between the two periods.
            </p>
        `;

    }

}


/* =========================
   NAVBAR ACTIVE SECTION
========================= */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll("nav a");


window.addEventListener("scroll", function () {

    let current = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.style.color = "#8992a1";

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.style.color = "white";

        }

    });

});
/* =========================
   CORRELATION MATRIX
========================= */

const corrAssets = ["Gold", "Bitcoin", "NVIDIA", "Apple"];

const corrData = [
    [1.00, 0.18, 0.24, 0.21],
    [0.18, 1.00, 0.42, 0.38],
    [0.24, 0.42, 1.00, 0.68],
    [0.21, 0.38, 0.68, 1.00]
];

function getRelationship(r) {

    const strength = Math.abs(r);
    const direction = r < 0 ? " (inverse)" : "";

    if (strength >= 0.995) return { level: "Perfect",  cls: "perfect",  dir: direction };
    if (strength >= 0.60)  return { level: "Strong",   cls: "strong",   dir: direction };
    if (strength >= 0.30)  return { level: "Moderate", cls: "moderate", dir: direction };

    return { level: "Weak", cls: "weak", dir: direction };
}

function renderCorrelationTable() {

    const table = document.getElementById("corrTable");

    let html = "<thead><tr><th></th>";

    corrAssets.forEach(function (name) {
        html += "<th>" + name + "</th>";
    });

    html += "</tr></thead><tbody>";

    corrData.forEach(function (row, i) {

        html += "<tr><th>" + corrAssets[i] + "</th>";

        row.forEach(function (value) {

            const rel = getRelationship(value);

            html +=
                '<td class="corr corr-' + rel.cls + '">' +
                    '<span class="corr-value">' + value.toFixed(2) + '</span>' +
                    '<span class="corr-label">' + rel.level + rel.dir + '</span>' +
                '</td>';
        });

        html += "</tr>";
    });

    html += "</tbody>";

    table.innerHTML = html;
}

renderCorrelationTable();
