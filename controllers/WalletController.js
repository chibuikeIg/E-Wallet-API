const Wallet = require('../models/Wallet')

// wallet update function
const updateWallet = (user_id, amount, action, callback) => {

    Wallet.findOne({user_id:user_id}).then((wallet) => {

        if(!wallet) {

            const newWallet = new Wallet({
                user_id: user_id,
                balance: amount
            })

            newWallet.save()
            .then((result) => {

                callback(false, result)

            })
            .catch((err) => callback(true, err))

        } else {

            if(action == 'increase') {

                Wallet.updateOne({user_id:user_id}, {$set: {
                    balance: wallet.balance + amount,
                    updatedAt: Date.now
                }})
                .then((result) => callback(false, result))
                .catch((err) => callback(true, err))

            } else if(action == 'decrease') {

                Wallet.updateOne({user_id:user_id}, {$set: {
                    balance: wallet.balance - amount,
                    updatedAt: Date.now
                }})
                .then((result) => callback(false, result))
                .catch((err) => callback(true, err))

            }
            
        }

    }).catch((err) => callback(true, err))

    return callback

}

module.exports = {
    updateWallet
}