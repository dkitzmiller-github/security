import {CookieOptions, Request, Response} from 'express';
import {db} from './database';
import {USERS} from './database-data';
import * as argon2 from 'argon2';
import {validatePassword} from './password-validation';
import {randomBytes} from './security.utils';
import {sessionStore} from './session-store';

export function createUser(req: Request, res: Response) {

    const credentials = req.body;
    const errors = validatePassword(credentials.password);

    if ( errors.length > 0 ) {
        res.status(400).json({errors});

    } else {

        createUserAndSession(res, credentials);

        // argon2.hash(credentials.password)
        //    .then(passwordDigest => {
                // applying await to randomBytes will handle the promise
                // but this will be in error unless it is within an async function
                // To make it async, use an anonymous function within an IIFE and
                // the async keyword

                // Commenting this out since it would be better to create a function
                // with the async keyword
                // ( async () => {
                //     const sessionId = await randomBytes(32);
                // })();
        //         res.status(200).json({id: user.id, email: user.email});
        //    });
    }
}

async function createUserAndSession(response: Response, credentials) {

    // argon2.hash returns a promise, and async await will resolve the promise
    const passwordDigest = await argon2.hash(credentials.password);
    const user = db.createUser(credentials.email, passwordDigest);

    debugger;
    const sessionId = await randomBytes(32).then(bytes => bytes.toString('hex'));
    console.log(`sessionId: ${sessionId}`);

    sessionStore.createSession(sessionId, user);

    // httpOnly will only allow http and no javascript use on the client
    response.cookie('SESSIONID', sessionId, { secure: true, httpOnly: true});
    response.status(200).json({id: user.id, email: user.email});
}
