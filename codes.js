const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };

// const baseurl = "https://api.frankfurter.app/latest?amount=1&from=EUR&to=USD"
const baseurl = "https://api.frankfurter.app/latest?amount=1&"

// const baseurl= "https://api.exchangerate.host/convert?from=USD&to=INR"
// const baseurl= "https://api.exchangerate.host/convert?"



let dropdowns = document.querySelectorAll(".dropdown select")
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")

for (let select of dropdowns){
  for(let code in countryList){
    let options = document.createElement("option")
    options.innerText = code
    options.value = code;
    if(select.name === "from" && code === "USD"){
      options.selected = "selected"
    }
    else if(select.name === "to" && code === "INR"){
      options.selected = "selected"
    }
    select.append(options)
  }
  select.addEventListener("change", (evt)=>{
    updateFlag(evt.target)
  })
}

const updateFlag = (element) =>{
  // image
  let currcode = element.value;
  let countrycode = countryList[currcode]
  // let image = document.querySelector(".select-container img")  we cant use this bcoz we dont know that in which select we are changing.
  let image = element.parentElement.querySelector("img")   // instead we use this bcoz element contain that select whome we are changing.
  image.src = `https://flagsapi.com/${countrycode}/flat/64.png`
}

const btn = document.querySelector("form button")

btn.addEventListener("click", async(evt)=>{
  evt.preventDefault(); // avoid refreshing of page.
  let amount = document.querySelector(".amount input")
  // console.log(amount.value)
  if(amount.value === "" || amount.value <0){
    amount.value = "1"
  }
  // console.log(fromCurr.value, toCurr.value)
  const URL = `${baseurl}from=${fromCurr.value}&to=${toCurr.value}`
  let response = await fetch(URL)
  let data = await response.json()
  let rate = data.rates[toCurr.value]
  // console.log(rate)

  let result = rate*amount.value
  // console.log(result)

  let msg = document.querySelector(".msg")
  msg.innerText=(`${amount.value} ${fromCurr.value} = ${result} ${toCurr.value}`)

  // let result = document
})


