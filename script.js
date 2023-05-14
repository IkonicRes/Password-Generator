passwordGenerator = {
    availLetters: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    availNumbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    availSymbols: ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", "|", ":", ";", "'", "<", ",", ">", ".", "?", "/", '\\'],
    targetPassLength: 8,
    availChars: [],
    passResult: "",
    bLower: false,
    bUpper: false,
    bNum: false,
    bSymbol: false,
    hasLower: false,
    hasUpper: false,
    hasNumber: false,
    hasSymbol: false,
    validPass: false,
    attempt: 0,

    setPassParams: function(option, question) {
        this[option] = confirm("Would you like to include " + question + " in your password?")
        if (this[option] === true) {
            console.log("Ok then, " + question + " will be included!")
        }
        else {
            console.log("Ok then, " + question + " will be ommitted!")
        }
    },

    isAlpha: function(ch){
        return (ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z');
    },

    startGeneration: function() {
        var bLengthValid = false
        this.availChars = []
        this.passResult = ""
        this.bLower = false
        this.bUpper = false
        this.bSymbol = false
        this.bNum = false
        this.validPass = false
        this.attempt = 0

        while (bLengthValid === false){
            length = prompt("Please enter a desired password length between 8 and 128")
            if ((length < 129) && length > 7){
                console.log("Valid entry: " + length)
                bLengthValid = true
            }
            else{
                console.log("Invalid Length: " + length + ". Please enter a length between 8 and 128 characters.")
            }
        }
        
        this.setPassParams("bLower", "lowercase letters")
        this.setPassParams("bUpper", "uppercase letters")
        this.setPassParams("bNum", "numbers")
        this.setPassParams("bSymbol", "symbols")
        
        if (!this.bUpper && !this.bLower){
            if (this.bNum){
                if (this.bSymbol){
                    this.availChars = this.availNumbers.concat(this.availSymbols)
                }
                else{
                    this.availChars = this.availNumbers
                }
            }
            else {
                if (this.bSymbol){
                    this.availChars = this.availSymbols
                }
                else {
                    alert("Can't make password. Please choose at least one password option.")
                    return
                }
            }
        }
        else {
            if (this.bNum){
                this.availChars = this.availLetters.concat(this.availNumbers)
                if (this.bSymbol){
                    this.availChars = this.availChars.concat(this.availSymbols)
                }
            else if (this.bSymbol){
                this.availChars = this.availLetters.concat(this.availSymbols)
                }
            }
            else {
                halfString = Math.floor(this.availLetters.length / 2)
                this.availChars = this.availLetters.slice(0, halfString)
            }
        }
        
        while(!this.validPass){
            this.attempt++
            console.log(this.attempt)
            console.log("Previous result: " + this.passResult)
            this.passResult = ""
            for (index = 0; index < length; index++){
                this.passResult += this.availChars[Math.floor((Math.random()*this.availChars.length))]
            }
            console.log("Generated")
            if (!this.bUpper){
                this.passResult = this.passResult.toLowerCase()
            }
            else if(!this.bLower){
                this.passResult = this.passResult.toUpperCase()
            }
            console.log("Upper and lower set")
            
            this.hasUpper = false
            this.hasLower = false
            this.hasNumber = false
            this.hasSymbol = false

            for (index = 0; index < this.passResult.length; index++){
                if (this.availNumbers.includes(this.passResult[index])){
                    this.hasNumber = true
                    console.log("Number checked")
                }
                if (this.availSymbols.includes(this.passResult[index])){
                    this.hasSymbol = true
                    console.log("Symbol checked")
                }
                if (this.isAlpha(this.passResult[index]) && (this.passResult[index] === this.passResult[index].toLowerCase())){
                    this.hasLower = true
                    console.log("Lower checked")
                }
                if (this.isAlpha(this.passResult[index]) && (this.passResult[index] === this.passResult[index].toUpperCase())){
                    this.hasUpper = true
                    console.log("Upper checked")
                }
            }
            if ((this.hasLower === this.bLower) && (this.hasUpper === this.bUpper) && (this.hasSymbol === this.bSymbol) && (this.hasNumber === this.bNum)){
                this.validPass = true
                console.log("Criteria met, breaking loop.")
                break
            }
        }
        console.log(this.passResult)           
        document.getElementById("password").value=this.passResult
    }
}


