// https://github.com/kaimallea/isMobile
!(function (a) {
  var b = /iPhone/i,
    c = /iPod/i,
    d = /iPad/i,
    e = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
    f = /Android/i,
    g = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
    h =
      /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
    i = /Windows Phone/i,
    j = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
    k = /BlackBerry/i,
    l = /BB10/i,
    m = /Opera Mini/i,
    n = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
    o = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
    p = new RegExp('(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)', 'i'),
    q = function (a, b) {
      return a.test(b)
    },
    r = function (a) {
      var r = a || navigator.userAgent,
        s = r.split('[FBAN')
      if (
        ('undefined' != typeof s[1] && (r = s[0]),
        (s = r.split('Twitter')),
        'undefined' != typeof s[1] && (r = s[0]),
        (this.apple = {
          phone: q(b, r),
          ipod: q(c, r),
          tablet: !q(b, r) && q(d, r),
          device: q(b, r) || q(c, r) || q(d, r)
        }),
        (this.amazon = {
          phone: q(g, r),
          tablet: !q(g, r) && q(h, r),
          device: q(g, r) || q(h, r)
        }),
        (this.android = {
          phone: q(g, r) || q(e, r),
          tablet: !q(g, r) && !q(e, r) && (q(h, r) || q(f, r)),
          device: q(g, r) || q(h, r) || q(e, r) || q(f, r)
        }),
        (this.windows = {
          phone: q(i, r),
          tablet: q(j, r),
          device: q(i, r) || q(j, r)
        }),
        (this.other = {
          blackberry: q(k, r),
          blackberry10: q(l, r),
          opera: q(m, r),
          firefox: q(o, r),
          chrome: q(n, r),
          device: q(k, r) || q(l, r) || q(m, r) || q(o, r) || q(n, r)
        }),
        (this.seven_inch = q(p, r)),
        (this.any =
          this.apple.device ||
          this.android.device ||
          this.windows.device ||
          this.other.device ||
          this.seven_inch),
        (this.phone =
          this.apple.phone || this.android.phone || this.windows.phone),
        (this.tablet =
          this.apple.tablet || this.android.tablet || this.windows.tablet),
        'undefined' == typeof window)
      )
        return this
    },
    s = function () {
      var a = new r()
      return ((a.Class = r), a)
    }
  'undefined' != typeof module && module.exports && 'undefined' == typeof window
    ? (module.exports = r)
    : 'undefined' != typeof module &&
        module.exports &&
        'undefined' != typeof window
      ? (module.exports = s())
      : 'function' == typeof define && define.amd
        ? define('isMobile', [], (a.isMobile = s()))
        : (a.isMobile = s())
})(this)

//Enumuration data for contries and languages
var isoCountries = {
  GB: 'United Kingdom',
  US: 'United States',
  NL: 'Netherlands',
  IT: 'Italy',
  NO: 'Norway',
  IE: 'Ireland',
  CA: 'Canada',
  RU: 'Russia',
  DE: 'Germany',
  CH: 'Switzerland',
  AT: 'Austria',
  SE: 'Sweden',
  DK: 'Denmark',
  ES: 'Spain',
  FR: 'France',
  PT: 'Portugal',
  BE: 'Belgium',
  HU: 'Hungary',
  GR: 'Greece',
  JP: 'Japan',
  AE: 'United Arab Emirates',
  AU: 'Australia',
  TW: 'Taiwan',
  TR: 'Turkey'
}
var isoLanguages = {
  en: 'English',
  nl: 'Dutch',
  it: 'Italian',
  no: 'Norwegian',
  fr: 'French',
  ru: 'Russian',
  de: 'German',
  sv: 'Swedish',
  da: 'Danish',
  es: 'Spanish',
  it: 'Italian',
  pt: 'Portuguese',
  hu: 'Hungarian',
  el: 'Greek',
  ja: 'Japanese',
  ar: 'Arabic',
  zh: 'Chinese',
  tr: 'Turkish'
}

