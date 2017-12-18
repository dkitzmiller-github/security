
import * as passwordValidator from 'password-validator';
const schema = new passwordValidator();

schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


export function validatePassword(password: string) {
    return schema.validate(password, {list: true});
}


// console.log(schema.validate('validPASS123')); // => true
// console.log(schema.validate('invalidPASS')); // => false
// Get a full list of rules which failed
// console.log(schema.validate('joke', { list: true }));
// => [ 'min', 'uppercase', 'digits' ]

