
export function currecny(numb) {
      return new Intl.NumberFormat(undefined, { style: "currency", currency: "AUD" }).format(numb)
}

