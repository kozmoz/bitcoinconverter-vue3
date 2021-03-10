// @ts-ignore
import axios, {AxiosResponse} from 'axios';

/**
 * The current BTC price in EUR and USD.
 */
export interface TickerPrice {
    updated: Date,
    rateEUR: number,
    rateUSD: number
}

/**
 * Part of the Coindesk API response.
 *
 * https://www.coindesk.com/coindesk-api
 * https://www.coindesk.com/price/bitcoin
 */
export interface CoindeskBpiCurrentPrice {
    time: {
        /** Time in format '2013-09-18T17:27:00+00:00'. */
        updatedISO: string
    },
    bpi: {
        EUR: { rate_float: number },
        USD: { rate_float: number }
    }
}

/**
 * Moved to separate service so we can have a promise with return types (when using TypeScript).
 */
export class TickerService {

    /**
     * Get the BTC price for both EUR and USD.
     *
     * @return The response with the date and prices
     */
    public static loadTickerPrice(): Promise<TickerPrice | string> {
        return new Promise(function (resolve, reject) {
            axios
                .get('https://api.coindesk.com/v1/bpi/currentprice.json')
                .then((response: AxiosResponse<CoindeskBpiCurrentPrice>) => {
                    resolve({
                        updated: new Date(response.data.time.updatedISO),
                        rateEUR: response.data.bpi.EUR.rate_float,
                        rateUSD: response.data.bpi.USD.rate_float
                    });
                })
                .catch((response: AxiosResponse) => {
                    reject(`${response.status} ${response.statusText}`);
                });
        });
    }
}
