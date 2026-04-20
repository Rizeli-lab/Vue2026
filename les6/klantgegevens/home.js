const home = {
  template: `<section id="ingave">
            <h1>Klant gegevens</h1>
            <span>Voornaam</span>
            <input type="text" v-model="vnaam" />
            <span>Achternaam</span>
            <input type="text" v-model="anaam" />
            <span>Geboortedatum</span>
            <input type="text" v-model="geboortedatum" />
            <button v-on:click="voegDataToe" v-bind:style="buttonStyle">Voeg toe</button>
        </section>`,
  data() {
    return {
      vnaam: "",
      anaam: "",
      geboortedatum: "",
      klantGegevens: [],
      buttonStyle: {
        backgroundColor: "#2196F3",
        cursor: "pointer",
        padding: "8px 16px",
        verticalAlign: "top",
      },
    };
  },
  methods: {
    voegDataToe: function () {
      console.log(this.vnaam, this.anaam, this.geboortedatum);
      if (this.vnaam != "" && this.anaam != "" && this.geboortedatum != "") {
        this.klantGegevens.push({
          vnaam: this.vnaam,
          anaam: this.anaam,
          geboortedatum: this.geboortedatum,
        });
        this.maakInputsLeeg();
        this.saveLocalStorage();
      } else {
        alert("Geef alle waardes in aub.");
      }
    },
    maakInputsLeeg: function () {
      this.vnaam = "";
      this.anaam = "";
      this.geboortedatum = "";
    },
    saveLocalStorage: function () {
      localStorage.setItem("klantGegevens", JSON.stringify(this.klantGegevens));
      alert("saved");
    },
  },
  mounted() {
    if (localStorage.getItem("klantGegevens")) {
      this.klantGegevens = JSON.parse(localStorage.getItem("klantGegevens"));
    }
  },
};
