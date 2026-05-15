import re
import os

DATA_TS_PATH = 'e:/aquacare-website/lib/site/data.ts'
PRODUCTS_DIR = 'e:/aquacare-website/public/products'

# Map lowercase filename (no ext) -> actual .webp filename
existing_webp = {}
for f in os.listdir(PRODUCTS_DIR):
    if f.lower().endswith('.webp'):
        stem = os.path.splitext(f.lower())[0]
        existing_webp[stem] = f  # keep original casing

with open(DATA_TS_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

fixed_count = 0
not_found = []

def fix_img(match):
    global fixed_count
    path = match.group(1)  # e.g. /products/aqua_shark.jpeg
    filename = path.replace('/products/', '')
    stem = os.path.splitext(filename.lower())[0]
    
    if stem in existing_webp:
        new_path = f'/products/{existing_webp[stem]}'
        if new_path != path:
            fixed_count += 1
        return f'img: "{new_path}"'
    else:
        not_found.append(path)
        return match.group(0)  # unchanged

new_content = re.sub(r'img:\s*"(/products/[^"]+)"', fix_img, content)

with open(DATA_TS_PATH, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Fixed: {fixed_count} image paths updated to .webp")
print(f"Could not resolve: {len(not_found)}")
for p in not_found:
    print(f"  UNRESOLVED: {p}")