//Globle object for digital data layer
window.digitalData = window.digitalData || {}

// Dados fixos da promoção (o site não tem locale na URL nem meta gsaBrand)
var PROMO = {
  brand: 'Pringles',
  name: 'Pringles Churrasco',
  country: 'Brazil',
  language: 'Portuguese'
}

// Títulos das páginas seguem o padrão "Página — Pringles Churrasco"
function getPageName(title) {
  var name = title.split(' — ')[0]
  return name === PROMO.name ? 'Home' : name
}

function getMetaDescription() {
  var meta = document.querySelector('meta[name="description"]')
  return meta ? meta.getAttribute('content') : ''
}

/*Initializing global objects */
digitalData.page = {
  pageTitle: document.title,
  pageDescription: getMetaDescription(),
  promotionName: PROMO.name,
  pageURL: location.protocol + '//' + location.hostname + location.pathname,
  contentHierarchy: {
    level1: null,
    level2: null,
    level3: null,
    level4: null,
    level5: null
  },
  urlHash: '',
  environment: '',
  propertyID: '',
  siteRegion: '',
  referringURL: document.referrer,
  previousPage: document.referrer,
  hostname: document.location.hostname,
  pageName: getPageName(document.title),
  server: 'Apache',
  mktVisId: '',
  mktOrgId: '6206682859721E8F0A495C3A',
  pageType: '',
  siteType: 'brand site',
  userAgent: navigator.userAgent,
  focusBrand: PROMO.brand,
  browser: navigator.appVersion,
  browserType: navigator.appName,
  siteCountry: PROMO.country,
  siteLanguage: PROMO.language,
  visitorState: '',
  visitorZip: '',
  visitorType: '',
  section: '',
  deviceOS: navigator.platform,
  pageType: document.contentType,
  dlError: window.onerror,
  assets: {
    id: '',
    friendlyName: '',
    focusBrand: ''
  }
}

digitalData.user = {
  language: navigator.language,
  userCity: '',
  userState: '',
  userZip: '',
  userID: '',
  profile: {
    profileID: '',
    rewardsPoints: '',
    userTitle: '',
    userType: ''
  },
  attributes: {
    isLoggedIn: '',
    registrationDate: '',
    registrationType: 'new',
    loginMethod: '',

    socialLogin: {
      socialName: '',
      socialNetwork: ''
    }
  }
}

digitalData.video = {
  videoname: '',
  videoplayer: 'YouTube',
  videoduration: ''
}

digitalData.product = {
  productInfo: {
    productId: '',
    productName: '',
    productCategory: '',
    productSubCategory: 'NA'
  }
}

digitalData.search = {
  searchResults: {
    resultsCount: 'NA',
    resultPageCount: 'NA',
    searchFiltersApplied: ''
  },
  searchParams: {
    searchInfo: {
      searchTermEntered: '',
      searchCategory: 'entire site',
      searchRank: 'NA',
      searchPageNumber: 'NA'
    }
  }
}

digitalData.social = {
  socialNetwork: '',
  event: '',
  contentType: ''
}

digitalData.listing = {
  event: '',
  listingResults: {
    resultsCount: '',
    resultsCountOnline: ''
  },
  item: {
    retailerID: '',
    availability: '',
    storeLocation: '',

    productInfo: {
      productName: ''
    }
  },
  listingParams: {
    searchInfo: {
      searchTermEntered: '',
      searchFiltersApplied: 'NA'
    }
  }
}

digitalData.userRegistration = {
  custKey: ''
}

//Device type detection @Ravi(M1050926)
;(function () {
  digitalData.user.device = navigator.platform

  if (isMobile.phone) {
    digitalData.user.deviceType = 'Mobile'
  } else if (isMobile.tablet) {
    digitalData.user.deviceType = 'Tablet'
  } else {
    digitalData.user.deviceType = 'Desktop'
  }
})()
;(function () {
  if (isMobile.phone) {
    digitalData.page.deviceType = 'Mobile'
  } else if (isMobile.tablet) {
    digitalData.page.deviceType = 'Tablet'
  } else {
    digitalData.page.deviceType = 'Desktop'
  }
})()

