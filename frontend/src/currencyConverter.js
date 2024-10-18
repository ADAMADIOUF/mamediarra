// currencyConverter.js

const conversionRates = {
  USD: 1, // Base currency
  CFA: 600, // Example conversion: 1 USD = 600 CFA
}

// Function to convert price based on selected currency and language
export const convertPrice = (price, language) => {
  if (language === 'fr') {
    // French
    return (price * conversionRates.CFA).toFixed(2) // Convert from USD to CFA
  } else {
    // English
    return (price / conversionRates.CFA).toFixed(2) // Convert from CFA to USD
  }
}

// Function to get currency symbol based on language
export const getCurrencySymbol = (language) => {
  return language === 'fr' ? 'CFA' : '$' // French returns CFA, English returns $
}
