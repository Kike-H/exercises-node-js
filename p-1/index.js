function calculate_discount(amount, percent) {
    if(amount < 0) {
        console.log("Invalid amount")
        return -1
    }
    return amount - (amount * (percent/100));
}

setTimeout(() => {
    console.log(calculate_discount(100, 20))
}, 3000);

