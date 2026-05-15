import re

DATA_TS_PATH = 'e:/aquacare-website/lib/site/data.ts'
PRODUCTS_DIR = 'e:/aquacare-website/public/products'

import os

# Get all actual webp files
existing_files = set(f.lower() for f in os.listdir(PRODUCTS_DIR))

with open(DATA_TS_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all img paths
imgs = re.findall(r'img:\s*"(/products/[^"]+)"', content)

broken = []
for img in imgs:
    filename = img.replace('/products/', '').lower()
    if filename not in existing_files:
        broken.append(img)

print(f"Total images referenced: {len(imgs)}")
print(f"Broken (file not found): {len(broken)}")
for b in broken[:30]:
    print(f"  MISSING: {b}")
