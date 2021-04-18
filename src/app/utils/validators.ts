import { AbstractControl } from "@angular/forms";
import { Controller } from "swiper";

export class MyValidators {

    static isPriceValid(control: AbstractControl){
        const value = control.value;
        console.log(value);
        if (value > 10000) {
            return {price_invalid: true}
        } else {
            return null;
        }

    }

    static validPassword(control: AbstractControl){
        const value = control.value;

        if (!containsNumber(value)) {
            return {invalid_password: true};
        }
        return  null
    }

    static matchPassword(control: AbstractControl){
        const password = control.get('password').value;
        const confirmPassword = control.get('confirmPassword').value;
        if (password === confirmPassword) {
            return null
        }
        return {invalid_match_pass: true};
    }

    
}

function containsNumber(value: string) {
    return value.split('').find(value => isNumber(value)) !== undefined;
}

function isNumber(value: string) {    
    return !isNaN(parseInt(value, 10));
}