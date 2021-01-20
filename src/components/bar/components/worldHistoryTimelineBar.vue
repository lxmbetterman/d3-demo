<!--  -->
<template>
  <div style="position:relative">
    <div id="WorldHistoryTimelineBar" />
    <div id="tips" />
  </div>
</template>

<script>
import * as d3 from 'd3'

const width = 1000
const height = 1200
const margin = ({ top: 30, right: 30, bottom: 30, left: 40 })

// sort by time
const data = [
  {
    'civilization': 'Mesopotamian civilization',
    'start': -3500,
    'end': -550,
    'startLabel': '',
    'endLabel': '',
    'region': 'Middle East',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 102,
      'g': 194,
      'b': 165,
      'opacity': 1
    }
  },
  {
    'civilization': 'Egyptian civilization',
    'start': -3000,
    'end': -550,
    'startLabel': '',
    'endLabel': '',
    'region': 'Middle East',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 102,
      'g': 194,
      'b': 165,
      'opacity': 1
    }
  },
  {
    'civilization': 'Indus civilization',
    'start': -2500,
    'end': -1500,
    'startLabel': '',
    'endLabel': '',
    'region': 'South Asia',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 252,
      'g': 141,
      'b': 98,
      'opacity': 1
    }
  },
  {
    'civilization': 'Aegean civilization',
    'start': -2000,
    'end': -1200,
    'startLabel': '',
    'endLabel': '',
    'region': 'Europe (and colonial offshoots)',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 141,
      'g': 160,
      'b': 203,
      'opacity': 1
    }
  },
  {
    'civilization': 'Ancient China',
    'start': -2000,
    'end': 500,
    'startLabel': '',
    'endLabel': '',
    'region': 'East Asia',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 231,
      'g': 138,
      'b': 195,
      'opacity': 1
    }
  },
  {
    'civilization': 'Early Nubian civilization',
    'start': -2000,
    'end': -1000,
    'startLabel': '',
    'endLabel': '',
    'region': 'Sub-Saharan Africa',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 166,
      'g': 216,
      'b': 84,
      'opacity': 1
    }
  },
  {
    'civilization': 'Formative age of Mesoamerica',
    'start': -1500,
    'end': 100,
    'startLabel': '',
    'endLabel': '',
    'region': 'pre-colonial Americas',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 255,
      'g': 217,
      'b': 47,
      'opacity': 1
    }
  },
  {
    'civilization': 'Vedic age',
    'start': -1500,
    'end': -500,
    'startLabel': '',
    'endLabel': '',
    'region': 'South Asia',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 252,
      'g': 141,
      'b': 98,
      'opacity': 1
    }
  },
  {
    'civilization': 'Greek age',
    'start': -1200,
    'end': 0,
    'startLabel': '',
    'endLabel': '',
    'region': 'Europe (and colonial offshoots)',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 141,
      'g': 160,
      'b': 203,
      'opacity': 1
    }
  },
  {
    'civilization': 'Ancient Andean region',
    'start': -1000,
    'end': 500,
    'startLabel': '',
    'endLabel': '',
    'region': 'pre-colonial Americas',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 255,
      'g': 217,
      'b': 47,
      'opacity': 1
    }
  },
  {
    'civilization': 'Ancient Steppe empires',
    'start': -1000,
    'end': 500,
    'startLabel': '',
    'endLabel': '',
    'region': 'the Steppe',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 229,
      'g': 196,
      'b': 148,
      'opacity': 1
    }
  },
  {
    'civilization': 'Kush',
    'start': -1000,
    'end': 300,
    'startLabel': '',
    'endLabel': '',
    'region': 'Sub-Saharan Africa',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 166,
      'g': 216,
      'b': 84,
      'opacity': 1
    }
  },
  {
    'civilization': 'First Persian Empire',
    'start': -550,
    'end': -330,
    'startLabel': '',
    'endLabel': '',
    'region': 'Middle East',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 102,
      'g': 194,
      'b': 165,
      'opacity': 1
    }
  },
  {
    'civilization': 'Indian kingdom age',
    'start': -500,
    'end': 1200,
    'startLabel': '',
    'endLabel': '',
    'region': 'South Asia',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 252,
      'g': 141,
      'b': 98,
      'opacity': 1
    }
  },
  {
    'civilization': 'Roman Republic',
    'start': -500,
    'end': 0,
    'startLabel': '',
    'endLabel': '',
    'region': 'Europe (and colonial offshoots)',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 141,
      'g': 160,
      'b': 203,
      'opacity': 1
    }
  },
  {
    'civilization': 'Inter-Persian period',
    'start': -330,
    'end': 200,
    'startLabel': '',
    'endLabel': '',
    'region': 'Middle East',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 102,
      'g': 194,
      'b': 165,
      'opacity': 1
    }
  },
  {
    'civilization': 'Ptolemaic Egypt',
    'start': -330,
    'end': 0,
    'startLabel': '',
    'endLabel': '',
    'region': 'Middle East',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 102,
      'g': 194,
      'b': 165,
      'opacity': 1
    }
  },
  {
    'civilization': 'Second Persian Empire',
    'start': -200,
    'end': 650,
    'startLabel': '',
    'endLabel': '',
    'region': 'Middle East',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 102,
      'g': 194,
      'b': 165,
      'opacity': 1
    }
  },
  {
    'civilization': 'Roman > Byzantine Egypt',
    'start': 0,
    'end': 650,
    'startLabel': '',
    'endLabel': '',
    'region': 'Middle East',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 102,
      'g': 194,
      'b': 165,
      'opacity': 1
    }
  },
  {
    'civilization': 'Roman Empire',
    'start': 0,
    'end': 500,
    'startLabel': '',
    'endLabel': '',
    'region': 'Europe (and colonial offshoots)',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 141,
      'g': 160,
      'b': 203,
      'opacity': 1
    }
  },
  {
    'civilization': 'Classic age of Mesoamerica',
    'start': 100,
    'end': 900,
    'startLabel': '',
    'endLabel': '',
    'region': 'pre-colonial Americas',
    'timeline': 'ANCIENT WORLD',
    'color': {
      'r': 255,
      'g': 217,
      'b': 47,
      'opacity': 1
    }
  },
  {
    'civilization': 'Peak of Aksum',
    'start': 300,
    'end': 650,
    'startLabel': '',
    'endLabel': '',
    'region': 'Sub-Saharan Africa',
    'timeline': 'MEDIEVAL WORLD',
    'color': {
      'r': 166,
      'g': 216,
      'b': 84,
      'opacity': 1
    }
  },
  {
    'civilization': 'Age of Turkic empires',
    'start': 500,
    'end': 1200,
    'startLabel': '',
    'endLabel': '',
    'region': 'Middle East',
    'timeline': 'MEDIEVAL WORLD',
    'color': {
      'r': 102,
      'g': 194,
      'b': 165,
      'opacity': 1
    }
  },
  {
    'civilization': 'Formative Japan (age of Yamato rule)',
    'start': 500,
    'end': 800,
    'startLabel': '',
    'endLabel': '',
    'region': 'East Asia',
    'timeline': 'MEDIEVAL WORLD',
    'color': {
      'r': 231,
      'g': 138,
      'b': 195,
      'opacity': 1
    }
  },
  {
    'civilization': 'Medieval Andean region',
    'start': 500,
    'end': 1530,
    'startLabel': '',
    'endLabel': '',
    'region': 'pre-colonial Americas',
    'timeline': 'MEDIEVAL WORLD',
    'color': {
      'r': 255,
      'g': 217,
      'b': 47,
      'opacity': 1
    }
  },
  {
    'civilization': 'Medieval China',
    'start': 500,
    'end': 1500,
    'startLabel': '',
    'endLabel': '',
    'region': 'East Asia',
    'timeline': 'MEDIEVAL WORLD',
    'color': {
      'r': 231,
      'g': 138,
      'b': 195,
      'opacity': 1
    }
  },
  {
    'civilization': 'Medieval Europe',
    'start': 500,
    'end': 1500,
    'startLabel': '',
    'endLabel': '',
    'region': 'Europe (and colonial offshoots)',
    'timeline': 'MEDIEVAL WORLD',
    'color': {
      'r': 141,
      'g': 160,
      'b': 203,
      'opacity': 1
    }
  },
  {
    'civilization': 'Age of pre-colonial civilization (Christian, Islamic, and traditional kingdoms)',
    'start': 650,
    'end': 1880,
    'startLabel': '',
    'endLabel': '',
    'region': 'Sub-Saharan Africa',
    'timeline': 'MEDIEVAL WORLD',
    'color': {
      'r': 166,
      'g': 216,
      'b': 84,
      'opacity': 1
    }
  },
  {
    'civilization': 'Age of united Caliphate',
    'start': 650,
    'end': 900,
    'startLabel': '',
    'endLabel': '',
    'region': 'Middle East',
    'timeline': 'MEDIEVAL WORLD',
    'color': {
      'r': 102,
      'g': 194,
      'b': 165,
      'opacity': 1
    }
  },
  {
    'civilization': 'Heian age',
    'start': 800,
    'end': 1200,
    'startLabel': '',
    'endLabel': '',
    'region': 'East Asia',
    'timeline': 'MEDIEVAL WORLD',
    'color': {
      'r': 231,
      'g': 138,
      'b': 195,
      'opacity': 1
    }
  },
  {
    'civilization': 'Fractured Islamic world',
    'start': 900,
    'end': 2018,
    'startLabel': '',
    'endLabel': 'present',
    'region': 'Middle East',
    'timeline': 'MODERN WORLD',
    'color': {
      'r': 102,
      'g': 194,
      'b': 165,
      'opacity': 1
    }
  },
  {
    'civilization': 'Postclassic age of Mesoamerica',
    'start': 900,
    'end': 1520,
    'startLabel': '',
    'endLabel': '',
    'region': 'pre-colonial Americas',
    'timeline': 'MEDIEVAL WORLD',
    'color': {
      'r': 255,
      'g': 217,
      'b': 47,
      'opacity': 1
    }
  },
  {
    'civilization': 'Early Islamic period',
    'start': 1200,
    'end': 1500,
    'startLabel': '',
    'endLabel': '',
    'region': 'South Asia',
    'timeline': 'MEDIEVAL WORLD',
    'color': {
      'r': 252,
      'g': 141,
      'b': 98,
      'opacity': 1
    }
  },
  {
    'civilization': 'Mongol Empire',
    'start': 1200,
    'end': 1300,
    'startLabel': '',
    'endLabel': '',
    'region': 'the Steppe',
    'timeline': 'MEDIEVAL WORLD',
    'color': {
      'r': 229,
      'g': 196,
      'b': 148,
      'opacity': 1
    }
  },
  {
    'civilization': 'Shogunate',
    'start': 1200,
    'end': 1870,
    'startLabel': '',
    'endLabel': '',
    'region': 'East Asia',
    'timeline': 'MEDIEVAL WORLD',
    'color': {
      'r': 231,
      'g': 138,
      'b': 195,
      'opacity': 1
    }
  },
  {
    'civilization': 'Colonial United States',
    'start': 1500,
    'end': 1776,
    'startLabel': '',
    'endLabel': '',
    'region': 'Europe (and colonial offshoots)',
    'timeline': 'MODERN WORLD',
    'color': {
      'r': 141,
      'g': 160,
      'b': 203,
      'opacity': 1
    }
  },
  {
    'civilization': 'Early modern China',
    'start': 1500,
    'end': 1918,
    'startLabel': '',
    'endLabel': 'WWI',
    'region': 'East Asia',
    'timeline': 'MODERN WORLD',
    'color': {
      'r': 231,
      'g': 138,
      'b': 195,
      'opacity': 1
    }
  },
  {
    'civilization': 'Early modern Europe',
    'start': 1500,
    'end': 1800,
    'startLabel': '',
    'endLabel': '',
    'region': 'Europe (and colonial offshoots)',
    'timeline': 'MODERN WORLD',
    'color': {
      'r': 141,
      'g': 160,
      'b': 203,
      'opacity': 1
    }
  },
  {
    'civilization': 'Mughal Empire',
    'start': 1500,
    'end': 1800,
    'startLabel': '',
    'endLabel': '',
    'region': 'South Asia',
    'timeline': 'MODERN WORLD',
    'color': {
      'r': 252,
      'g': 141,
      'b': 98,
      'opacity': 1
    }
  },
  {
    'civilization': 'Formative US',
    'start': 1776,
    'end': 1865,
    'startLabel': '',
    'endLabel': '',
    'region': 'Europe (and colonial offshoots)',
    'timeline': 'MODERN WORLD',
    'color': {
      'r': 141,
      'g': 160,
      'b': 203,
      'opacity': 1
    }
  },
  {
    'civilization': 'British India',
    'start': 1800,
    'end': 1945,
    'startLabel': '',
    'endLabel': 'WWII',
    'region': 'South Asia',
    'timeline': 'MODERN WORLD',
    'color': {
      'r': 252,
      'g': 141,
      'b': 98,
      'opacity': 1
    }
  },
  {
    'civilization': 'Modern Europe',
    'start': 1800,
    'end': 2018,
    'startLabel': '',
    'endLabel': 'present',
    'region': 'Europe (and colonial offshoots)',
    'timeline': 'MODERN WORLD',
    'color': {
      'r': 141,
      'g': 160,
      'b': 203,
      'opacity': 1
    }
  },
  {
    'civilization': 'Great power US',
    'start': 1865,
    'end': 1945,
    'startLabel': '',
    'endLabel': 'WWII',
    'region': 'Europe (and colonial offshoots)',
    'timeline': 'MODERN WORLD',
    'color': {
      'r': 141,
      'g': 160,
      'b': 203,
      'opacity': 1
    }
  },
  {
    'civilization': 'Imperial Japan',
    'start': 1870,
    'end': 1945,
    'startLabel': '',
    'endLabel': 'WWII',
    'region': 'East Asia',
    'timeline': 'MODERN WORLD',
    'color': {
      'r': 231,
      'g': 138,
      'b': 195,
      'opacity': 1
    }
  },
  {
    'civilization': 'Colonial Africa',
    'start': 1880,
    'end': 1980,
    'startLabel': '',
    'endLabel': '',
    'region': 'Sub-Saharan Africa',
    'timeline': 'MODERN WORLD',
    'color': {
      'r': 166,
      'g': 216,
      'b': 84,
      'opacity': 1
    }
  },
  {
    'civilization': 'Republic of China',
    'start': 1918,
    'end': 1945,
    'startLabel': '',
    'endLabel': '',
    'region': 'East Asia',
    'timeline': 'MODERN WORLD',
    'color': {
      'r': 231,
      'g': 138,
      'b': 195,
      'opacity': 1
    }
  },
  {
    'civilization': 'Modern India',
    'start': 1945,
    'end': 2018,
    'startLabel': '',
    'endLabel': 'present',
    'region': 'South Asia',
    'timeline': 'MODERN WORLD',
    'color': {
      'r': 252,
      'g': 141,
      'b': 98,
      'opacity': 1
    }
  },
  {
    'civilization': 'Modern Japan',
    'start': 1945,
    'end': 2018,
    'startLabel': '',
    'endLabel': 'present',
    'region': 'East Asia',
    'timeline': 'MODERN WORLD',
    'color': {
      'r': 231,
      'g': 138,
      'b': 195,
      'opacity': 1
    }
  },
  {
    'civilization': "People's Republic of China",
    'start': 1945,
    'end': 2018,
    'startLabel': 'WWII',
    'endLabel': 'present',
    'region': 'East Asia',
    'timeline': 'MODERN WORLD',
    'color': {
      'r': 231,
      'g': 138,
      'b': 195,
      'opacity': 1
    }
  },
  {
    'civilization': 'Superpower US',
    'start': 1945,
    'end': 2018,
    'startLabel': '',
    'endLabel': 'present',
    'region': 'Europe (and colonial offshoots)',
    'timeline': 'MODERN WORLD',
    'color': {
      'r': 141,
      'g': 160,
      'b': 203,
      'opacity': 1
    }
  },
  {
    'civilization': 'Modern Africa',
    'start': 1980,
    'end': 2018,
    'startLabel': 'WWII',
    'endLabel': 'present',
    'region': 'Sub-Saharan Africa',
    'timeline': 'MODERN WORLD',
    'color': {
      'r': 166,
      'g': 216,
      'b': 84,
      'opacity': 1
    }
  }
]
const data1 = [{ 'civilization': 'Mesopotamian civilization', 'start': -3500, 'end': -550, 'startLabel': '', 'endLabel': '', 'region': 'Middle East', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 102, 'g': 194, 'b': 165, 'opacity': 1 }}, { 'civilization': 'Egyptian civilization', 'start': -3000, 'end': -550, 'startLabel': '', 'endLabel': '', 'region': 'Middle East', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 102, 'g': 194, 'b': 165, 'opacity': 1 }}, { 'civilization': 'First Persian Empire', 'start': -550, 'end': -330, 'startLabel': '', 'endLabel': '', 'region': 'Middle East', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 102, 'g': 194, 'b': 165, 'opacity': 1 }}, { 'civilization': 'Inter-Persian period', 'start': -330, 'end': 200, 'startLabel': '', 'endLabel': '', 'region': 'Middle East', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 102, 'g': 194, 'b': 165, 'opacity': 1 }}, { 'civilization': 'Ptolemaic Egypt', 'start': -330, 'end': 0, 'startLabel': '', 'endLabel': '', 'region': 'Middle East', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 102, 'g': 194, 'b': 165, 'opacity': 1 }}, { 'civilization': 'Second Persian Empire', 'start': -200, 'end': 650, 'startLabel': '', 'endLabel': '', 'region': 'Middle East', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 102, 'g': 194, 'b': 165, 'opacity': 1 }}, { 'civilization': 'Roman > Byzantine Egypt', 'start': 0, 'end': 650, 'startLabel': '', 'endLabel': '', 'region': 'Middle East', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 102, 'g': 194, 'b': 165, 'opacity': 1 }}, { 'civilization': 'Age of Turkic empires', 'start': 500, 'end': 1200, 'startLabel': '', 'endLabel': '', 'region': 'Middle East', 'timeline': 'MEDIEVAL WORLD', 'color': { 'r': 102, 'g': 194, 'b': 165, 'opacity': 1 }}, { 'civilization': 'Age of united Caliphate', 'start': 650, 'end': 900, 'startLabel': '', 'endLabel': '', 'region': 'Middle East', 'timeline': 'MEDIEVAL WORLD', 'color': { 'r': 102, 'g': 194, 'b': 165, 'opacity': 1 }}, { 'civilization': 'Fractured Islamic world', 'start': 900, 'end': 2018, 'startLabel': '', 'endLabel': 'present', 'region': 'Middle East', 'timeline': 'MODERN WORLD', 'color': { 'r': 102, 'g': 194, 'b': 165, 'opacity': 1 }}, { 'civilization': 'Indus civilization', 'start': -2500, 'end': -1500, 'startLabel': '', 'endLabel': '', 'region': 'South Asia', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 252, 'g': 141, 'b': 98, 'opacity': 1 }}, { 'civilization': 'Vedic age', 'start': -1500, 'end': -500, 'startLabel': '', 'endLabel': '', 'region': 'South Asia', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 252, 'g': 141, 'b': 98, 'opacity': 1 }}, { 'civilization': 'Indian kingdom age', 'start': -500, 'end': 1200, 'startLabel': '', 'endLabel': '', 'region': 'South Asia', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 252, 'g': 141, 'b': 98, 'opacity': 1 }}, { 'civilization': 'Early Islamic period', 'start': 1200, 'end': 1500, 'startLabel': '', 'endLabel': '', 'region': 'South Asia', 'timeline': 'MEDIEVAL WORLD', 'color': { 'r': 252, 'g': 141, 'b': 98, 'opacity': 1 }}, { 'civilization': 'Mughal Empire', 'start': 1500, 'end': 1800, 'startLabel': '', 'endLabel': '', 'region': 'South Asia', 'timeline': 'MODERN WORLD', 'color': { 'r': 252, 'g': 141, 'b': 98, 'opacity': 1 }}, { 'civilization': 'British India', 'start': 1800, 'end': 1945, 'startLabel': '', 'endLabel': 'WWII', 'region': 'South Asia', 'timeline': 'MODERN WORLD', 'color': { 'r': 252, 'g': 141, 'b': 98, 'opacity': 1 }}, { 'civilization': 'Modern India', 'start': 1945, 'end': 2018, 'startLabel': '', 'endLabel': 'present', 'region': 'South Asia', 'timeline': 'MODERN WORLD', 'color': { 'r': 252, 'g': 141, 'b': 98, 'opacity': 1 }}, { 'civilization': 'Aegean civilization', 'start': -2000, 'end': -1200, 'startLabel': '', 'endLabel': '', 'region': 'Europe (and colonial offshoots)', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 141, 'g': 160, 'b': 203, 'opacity': 1 }}, { 'civilization': 'Greek age', 'start': -1200, 'end': 0, 'startLabel': '', 'endLabel': '', 'region': 'Europe (and colonial offshoots)', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 141, 'g': 160, 'b': 203, 'opacity': 1 }}, { 'civilization': 'Roman Republic', 'start': -500, 'end': 0, 'startLabel': '', 'endLabel': '', 'region': 'Europe (and colonial offshoots)', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 141, 'g': 160, 'b': 203, 'opacity': 1 }}, { 'civilization': 'Roman Empire', 'start': 0, 'end': 500, 'startLabel': '', 'endLabel': '', 'region': 'Europe (and colonial offshoots)', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 141, 'g': 160, 'b': 203, 'opacity': 1 }}, { 'civilization': 'Medieval Europe', 'start': 500, 'end': 1500, 'startLabel': '', 'endLabel': '', 'region': 'Europe (and colonial offshoots)', 'timeline': 'MEDIEVAL WORLD', 'color': { 'r': 141, 'g': 160, 'b': 203, 'opacity': 1 }}, { 'civilization': 'Colonial United States', 'start': 1500, 'end': 1776, 'startLabel': '', 'endLabel': '', 'region': 'Europe (and colonial offshoots)', 'timeline': 'MODERN WORLD', 'color': { 'r': 141, 'g': 160, 'b': 203, 'opacity': 1 }}, { 'civilization': 'Early modern Europe', 'start': 1500, 'end': 1800, 'startLabel': '', 'endLabel': '', 'region': 'Europe (and colonial offshoots)', 'timeline': 'MODERN WORLD', 'color': { 'r': 141, 'g': 160, 'b': 203, 'opacity': 1 }}, { 'civilization': 'Formative US', 'start': 1776, 'end': 1865, 'startLabel': '', 'endLabel': '', 'region': 'Europe (and colonial offshoots)', 'timeline': 'MODERN WORLD', 'color': { 'r': 141, 'g': 160, 'b': 203, 'opacity': 1 }}, { 'civilization': 'Modern Europe', 'start': 1800, 'end': 2018, 'startLabel': '', 'endLabel': 'present', 'region': 'Europe (and colonial offshoots)', 'timeline': 'MODERN WORLD', 'color': { 'r': 141, 'g': 160, 'b': 203, 'opacity': 1 }}, { 'civilization': 'Great power US', 'start': 1865, 'end': 1945, 'startLabel': '', 'endLabel': 'WWII', 'region': 'Europe (and colonial offshoots)', 'timeline': 'MODERN WORLD', 'color': { 'r': 141, 'g': 160, 'b': 203, 'opacity': 1 }}, { 'civilization': 'Superpower US', 'start': 1945, 'end': 2018, 'startLabel': '', 'endLabel': 'present', 'region': 'Europe (and colonial offshoots)', 'timeline': 'MODERN WORLD', 'color': { 'r': 141, 'g': 160, 'b': 203, 'opacity': 1 }}, { 'civilization': 'Ancient China', 'start': -2000, 'end': 500, 'startLabel': '', 'endLabel': '', 'region': 'East Asia', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 231, 'g': 138, 'b': 195, 'opacity': 1 }}, { 'civilization': 'Formative Japan (age of Yamato rule)', 'start': 500, 'end': 800, 'startLabel': '', 'endLabel': '', 'region': 'East Asia', 'timeline': 'MEDIEVAL WORLD', 'color': { 'r': 231, 'g': 138, 'b': 195, 'opacity': 1 }}, { 'civilization': 'Medieval China', 'start': 500, 'end': 1500, 'startLabel': '', 'endLabel': '', 'region': 'East Asia', 'timeline': 'MEDIEVAL WORLD', 'color': { 'r': 231, 'g': 138, 'b': 195, 'opacity': 1 }}, { 'civilization': 'Heian age', 'start': 800, 'end': 1200, 'startLabel': '', 'endLabel': '', 'region': 'East Asia', 'timeline': 'MEDIEVAL WORLD', 'color': { 'r': 231, 'g': 138, 'b': 195, 'opacity': 1 }}, { 'civilization': 'Shogunate', 'start': 1200, 'end': 1870, 'startLabel': '', 'endLabel': '', 'region': 'East Asia', 'timeline': 'MEDIEVAL WORLD', 'color': { 'r': 231, 'g': 138, 'b': 195, 'opacity': 1 }}, { 'civilization': 'Early modern China', 'start': 1500, 'end': 1918, 'startLabel': '', 'endLabel': 'WWI', 'region': 'East Asia', 'timeline': 'MODERN WORLD', 'color': { 'r': 231, 'g': 138, 'b': 195, 'opacity': 1 }}, { 'civilization': 'Imperial Japan', 'start': 1870, 'end': 1945, 'startLabel': '', 'endLabel': 'WWII', 'region': 'East Asia', 'timeline': 'MODERN WORLD', 'color': { 'r': 231, 'g': 138, 'b': 195, 'opacity': 1 }}, { 'civilization': 'Republic of China', 'start': 1918, 'end': 1945, 'startLabel': '', 'endLabel': '', 'region': 'East Asia', 'timeline': 'MODERN WORLD', 'color': { 'r': 231, 'g': 138, 'b': 195, 'opacity': 1 }}, { 'civilization': 'Modern Japan', 'start': 1945, 'end': 2018, 'startLabel': '', 'endLabel': 'present', 'region': 'East Asia', 'timeline': 'MODERN WORLD', 'color': { 'r': 231, 'g': 138, 'b': 195, 'opacity': 1 }}, { 'civilization': "People's Republic of China", 'start': 1945, 'end': 2018, 'startLabel': 'WWII', 'endLabel': 'present', 'region': 'East Asia', 'timeline': 'MODERN WORLD', 'color': { 'r': 231, 'g': 138, 'b': 195, 'opacity': 1 }}, { 'civilization': 'Early Nubian civilization', 'start': -2000, 'end': -1000, 'startLabel': '', 'endLabel': '', 'region': 'Sub-Saharan Africa', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 166, 'g': 216, 'b': 84, 'opacity': 1 }}, { 'civilization': 'Kush', 'start': -1000, 'end': 300, 'startLabel': '', 'endLabel': '', 'region': 'Sub-Saharan Africa', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 166, 'g': 216, 'b': 84, 'opacity': 1 }}, { 'civilization': 'Peak of Aksum', 'start': 300, 'end': 650, 'startLabel': '', 'endLabel': '', 'region': 'Sub-Saharan Africa', 'timeline': 'MEDIEVAL WORLD', 'color': { 'r': 166, 'g': 216, 'b': 84, 'opacity': 1 }}, { 'civilization': 'Age of pre-colonial civilization (Christian, Islamic, and traditional kingdoms)', 'start': 650, 'end': 1880, 'startLabel': '', 'endLabel': '', 'region': 'Sub-Saharan Africa', 'timeline': 'MEDIEVAL WORLD', 'color': { 'r': 166, 'g': 216, 'b': 84, 'opacity': 1 }}, { 'civilization': 'Colonial Africa', 'start': 1880, 'end': 1980, 'startLabel': '', 'endLabel': '', 'region': 'Sub-Saharan Africa', 'timeline': 'MODERN WORLD', 'color': { 'r': 166, 'g': 216, 'b': 84, 'opacity': 1 }}, { 'civilization': 'Modern Africa', 'start': 1980, 'end': 2018, 'startLabel': 'WWII', 'endLabel': 'present', 'region': 'Sub-Saharan Africa', 'timeline': 'MODERN WORLD', 'color': { 'r': 166, 'g': 216, 'b': 84, 'opacity': 1 }}, { 'civilization': 'Formative age of Mesoamerica', 'start': -1500, 'end': 100, 'startLabel': '', 'endLabel': '', 'region': 'pre-colonial Americas', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 255, 'g': 217, 'b': 47, 'opacity': 1 }}, { 'civilization': 'Ancient Andean region', 'start': -1000, 'end': 500, 'startLabel': '', 'endLabel': '', 'region': 'pre-colonial Americas', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 255, 'g': 217, 'b': 47, 'opacity': 1 }}, { 'civilization': 'Classic age of Mesoamerica', 'start': 100, 'end': 900, 'startLabel': '', 'endLabel': '', 'region': 'pre-colonial Americas', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 255, 'g': 217, 'b': 47, 'opacity': 1 }}, { 'civilization': 'Medieval Andean region', 'start': 500, 'end': 1530, 'startLabel': '', 'endLabel': '', 'region': 'pre-colonial Americas', 'timeline': 'MEDIEVAL WORLD', 'color': { 'r': 255, 'g': 217, 'b': 47, 'opacity': 1 }}, { 'civilization': 'Postclassic age of Mesoamerica', 'start': 900, 'end': 1520, 'startLabel': '', 'endLabel': '', 'region': 'pre-colonial Americas', 'timeline': 'MEDIEVAL WORLD', 'color': { 'r': 255, 'g': 217, 'b': 47, 'opacity': 1 }}, { 'civilization': 'Ancient Steppe empires', 'start': -1000, 'end': 500, 'startLabel': '', 'endLabel': '', 'region': 'the Steppe', 'timeline': 'ANCIENT WORLD', 'color': { 'r': 229, 'g': 196, 'b': 148, 'opacity': 1 }}, { 'civilization': 'Mongol Empire', 'start': 1200, 'end': 1300, 'startLabel': '', 'endLabel': '', 'region': 'the Steppe', 'timeline': 'MEDIEVAL WORLD', 'color': { 'r': 229, 'g': 196, 'b': 148, 'opacity': 1 }}]

