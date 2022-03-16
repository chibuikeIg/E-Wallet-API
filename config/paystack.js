module.exports = (request) => {

    const initializePayment = (form, mycallback) => {

        const option = {
            url : 'https://api.paystack.co/transaction/initialize',
            headers : {
                authorization: 'Bearer '+process.env.PAYSTACK_SECRET_KEY,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
           },
          form
        }

        const callback = (error, response, body)=>{
            return mycallback(error, body);
        }

        request.post(option, callback);
    }

    const verifyPayment = (ref,mycallback) => {

        const option = {
            url : 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
            headers : {
                authorization: 'Bearer '+process.env.PAYSTACK_SECRET_KEY,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
           }
        }

        const callback = (error, response, body)=>{
            return mycallback(error, body);
        }


        request(option,callback);
    }

    return {initializePayment, verifyPayment};
}