//focus brannd value @Ravi(M1050926)
;(function () {
  if (typeof document.getElementsByName('gsaBrand')[0] !== 'undefined') {
    var focusBrand = document
      .getElementsByName('gsaBrand')[0]
      .getAttribute('content')
    digitalData.page.focusBrand = focusBrand
  }
})()

// Visitor Type  @Ravi(M1050926)
;(function () {
  var visitor_type = (function () {
    if ('localStorage' in window && window['localStorage'] !== null) {
      if ('counter' in localStorage && localStorage['counter'] !== null) {
        return 'repeated-user'
      } else {
        localStorage.setItem('counter', 'visited')
        return 'new-user'
      }
    }
  })()

  digitalData.page.visitorType = visitor_type
})()

//sitecountry and language for data layer @Ravi(M1050926)
;(function () {
  var urlPath = window.location.pathname.split('/')
  for (i = 0; i < urlPath.length; i++) {
    if (urlPath[i].indexOf('_') != -1 && urlPath[i].length == 5) {
      var localeVar = urlPath[i].split('_')
      var language = getLanguageName(localeVar[0], isoLanguages)
      var country = getCountryName(localeVar[1], isoCountries)
      digitalData.page.siteCountry = country
      digitalData.page.siteLanguage = language
    }
    //in case of pringles
    if (urlPath[i].length == 2 && urlPath[i] == urlPath[i].toLowerCase()) {
      var list = navigator.language

      if (list.indexOf('-') != -1) {
        var lang = list.split('-')
        languageCode = lang[0]
        countryCode = lang[1]
        var country = getCountryName(countryCode, isoCountries)
        var language = getLanguageName(languageCode, isoLanguages)
        digitalData.page.siteCountry = country
        digitalData.page.siteLanguage = language
      } else {
        var language = getLanguageName(lang, isoLanguages)
        digitalData.page.siteLanguage = language
        var path = window.location.pathname.split('/')
        var country = path[1]
        digitalData.page.siteCountry = country
      }
    }
  }
})()

//get the content heirarchy for data layer @Ravi(M1050926)
// Sem locale na URL: o 1º segmento já é a página (/cadastro-nota → "Cadastro Nota").
function setContentHierarchy() {
  var path = location.pathname.split('/').filter(Boolean)
  if (path.length === 0) path = ['home']
  while (path.length > 5) {
    path.pop()
  }
  path.forEach(function (p, i) {
    p = p
      .replace(/\-/g, ' ')
      .replace(/\.html/, '')
      .replace(/(^| )([a-z])/g, function (l) {
        return l.toUpperCase()
      })
    path[i] = p
  })

  // generate content heirarchy
  for (var level = 1; level <= 5; level++) {
    digitalData.page.contentHierarchy['level' + level] = path[level - 1] || null
  }
  digitalData.page.section = path[0]
}
setContentHierarchy()

// Nuxt troca de página sem recarregar: atualiza os dados da página quando o
// <title> muda (useSeoMeta de cada página).
function syncPageData() {
  var page = digitalData.page
  if (page.pageTitle === document.title) return
  page.previousPage = page.pageURL
  page.referringURL = page.pageURL
  page.pageTitle = document.title
  page.pageName = getPageName(document.title)
  page.pageDescription = getMetaDescription()
  page.pageURL =
    location.protocol + '//' + location.hostname + location.pathname
  page.urlHash = location.hash ? location.hash.substr(1) : ''
  setContentHierarchy()
}
new MutationObserver(syncPageData).observe(document.head, {
  childList: true,
  subtree: true,
  characterData: true
})

