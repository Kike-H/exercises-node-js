function calculate_discount(amount, percent) {
    if(amount <= 0) {
        return new Error('There is an error')
    }
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve(amount - (amount * (percent/100)))
        }, 2000)
    })
}

async function proccess_amount() {
    const myPromise = await calculate_discount(10, 20);
    console.log(myPromise);
}

proccess_amount();




