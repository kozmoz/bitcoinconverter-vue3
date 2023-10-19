<template>
  <div class="converter-block-result bg-white text-center px-3 py-3 my-3">
    <div v-if="tickerPrice">
      <h3>
        <template v-if="direction === CONVERT_DIR.TO_BTC">
          {{ i18n.t(`message.${currency}_sign`) }} {{ amount || 0 }} = {{ roundFilter(calculatedResult, 5, i18n.locale.value) }} BTC
        </template>
        <template v-else>
          {{ amount || 0 }} BTC = {{ roundFilter(calculatedResult, 2, i18n.locale.value) }}
          {{ i18n.t(`message.${currency}_sign`) }}
        </template>
      </h3>
      <p class="mb-0">
        <small class="text-muted">{{ i18n.t('message.rate_updated') }}</small>
      </p>
      <p class="mb-0">
        <small class="text-muted">
          {{ i18n.t('message.rate_update_time') }}
          {{ timeFilter(tickerPrice.updated) }} {{ dateFilter(tickerPrice.updated, i18n.locale.value) }}, 1 BTC =
          {{ i18n.t(`message.${currency}_sign`) }}
          {{ roundFilter(tickerPriceActiveCurrency, 2, i18n.locale.value) }} (buy)
        </small>
      </p>
    </div>

    <div v-if="loadingStatus === LOADING_STATUS.LOADING">
      Loading/updating exchange rates...
    </div>

    <div v-if="loadingError" class="alert alert-danger mb-0" role="alert">
      {{ loadingError }}
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, onUnmounted, ref} from '@vue/runtime-core';
import {ComputedRef} from '@vue/reactivity';
import {TickerPrice, TickerService} from '../services/TickerService';
import {CONVERT_DIR, CURRENCY, LOADING_STATUS} from '../domain/enums';
import {dateFilter, timeFilter} from '../filters/date-filters';
import {roundFilter} from '../filters/number-filters';
import {useI18n} from 'vue-i18n';

interface IProps {
  amount: number,
  currency: string,
  direction: string
}

/**
 * Component to calculate the final exchange rate.
 */
export default defineComponent({
  methods: {dateFilter},
  props: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true,
      /** Test if the enum value is valid. */
      validator: (v: string) => Object.keys(CURRENCY).indexOf(v) !== -1
    },
    direction: {
      type: String,
      required: true,
      /** Test if the enum value is valid. */
      validator: (v: string) => Object.keys(CONVERT_DIR).indexOf(v) !== -1
    }
  },

  setup(props: Readonly<IProps>) {
    const loadingStatus = ref<String>(LOADING_STATUS.NOT_LOADING);
    const loadingError = ref<String>();
    const tickerPrice = ref<TickerPrice>();

    /**
     * Load the ticker prices.
     */
    async function loadPrices(): Promise<void> {
      loadingStatus.value = LOADING_STATUS.LOADING;
      try {
        tickerPrice.value = await TickerService.fetchCoinDeskCurrentPrice();
        loadingError.value = '';
        loadingStatus.value = LOADING_STATUS.NOT_LOADING;
      } catch (error) {
        loadingError.value = `${error}`;
        loadingStatus.value = LOADING_STATUS.ERROR;
      }
    }

    /**
     * Update the BTC price on interval.
     */
    onMounted((): void => {
      loadPrices();
      const cancelId = setInterval(loadPrices, 60000 /* One minute. */);
      onUnmounted(() => clearInterval(cancelId));
    });

    /**
     * Calculate new price when something changes.
     */
    const calculatedResult: ComputedRef<number> = computed(() => {
      if (!props.amount || !tickerPriceActiveCurrency.value) {
        return 0;
      }
      return props.direction === CONVERT_DIR.FROM_BTC ?
        props.amount * tickerPriceActiveCurrency.value : props.amount / tickerPriceActiveCurrency.value;
    });

    /**
     * Determine the ticker price for the active currency.
     */
    const tickerPriceActiveCurrency: ComputedRef<number> = computed(() => {
      if (!tickerPrice.value) {
        return 0;
      }
      return props.currency === CURRENCY.EUR ? tickerPrice.value.rateEUR : tickerPrice.value.rateUSD;
    });

    return {
      i18n: useI18n(),
      loadingStatus,
      loadingError,
      tickerPrice,
      calculatedResult,
      tickerPriceActiveCurrency,
      // Filters.
      timeFilter,
      roundFilter,
      // Enums.
      CONVERT_DIR,
      LOADING_STATUS
    }
  }
})

</script>

<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.converter-block-result {
  border: 3px solid #00256f;
  border-radius: 10px;
}

</style>