function getCountryName(countryCode, countryArray) {
  if (countryArray.hasOwnProperty(countryCode)) {
    return countryArray[countryCode]
  }
}

function getLanguageName(LanguageCode, languageArray) {
  if (languageArray.hasOwnProperty(LanguageCode)) {
    return languageArray[LanguageCode]
  }
}

//Adobe marketing organisation id and visitor id @Ravi(M1050926)
;(function () {
  var allCookies = document.cookie
  cookieList = allCookies.split(';')
  // Search for organisation id for the given key
  for (var i = 0; i < cookieList.length; i++) {
    arr1 = cookieList[i].split('=')
    if (arr1[0].indexOf('AMCV_6206682859721E8F0A495C3A%40AdobeOrg') != -1) {
      var value = arr1[1]
      valueArray = value.split('%')
      var adobeOrgId = valueArray[4]
      digitalData.page.mktVisId = adobeOrgId.substr(2)
    }
  }
})()

//social share: @Aditya
// Delegado no document: o rodapé é renderizado pelo Vue e pode não existir
// quando o script roda. Os links ficam em `.social_icons a[data-tracking]`.
;(function () {
  var networks = {
    facebook: 'Facebook',
    instagram: 'Instagram',
    youtube: 'YouTube',
    tiktok: 'TikTok'
  }
  document.addEventListener('click', function (event) {
    var link = event.target.closest('.social_icons a[data-tracking]')
    if (!link) return
    var dataTrackingValues = link.getAttribute('data-tracking').split('|')
    if (dataTrackingValues.slice(0, 2).join('|') !== 'socialLinks|linkout') {
      return
    }
    digitalData.social.event = 'Social link clicked'
    digitalData.social.socialNetwork =
      networks[(dataTrackingValues[2] || '').toLowerCase()] || ''
  })
})()

//video player populate
;(function () {
  /*if ($('#youtubevideoplayersrc', this).attr('src') != '') {
  // digitalData.video.videoname = $("#youtubevideoplayersrc").attr("src");
}*/
})()
;(function () {
  var parentAddthisEle = document.querySelectorAll('.addthis_toolbox')
  for (var j = 0; j < parentAddthisEle.length; j++) {
    var anchorEle = parentAddthisEle[j].querySelectorAll('a')
    for (var i = 0; i < anchorEle.length; i++) {
      anchorEle[i].addEventListener('click', function (event) {
        var clickedItem = event.target
        console.log(clickedItem.getAttribute('title'))
        digitalData.social.event = 'Social Content Shared'
        var socialNetwork = clickedItem.parentElement.getAttribute('title')
        digitalData.social.socialNetwork = socialNetwork
        var sn = socialNetwork.toLowerCase()
        if (sn === 'facebook') {
          digitalData.social.contentType = 'post'
        } else if (sn === 'twitter') {
          digitalData.social.contentType = 'tweet'
        } else if (sn === 'youtube') {
          digitalData.social.contentType = 'video'
        } else if (sn === 'email') {
          digitalData.social.contentType = 'message'
        } else if (sn === 'print') {
          digitalData.social.contentType = 'text'
        } else {
          digitalData.social.contentType = 'post'
        }
      })
    }
  }
})()

//Getting digital authorable properties @Ravi

// Sem jQuery no site; o script é `defer`, então o DOM já está pronto aqui.
;(function () {
  var elem = document.querySelector('#propid')
  if (elem != null) {
    var env = elem.getAttribute('data-env')
    var propid = elem.getAttribute('data-propid')
    var siteReg = elem.getAttribute('data-sitereg')

    digitalData.page.environment = env
    digitalData.page.propertyID = propid
    digitalData.page.siteRegion = siteReg
  }
})()

