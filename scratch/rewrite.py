import re

DATA_TS_PATH = 'e:/aquacare-website/lib/site/data.ts'

# Dictionary mapping exact product names to their new high-quality features array
NEW_DESCRIPTIONS = {
    '250 LPH Plant': [
        "Heavy-duty 250 Liters Per Hour commercial purification capacity.",
        "Ideal for schools, restaurants, and mid-sized office complexes.",
        "Equipped with commercial-grade high-pressure pumps for continuous operation.",
        "Effectively treats high-TDS groundwater and municipal supplies."
    ],
    '500 LPH Plant': [
        "Massive 500 Liters Per Hour output for large-scale institutional use.",
        "Perfect for hospitals, large corporate buildings, and manufacturing units.",
        "Features automated flushing and industrial-grade RO membranes.",
        "Built-in TDS controller ensures consistent output quality across variable water sources."
    ],
    'Kent Crystal Alkaline': [
        "Advanced Alkaline technology balances pH levels up to 8.5+.",
        "Enhances water with essential minerals for boosted immunity.",
        "Multi-stage RO+UV+UF+TDS Control purification process.",
        "Zero Water Wastage technology saves every drop of rejected water."
    ],
    'Prolife Accent Alkaline': [
        "Affordable entry into premium alkaline water consumption.",
        "Sleek, modern aesthetic designed for modular kitchen mounting.",
        "Multi-stage filtration ensures 100% safe drinking water from any source.",
        "Includes smart LED indicators for tank full and purification status."
    ],
    'Prolife Asta': [
        "Comprehensive RO+UV+UF purification for absolute safety.",
        "Highly effective against heavy metals found in borewell water.",
        "Compact space-saving design with a robust ABS food-grade plastic body.",
        "High purification capacity handles peak family hydration needs effortlessly."
    ],
    'Prolife Neon': [
        "Striking neon-accented design elevates your kitchen decor.",
        "Features a transparent water level indicator for easy monitoring.",
        "Advanced membrane technology removes dissolved impurities like arsenic and fluoride.",
        "Auto-on and auto-off functionality for hands-free convenience."
    ],
    'Prolife Fiesta Full Black': [
        "Sophisticated all-black matte finish for premium dark-themed kitchens.",
        "Engineered specifically to treat hard water up to 2000 ppm TDS.",
        "Multi-stage purification leaves water tasting crisp and sweet.",
        "Large storage tank ensures water availability during power cuts."
    ],
    'Prolife Fiesta White': [
        "Classic, pristine white exterior that blends into any home environment.",
        "Easy-to-clean surface requires minimal exterior maintenance.",
        "Utilizes copper-impregnated filters for natural antimicrobial properties.",
        "Ensures long-lasting membrane life with pre-filtration staging."
    ],
    'Prolife Fiesta Black Transparent': [
        "Modern transparent fascia allows you to see the purification in action.",
        "Combines the sleekness of black with high-tech visual appeal.",
        "Powerful UV sterilization stage eliminates 99.9% of bacteria and viruses.",
        "Designed for quick, hassle-free filter replacements."
    ],
    'Desire Plus': [
        "Premium water dispenser offering instant hot, cold, and normal water.",
        "Perfect hydration station for office breakrooms and waiting areas.",
        "Child-lock feature on the hot water faucet ensures absolute safety.",
        "Energy-efficient compressor cooling operates silently in the background."
    ],
    'Reflection Plus': [
        "Dual-purpose system combining high-end purification with instant temperature control.",
        "Elegant reflective glass-like finish makes it a centerpiece.",
        "Eco-mode ensures lower electricity consumption during night hours.",
        "Provides boiling water for tea/coffee and chilled water for summer days."
    ],
    'Rhino': [
        "Rugged, highly durable build designed for tough rural environments.",
        "Extra-large storage capacity minimizes dependence on electricity.",
        "Heavy-duty sediment and carbon blocks tackle highly turbid water.",
        "Built to last with minimal servicing required over its lifespan."
    ],
    'Rhino Plus': [
        "Upgraded Rhino model featuring additional UV and UF sterilization.",
        "Provides industrial-level durability with commercial-level water safety.",
        "Ideal for large joint families or areas with unpredictable water quality.",
        "Maintains natural mineral balance while eliminating harmful pathogens."
    ]
}

with open(DATA_TS_PATH, 'r', encoding='utf-8') as f:
    data_ts = f.read()

updated_count = 0

def replace_features(match):
    global updated_count
    full_match = match.group(0)
    name = match.group(1)
    
    if name in NEW_DESCRIPTIONS:
        # Generate new features array string
        features = NEW_DESCRIPTIONS[name]
        features_str = ",\n    ".join([f'"{f}"' for f in features])
        new_features = f'features: [\n    {features_str}\n  ]'
        
        # Replace the old features array using regex
        # The old features array looks like: features: ["Premium quality", "Reliable performance"],
        updated_block = re.sub(r'features:\s*\[.*?\]', new_features, full_match, flags=re.DOTALL)
        updated_count += 1
        return updated_block
        
    return full_match

# Find each product block and pass to the replacer
products_array_match = re.search(r'(export const PRODUCTS.*?=\s*\[)(.*?)(\n\];)', data_ts, re.DOTALL)
if products_array_match:
    prefix = products_array_match.group(1)
    products_content = products_array_match.group(2)
    suffix = products_array_match.group(3)
    
    # Process each block
    updated_products_content = re.sub(r'{\s*name:\s*"([^"]+)".*?(?=},|})', replace_features, products_content, flags=re.DOTALL)
    
    new_data_ts = data_ts[:products_array_match.start(2)] + updated_products_content + data_ts[products_array_match.end(2):]
    
    with open(DATA_TS_PATH, 'w', encoding='utf-8') as f:
        f.write(new_data_ts)
        
    print(f"Successfully updated descriptions for {updated_count} products.")
else:
    print("Could not find PRODUCTS array.")
