function calculate_discount(amount, percent) {
    if(amount <= 0) {
        return new Error('There is an error')
    }
    return new Promise (resolve => {
        setTimeout(() => {
            discount = amount - (amount * (percent/100));
            resolve(discount)
        }); 
    })
}

async function proccess_amount() {
    let d = await calculate_discount(10, 20);
    return d;
}

proccess_amount().then(d => console.log(d)).catch(err => console.log(err))




