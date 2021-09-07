const jwt = require("jsonwebtoken")


const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {

    const payload = { uid }
    jwt.sign(
        payload,
        process.env.SECRETORPRIVATEKEY,
        { expiresIn: "2h" },
        (err, token) => {

            if (err) {
                reject("No se pudo generar token")
            } else {
                resolve(token)
            }

        }



    )
})


}

module.exports = {
    generarJWT
}