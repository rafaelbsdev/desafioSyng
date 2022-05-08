const bdd = require('./bd')
const DAYS = require('./days')

function getCheapestHotel(input) { //DO NOT change the function's name.

    const arr = input.split(':')
    const type = arr[0];
    const days = arr[1].split(',')

    const days_of_week = days.map((days) => {
        const start = days.indexOf('(');
        const end = days.indexOf(')');
        return days.substring(start + 1, end);
    })

    const client_type = type === 'Regular' ? ['regular_week', 'regular_weekend'] : ['reward_week', 'reward_weekend']

    const pricing = days_of_week.map((day) => {
        const day_type = DAYS.find((d) => d.label === day);

        const dates = bdd.map((data) => {
            return {
                name: data.name,
                value: day_type.type === 0 ? data.pricing[client_type[0]] : data.pricing[client_type[1]]
            }
        })

        return {
            day,
            prices: dates
        }
    })

    const final_price = []
    pricing.forEach((p) => {
        p.prices.forEach((ele) => {
            const hotel = final_price.find((fp) => fp.name === ele.name)
            if (hotel) {
                hotel.total += ele.value
            } else {
                final_price.push({
                    name: ele.name,
                    total: ele.value
                })
            }
        })
    })

    final_price.sort((a, b) => {
        if (a.total > b.total) return 1;
        if (a.total < b.total) return -1;
        return 0;
    })

    return final_price[0].name
}

exports.getCheapestHotel = getCheapestHotel