export default {
  name: 'WorldHistoryTimelineBar',

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    // 数据结构
    //       {
    //     'civilization': 'Mesopotamian civilization',
    //     'start': -3500,
    //     'end': -550,
    //     'startLabel': '',
    //     'endLabel': '',
    //     'region': 'Middle East',
    //     'timeline': 'ANCIENT WORLD',
    //     'color': {
    //       'r': 102,
    //       'g': 194,
    //       'b': 165,
    //       'opacity': 1
    //     }
    //   }
    init() {
      const svg = d3.select('#WorldHistoryTimelineBar').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])

      const x = d3.scaleLinear() // x函数
        .domain([d3.min(data, d => d.start), d3.max(data, d => d.end)])
        .range([0, width - margin.left - margin.right])

      const y = d3.scaleBand() // y函数
        .domain(d3.range(data.length))
        .range([0, height - margin.bottom - margin.top])
        .padding(0.2)

      const axisTop = d3.axisTop(x)
        .tickPadding(2)
        .tickFormat(d => d < 0 ? `${-d}BC` : `${d}AD`)

      const axisBottom = d3.axisBottom(x)
        .tickPadding(2)
        .tickFormat(d => d < 0 ? `${-d}BC` : `${d}AD`)

      svg
        .append('g')
        .attr('transform', (d, i) => `translate(${margin.left} ${margin.top - 10})`)
        .call(axisTop)

      svg
        .append('g')
        .attr('transform', (d, i) => `translate(${margin.left} ${height - margin.bottom})`)
        .call(axisBottom)

      const g = svg.append('g').attr('transform', (d, i) => `translate(${margin.left} ${margin.top})`)

      const line = svg.append('line')
        .attr('y1', margin.top - 10)
        .attr('y2', height - margin.bottom)
        .attr('stroke', 'rgba(0,0,0,0.2)')
        .style('pointer-events', 'none')

      const getRect = function(d) {
        // d 每一个data 数据项
        const el = d3.select(this) // 每一个bar 的g
        const sx = x(d.start)
        const w = x(d.end) - x(d.start)
        const isLabelRight = (sx > width / 2 ? sx + w < width : sx - w > 0)

        el.style('cursor', 'pointer')
        el
          .append('rect')
          .attr('x', sx)
          .attr('height', y.bandwidth())
          .attr('width', w)
          .attr('fill', `rgba(${d.color.r},${d.color.g},${d.color.b},${d.color.opacity}`)

        el
          .append('text')
          .text(d.civilization)
          .attr('x', isLabelRight ? sx - 5 : sx + w + 5)
          .attr('y', 2.5)
          .attr('fill', 'black')
          .style('text-anchor', isLabelRight ? 'end' : 'start')
          .style('dominant-baseline', 'hanging')
      }

      const formatDate = d => d < 0 ? `${-d}BC` : `${d}AD`
      const createTooltip = function(el) {
        el
          .style('position', 'absolute')
          .style('pointer-events', 'none')
          .style('top', 0)
          .style('opacity', 0)
          .style('background', 'white')
          .style('border-radius', '5px')
          .style('box-shadow', '0 0 10px rgba(0,0,0,.25)')
          .style('padding', '10px')
          .style('line-height', '1.3')
          .style('font', '11px sans-serif')
      }
      const tooltip = d3.select('#tips').call(createTooltip)
      const getTooltipContent = function(d) {
        return `<b>${d.civilization}</b>
            <br/>
            <b style="color:#ddd">${d.region}</b>
            <br/>
            ${formatDate(d.start)} - ${formatDate(d.end)}
            `
      }

      const groups = g
        .selectAll('g')
        .data(data)
        .join('g') // 效果等于 .enter().append('g')
        .attr('class', 'civ')

      groups.attr('transform', (d, i) => `translate(0 ${y(i)})`)

      groups
        .each(getRect) // each
        .on('mouseover', function(d) {
        //   d3.select(this).select('rect').attr('fill', 'blue')

          tooltip
            .style('opacity', 1)
            .html(getTooltipContent(d))
        })
        .on('mouseleave', function(d) {
          tooltip.style('opacity', 0)
        })

      svg.on('mousemove', function(d) {
        const [x, y] = [d.x, d.y]
        line.attr('transform', `translate(${x} 0)`)
        tooltip
          .style('left', x + 'px')
          .style('top', y + 'px')
      })
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
