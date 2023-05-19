// Initialize passwordgen object and all main variables, including characters and some debug to check how many attempts it takes to generate.
passwordGenerator = {
    availLetters: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    availNumbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    availSymbols: ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", "|", ":", ";", "'", "<", ",", ">", ".", "?", "/", '\\'],
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
    length: 0,

    // Initialize a function that sets the chosen password options and displays prompt.
    setPassParams: function(option, question) {
        this[option] = confirm("Would you like to include " + question + " in your password?")
        if (this[option] === true) {
            alert("Ok then, " + question + " will be included!")
        }
        else {
            alert("Ok then, " + question + " will be ommitted!")
        }
    },
    // Initialize a function that checks if the input is a letter or not
    isAlpha: function(ch){
        return (ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z');
    },
    // Initialize the main function to be called when "Generate" is clicked
    startGeneration: function() {
        // Set all working variables to their default state in case of multiple generations.
        var bLengthValid = false
        this.availChars = []
        this.passResult = ""
        this.bLower = false
        this.bUpper = false
        this.bSymbol = false
        this.bNum = false
        this.validPass = false
        this.attempt = 0
        this.length = 0
        // Run a loop while the chosen password length is invalid, meaning not between 8 and 128, and ensure its a number. If an invalid length is entered, an alert comes up prompting the user to try again, this time between range.
        while (bLengthValid === false){
            this.length = prompt("Please enter a desired password length between 8 and 128")
            if ((this.length < 129) && (this.length > 7) && (!isNaN(this.length))){
                alert("Great! Your generated password will be " + this.length + " characters long")
                bLengthValid = true
            }
            else{
                alert("Invalid Length: " + this.length + ". Please enter a length between 8 and 128 characters.")
            }
        }
        // If length is valid, the while loop breaks and runs the set function for each parameter sequentially, passing in the variable name and context for the text prompts/alerts.
        this.setPassParams("bLower", "lowercase letters")
        this.setPassParams("bUpper", "uppercase letters")
        this.setPassParams("bNum", "numbers")
        this.setPassParams("bSymbol", "symbols")
        /* Once the password parameters are all set, the code goes through its checks to see what it should add to the "availChars" array. This way it adds only the characters chosen in the previous step.
        First it checks if the user has chosen to omit letters from the password */
        if (!this.bUpper && !this.bLower){
            // If the password has no letters, it then checks to see if it should contain numbers
            if (this.bNum){
                // If the password should contain numbers, it looks to see if it should contain symbols too, and if so it concatenates both numbers and symbols to make the "availChars" array
                if (this.bSymbol){
                    this.availChars = this.availNumbers.concat(this.availSymbols)
                }
                // Otherwise if the password should contain no symbols, it sets the "availChars" array to just numbers
                else{
                    this.availChars = this.availNumbers
                }
            }
            // If the password contains no letters and no numbers, it checks to see if it should contain symbols, and if so it sets the "availChars" array to only symbols. Otherwise, it tells the user it needs at least one type of character 
            else {
                if (this.bSymbol){
                    this.availChars = this.availSymbols
                }
                else {
                    alert("Can't make password with selected options. Please choose at least one type of character.")
                    return
                }
            }
        }
        // Otherwise, if the password SHOULD contain letters, it checks if it should contain numbers, does the check for symbols, and either concatenates all three or just letters and numbers. 
        else {
            if (this.bNum){
                this.availChars = this.availLetters.concat(this.availNumbers)
                if (this.bSymbol){
                    this.availChars = this.availChars.concat(this.availSymbols)
                }
            }    
            else if (this.bSymbol){
                this.availChars = this.availLetters.concat(this.availSymbols)
            }
            /* Else, if only letters are supposed to be included, we check to see if we have both upper and lowercase letters. If we dont, since we included both uppercase and lowercase in our availLetters,
            we split availLetters in half and get only the first half, one set of lowercase letters. If we have both, we just set availChars to all of our letters, upper and lower*/
            else {
                if (this.bLower != this.bUpper){
                    halfString = Math.floor(this.availLetters.length / 2)
                    this.availChars = this.availLetters.slice(0, halfString)
                }
                else{
                    this.availChars = this.availLetters
                }
            }
        }
        // Here comes the fun. After handling all of that we are ready for our main generation loop. We make a while loop that runs until we can confirm that the generated password is valid and satisfies all conditions.
        while(!this.validPass){
            // We increment and print the attempt in a debug to see how long it takes to find a suitable result
            // Uncomment the next two lines to activate the counter debug 
            // this.attempt++
            // console.log(this.attempt)
            // We make sure our result is clear at the beginning of every loop so it doesnt concatenate the previous string to our new one
            this.passResult = ""
            // We then run our generation loop, incrementing until we hit the desired password length
            for (index = 0; index < this.length; index++){
                // And each loop, we add a random character from our "availChars" array to our result, named passResult 
                this.passResult += this.availChars[Math.floor((Math.random()*this.availChars.length))]
            }
            // We then take the resulting password and apply the specific restrictions, be it no uppercase or no lowercase, and make all letters in the result one or the other depending
            if (!this.bUpper){
                this.passResult = this.passResult.toLowerCase()
            }
            else if(!this.bLower){
                this.passResult = this.passResult.toUpperCase()
            }
            // We make extra care to ensure our checks for this loop are reset to default "false"
            this.hasUpper = false
            this.hasLower = false
            this.hasNumber = false
            this.hasSymbol = false
            // And then run our criteria checks ton make sure that all requested symbol types are in the resulting password. 
            for (index = 0; index < this.passResult.length; index++){
                // First we check if the current index value is a number by seeing if our "availNumbers" array contains it. If so we mark the check as passed. 
                if (this.availNumbers.includes(this.passResult[index])){
                    this.hasNumber = true
                }   
                // Then we do the same with the index value against our symbol array, once again marking the check if passed. 
                if (this.availSymbols.includes(this.passResult[index])){
                    this.hasSymbol = true
                }
                // For the letters, we check first to see if the current indexes value is a letter- from our function earlier - and if so we check to see if the result is equal to the Lowercase version of itself, again marking if passed.
                if (this.isAlpha(this.passResult[index]) && (this.passResult[index] === this.passResult[index].toLowerCase())){
                    this.hasLower = true
                }
                // And we do the same for the uppercase, checking if current indexes value is a letter and also equal to the Uppercase version of itself, and if so we mark our last check
                if (this.isAlpha(this.passResult[index]) && (this.passResult[index] === this.passResult[index].toUpperCase())){
                    this.hasUpper = true
                }
            }
            // Finally, if the generated password's parameters match the user's choices and satisfies all criteria, set the while loops condition "validPass" to true, breaking the loop.. 
            if ((this.hasLower === this.bLower) && (this.hasUpper === this.bUpper) && (this.hasSymbol === this.bSymbol) && (this.hasNumber === this.bNum)){
                this.validPass = true
                break
            }
        }
        // .. And sets the "password" element's text to the result.        
        document.getElementById("password").value=this.passResult
    }
}