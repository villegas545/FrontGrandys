export const currencyFormat = (num) => {
    try {
        return `$${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
    } catch (error) {
        return 'NAN';
    }
};

export const getToday = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    // console.log(today);
    return today;
};
