const overzicht = {
  template: `<section>
            <div class="row">
                <div class="cell">
                    <p><b>Voornaam</b></p>
                </div>
                <div class="cell">
                    <p><b>Achternaam</b></p>
                </div>
                <div class="cell">
                    <p><b>Geboortedatum</b></p>
                </div>
                <div class="cell">
                    <p><b>Acties</b></p>
                </div>
            </div>
            <transition-group name="delete" tag="div">
                <div v-for="(klant,index) in klantGegevens" v-bind:class="{bg1:index%2 ===0, bg2: !(index%2===0)}"
                    :key="index">
                    <transition name="rowTransiton" mode="out-in">
                        <div v-if="editKlant === index" class="row">
                            <div class="cell">
                                <input v-model="klant.vnaam">
                            </div>
                            <div class="cell">
                                <input v-model="klant.anaam">
                            </div>
                            <div class="cell">
                                <input v-model="klant.geboortedatum">
                            </div>
                            <div class="cell">
                                <button v-on:click="updateData(klant, index)" v-bind:style="buttonStyle">Bewaar</button>
                                <button v-on:click="cancelUpdateData(index)" v-bind:style="buttonStyle">Cancel</button>
                            </div>
                        </div>
                        <div>
                            <div class="row">
                                <div class="cell">
                                    <p>{{klant.vnaam}}</p>
                                </div>
                                <div class="cell">
                                    <p>{{klant.anaam}}</p>
                                </div>
                                <div class="cell">
                                    <p>{{klant.geboortedatum}}</p>
                                </div>
                                <div class="cell">
                                    <p><button v-on:click=" editData(index) " v-bind:style="buttonStyle">E</button>
                                        <button v-on:click="removeElement(index)" v-bind:style="buttonStyle">X</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </transition-group>
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
      editKlant: null,
      changesAreSaved: true,
      vorigeKlantGegevens: {},
    };
  },
  methods: {
    saveLocalStorage: function () {
      localStorage.setItem("klantGegevens", JSON.stringify(this.klantGegevens));
    },

    removeElement: function (index) {
      if (this.changesAreSaved == true) {
        this.klantGegevens.splice(index, 1);
        this.saveLocalStorage();
      }
    },
    updateData: function (klant, index) {
      if (klant.vnaam != "" && klant.anaam != "" && klant.geboortedatum != "") {
        this.klantGegevens[index] = {
          vnaam: klant.vnaam,
          anaam: klant.anaam,
          geboortedatum: klant.geboortedatum,
        };
        this.saveLocalStorage();
        this.editKlant = null;
        this.changesAreSaved = true;
      } else {
        alert("Geef alle waardes in aub.");
      }
    },
    checkIfSavedPageLeave: function (e) {
      if (!this.changesAreSaved) {
        e.returnValue = "test";
        return;
      }
    },
    editData: function (index) {
      if (this.changesAreSaved == false) {
        alert("Andere data wordt aangepast, bewaar of cancel dit eerst.");
      } else {
        this.vorigeKlantGegevens = Object.assign({}, this.klantGegevens[index]);
        this.editKlant = index;
        this.changesAreSaved = false;
      }
    },
    cancelUpdateData: function (index) {
      this.editKlant = null;
      Object.assign(this.klantGegevens[index], this.vorigeKlantGegevens);
      this.changesAreSaved = true;
    },
  },
  mounted() {
    if (localStorage.getItem("klantGegevens")) {
      this.klantGegevens = JSON.parse(localStorage.getItem("klantGegevens"));
    }
    window.addEventListener("beforeunload", this.checkIfSavedPageLeave);
  },
  beforeRouteLeave(to, from, next) {
    console.log("changearesaved" + this.changesAreSaved);
    if (this.changesAreSaved == false) {
      const answer = window.confirm(
        "Do you really want to leave? you have unsaved changes!",
      );
      if (answer) {
        this.changesAreSaved = true;
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
};
