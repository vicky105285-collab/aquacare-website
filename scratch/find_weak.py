import re

DATA_TS_PATH = 'e:/aquacare-website/lib/site/data.ts'

with open(DATA_TS_PATH, 'r', encoding='utf-8') as f:
    data_ts = f.read()

products_array_match = re.search(r'(export const PRODUCTS.*?=\s*\[)(.*?)(\n\];)', data_ts, re.DOTALL)
if products_array_match:
    products_content = products_array_match.group(2)
    # Split by '},'
    items = products_content.split('},')
    weak_names = []
    for item in items:
        if 'Premium quality' in item:
            name_match = re.search(r'name:\s*"(.*?)"', item)
            if name_match:
                weak_names.append(name_match.group(1))
    print(weak_names)
