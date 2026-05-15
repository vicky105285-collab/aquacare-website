"""
Enrich product details in data.ts based on scraped old-site data.
Rules from old site:
- Standard domestic RO (AQUA CARE brand, "Standard" specs):
    liters: "12L/Hr"
    stages: "5 Stage"
    tank: "Wall Mount"
    features: improved standard set

- Conway dispensers: exact specs from scrape
- Commercial RO plants: exact specs from scrape
"""
import re

DATA_TS_PATH = 'e:/aquacare-website/lib/site/data.ts'

with open(DATA_TS_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# ── 1. Fix "Standard" liters → "12L/Hr" for AQUA CARE domestic ROs ──────────
content = re.sub(
    r'(brand:\s*"AQUA CARE".*?liters:\s*)"Standard"',
    r'\1"12L/Hr"',
    content,
    flags=re.DOTALL
)

# ── 2. Fix "RO" stages → "5 Stage" ──────────────────────────────────────────
content = re.sub(
    r'(brand:\s*"AQUA CARE".*?stages:\s*)"RO"',
    r'\1"5 Stage"',
    content,
    flags=re.DOTALL
)

# ── 3. Fix "Standard Tank" → "Wall Mount" for wall-mount ROs ────────────────
content = re.sub(
    r'(brand:\s*"AQUA CARE".*?tank:\s*)"Standard Tank"',
    r'\1"Wall Mount"',
    content,
    flags=re.DOTALL
)

# ── 4. Enrich features for AQUA CARE domestic ROs that have generic 3-item list ──
# Old site standard features (from scrape):
# "RO membrane purification removes up to 2000 TDS"
# "12 litres per hour flow rate"
# "Auto shut-off when tank is full"
# "Food grade ABS plastic body"
# "Input voltage: 150V–270V AC"
OLD_STANDARD_FEATURES = '["RO membrane purification, handles up to 2000 TDS", "12 litres/hr output, fills 10L in ~1 hour", "Auto shut-off when tank is full", "Food grade ABS plastic body", "Input: 150V–270V AC, booster pump included"]'

OLD_GENERIC = '["Water Purifier With Out Storage", "Per Hour Flow 12 Ltrs", "Per Day Consumption: 30-60 Ltrs"]'
content = content.replace(OLD_GENERIC, OLD_STANDARD_FEATURES)

# ── 5. Conway Dispenser specs from scrape ────────────────────────────────────
CONWAY_IMPROVEMENTS = {
    "D50 N": {
        "price": "₹27,600",
        "liters": "22L Normal",
        "stages": "Normal",
        "tank": "22L",
        "features": '["22L normal water capacity", "Compact counter-top design", "BPA-free food grade tank", "Easy tap dispensing for offices & homes"]'
    },
    "D75 NC": {
        "price": "₹53,300",
        "liters": "14L+14L",
        "stages": "Normal+Cold",
        "tank": "28L Total",
        "features": '["14L normal + 14L cold water tanks", "Fast cooling compressor technology", "Child safety lock on cold tap", "Energy-efficient operation"]'
    },
    "D100 NC": {
        "price": "₹59,000",
        "liters": "20L+20L",
        "stages": "Normal+Cold",
        "tank": "40L Total",
        "features": '["20L normal + 20L cold capacity", "High-output cold water for large offices", "Stainless steel inner tank", "Stable floor-standing chassis"]'
    },
    "D75 NHC": {
        "price": "₹57,500",
        "liters": "14L+3L+14L",
        "stages": "Hot+Cold",
        "tank": "31L Total",
        "features": '["14L normal, 3L hot, 14L cold tanks", "Hot water for instant tea/coffee", "Safety hot-water child lock", "Dual cooling & heating system"]'
    },
    "D125 NHC": {
        "price": "₹79,500",
        "liters": "30L+5L+40L",
        "stages": "Hot+Cold",
        "tank": "75L Total",
        "features": '["30L normal, 5L hot, 40L cold capacity", "High-volume dispenser for institutions", "Rapid re-heat under 15 minutes", "Rugged steel frame with ABS panels"]'
    },
    "D250 NHC": {
        "price": "₹86,700",
        "liters": "30L+5L+40L",
        "stages": "Hot+Cold",
        "tank": "75L Total",
        "features": '["Large-scale 75L total capacity dispenser", "Heavy-duty commercial-grade build", "3 temperature outputs: Normal, Hot, Cold", "Ideal for factories, hospitals, canteens"]'
    },
}

for name, specs in CONWAY_IMPROVEMENTS.items():
    # Match block for this product name
    pattern = rf'(name:\s*"{re.escape(name)}".*?features:\s*)\[.*?\]'
    replacement = rf'\g<1>{specs["features"]}'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    # Update price
    pattern_p = rf'(name:\s*"{re.escape(name)}".*?price:\s*)"[^"]*"'
    content = re.sub(pattern_p, rf'\g<1>"{specs["price"]}"', content, flags=re.DOTALL)
    
    # Update liters
    pattern_l = rf'(name:\s*"{re.escape(name)}".*?liters:\s*)"[^"]*"'
    content = re.sub(pattern_l, rf'\g<1>"{specs["liters"]}"', content, flags=re.DOTALL)
    
    # Update stages
    pattern_s = rf'(name:\s*"{re.escape(name)}".*?stages:\s*)"[^"]*"'
    content = re.sub(pattern_s, rf'\g<1>"{specs["stages"]}"', content, flags=re.DOTALL)
    
    # Update tank
    pattern_t = rf'(name:\s*"{re.escape(name)}".*?tank:\s*)"[^"]*"'
    content = re.sub(pattern_t, rf'\g<1>"{specs["tank"]}"', content, flags=re.DOTALL)

print("Conway updates done")

with open(DATA_TS_PATH, 'w', encoding='utf-8') as f:
    f.write(content)

# Count fixes
std_count = content.count('12 litres/hr output, fills 10L in ~1 hour')
print(f"Standard domestic RO features enriched: {std_count} products")
print("All enrichment complete!")