//Product details: @Aditya
;(function () {
  var meta = document.getElementsByTagName('meta')
  var productpage_gsaName = ''
  var productpage_gsaCategory = ''
  var productpage_gsaid = ''
  var productpage_pagetype = ''

  for (var i = 0; i < meta.length; i++) {
    if (meta[i].name == 'gsaPageType') {
      productpage_pagetype = meta[i].content
    }
  }
  for (var i = 0; i < meta.length; i++) {
    if (productpage_pagetype == 'PRODUCT') {
      if (meta[i].name == 'gsaName') {
        productpage_gsaName = meta[i].content
        digitalData.product.productInfo.productName = productpage_gsaName
      }
      if (meta[i].name == 'gsaProductID') {
        productpage_gsaid = meta[i].content
        digitalData.product.productInfo.productId = productpage_gsaid
      }
      if (meta[i].name == 'gsaCategory') {
        productpage_gsaCategory = meta[i].content
        digitalData.product.productInfo.productCategory =
          productpage_gsaCategory
      }
    }
  }
})()

//Where to buy @Aditya
;(function () {
  // Select the node that will be observed for mutations
  const pswidget = document.getElementsByClassName('ps-widget')

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true }

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (var i = 0; i < mutationsList.length; i++) {
      var mutation = mutationsList[i]
      if (mutation.type === 'childList') {
        populateListing()
      } else if (mutation.type === 'attributes') {
        populateListing()
      }
    }
  }

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback)

  // Start observing the target node for configured mutations
  if (pswidget[0] != undefined) {
    observer.observe(pswidget[0], config)
  }
  //on change of dropdown
  var skuSelector = document.querySelector('#__ps-sku-selector-2_0')
  if (skuSelector !== null) {
    skuSelector.addEventListener('change', function (event) {
      digitalData.listing.item.productInfo.productName =
        skuSelector.selectedOptions[0].getAttribute('aria-label')
      populateListing()
    })
  }
  //on click of search
  var wtbSearchButton = document.querySelector('.ps-map-location-button')
  if (wtbSearchButton !== null) {
    wtbSearchButton.addEventListener('click', function (event) {
      digitalData.listing.item.productInfo.productName = document
        .querySelector('#__ps-sku-selector-2_0')
        .selectedOptions[0].getAttribute('aria-label')
      populateListing()
    })
  }
})()

function populateListing() {
  if (document.querySelector('#__ps-sku-selector-2_0') !== null)
    digitalData.listing.item.productInfo.productName = document
      .querySelector('#__ps-sku-selector-2_0')
      .selectedOptions[0].getAttribute('aria-label')
  else if (document.querySelector('.ps-product-name') != null)
    digitalData.listing.item.productInfo.productName =
      document.querySelector('.ps-product-name').innerHTML
  if (document.querySelector('.ps-product-name') != null) {
    var onlineSellers = document.querySelector('.ps-online-sellers')
    if (onlineSellers !== null)
      var onlineSellersCount = onlineSellers.childElementCount
    else var onlineSellersCount = ''
    var localSellers = document.querySelector('.ps-local-sellers')
    if (localSellers !== null)
      var localSellersCount = localSellers.childElementCount
    else var localSellersCount = ''
    digitalData.listing.listingResults.resultsCount = localSellersCount
    digitalData.listing.listingResults.resultsCountOnline = onlineSellersCount
    digitalData.listing.listingParams.searchInfo.searchTermEntered =
      document.querySelector('.ps-map-location-textbox').value
  }
}

//Getting content type value for page @Ravi(M1050926)
;(function () {
  var metas = document.getElementsByTagName('meta')
  if (metas.length > 0) {
    for (i = 0; i < metas.length; i++) {
      if (
        metas[i].hasAttribute('http-equiv') &&
        metas[i].getAttribute('http-equiv') == 'content-type'
      ) {
        digitalData.page.pageType = metas[i]
          .getAttribute('content')
          .split(';')[0]
      }
    }
  }
})()
//Getting urlHash @Ravi(M1050926)
;(function () {
  if (window.location.hash != undefined && window.location.hash != '') {
    var hashVal = window.location.hash
    digitalData.page.urlHash = hashVal.substr(1)
  }
})()
