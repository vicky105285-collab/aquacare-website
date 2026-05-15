import urllib.request
import urllib.parse
from bs4 import BeautifulSoup
import json

base_url = "https://www.aquacaresystems.in/"
pages = ["index.html", "ros.html", "products.html"]

all_products = []

for page in pages:
    url = urllib.parse.urljoin(base_url, page)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            html = response.read()
    except:
        continue
    
    soup = BeautifulSoup(html, 'html.parser')
    
    for product_div in soup.select('.div-img-p'):
        name_tag = product_div.find(['h3', 'h4', 'h5', 'h6'])
        name = name_tag.text.strip() if name_tag else "Unknown"
        
        img_tag = product_div.find('img')
        img_url = urllib.parse.urljoin(base_url, img_tag['src']) if img_tag and 'src' in img_tag.attrs else ""
        
        price_tag = product_div.find('p')
        price = price_tag.text.strip() if price_tag else ""
        
        modal_btn = product_div.find('a', class_='view_details')
        modal_id = modal_btn['data-target'].replace('#', '') if modal_btn and 'data-target' in modal_btn.attrs else ""
        
        description = []
        specifications = []
        
        if modal_id:
            modal = soup.find(id=modal_id)
            if modal:
                uls = modal.find_all('ul')
                if len(uls) > 0:
                    description = [li.text.strip() for li in uls[0].find_all('li')]
                if len(uls) > 1:
                    specifications = [li.text.strip() for li in uls[1].find_all('li')]
        
        # Try to find category by looking at the closest previous heading or section id
        # Alternatively, we can find the closest .tab-pane and get its id
        tab_pane = product_div.find_parent(class_='tab-pane')
        category = tab_pane['id'] if tab_pane and 'id' in tab_pane.attrs else "General"
        
        # Another heuristic for category
        if category == "General":
            h2 = product_div.find_previous(['h1', 'h2', 'h3'])
            if h2:
                category = h2.text.strip()
        
        all_products.append({
            "name": name,
            "category": category,
            "description": description,
            "specifications": specifications,
            "image_url": img_url,
            "price": price
        })

print(json.dumps(all_products, indent=2))
