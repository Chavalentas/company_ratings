export class PasswordValidationService{
    minPasswordLength: number;

    constructor(minPasswordLength: number){
        this.minPasswordLength = 0;
        this.setMinPasswordLength(minPasswordLength);
    }

    public isPasswordValidAsync(password: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            if (!(password.length >= this.minPasswordLength)){
                resolve(false);
                return;
            }

            let regexUppercase = new RegExp("[A-Z]");
            let regexLowercase = new RegExp("[a-z]");
            let regexDigit = new RegExp("[0-9]");
            let regexSpecialCharacter = new RegExp("[^A-Za-z0-9]");

            if (!regexUppercase.test(password)){
                resolve(false);
                return;
            }

            if (!regexLowercase.test(password)){
                resolve(false);
                return;
            }

            if (!regexDigit.test(password)){
                resolve(false);
                return;
            }

            if (!regexSpecialCharacter.test(password)){
                resolve(false);
                return;
            }

            resolve(true);
        });
    }

    private setMinPasswordLength(minPasswordLength: number): void{
        if (minPasswordLength <= 0){
            throw new Error("minPasswordLength must be greater than 0!");
        }

        this.minPasswordLength = minPasswordLength;
    }
}