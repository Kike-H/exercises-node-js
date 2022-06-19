
function calculate_discount(amount, percent) {
    if(amount <= 0) {
        return new Error('There is an error')
    }
    return amount - (amount * (percent/100));
}

function proccess_amount() {
    return calculate_discount(100, 20, function(err, _) {
        if(err) {
            console.log(err)
        }
    })
}

setTimeout(() => {
    console.log(proccess_amount())
}, 3000);

