class Search {
    constructor(searchInput, searchOutput, data) {
        this.searchLine = searchInput;
        this.outputList = searchOutput;
        this.data = data;

        this.focusSearch();
        this.inputSearch();
        this.keySearch();
        this.blueSearch();
    }

    clearLine() {
        this.searchLine.value = '';
    }

    blueSearch() {
        this.searchLine.addEventListener("blur", () => {
            setTimeout(() => {
                this.outputList.classList.add("header__bar-options-display")
            }, 500)
        })
    }

    focusSearch() {
        this.searchLine.addEventListener("focus", () => {
            this.outputList.classList.remove("header__bar-options-display");
        })
    }

    inputSearch() {
        this.searchLine.addEventListener("input", () => {
            if (this.searchLine.value !== "") {
                this.searchLine.classList.remove("header__bar-error");
                curentCity.searchCity(this.searchLine.value, this.outputList)
            } else {
                this.searchLine.classList.add("header__bar-error");
            }

        })
    }

    keySearch() {
        document.body.addEventListener("keyup", (e) => {
            if (e.code !== "Enter") return;
            if (this.searchLine.value !== "") {
                this.searchLine.classList.remove("header__bar-error");
                this.data.setCurrentCity(this.searchLine.value);
                this.data.loadDate();
                loadDateAll();
                this.searchLine.value = "";
                this.searchLine.blur();
                this.outputList.innerHTML = "";
            } else {
                this.searchLine.classList.add("header__bar-error");
                this.blueSearch();
            }
        })
    }
}