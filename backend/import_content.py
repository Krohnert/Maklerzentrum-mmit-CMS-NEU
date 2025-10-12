#!/usr/bin/env python3
"""
Content Import Script for CMS
Extracts FAQs and Modules from schulung.html.backup and imports them into MongoDB
"""
import requests
import json
import os
import re
from bs4 import BeautifulSoup

# Configuration
API_BASE = os.environ.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')
ADMIN_EMAIL = 'fk@comrocket.de'
ADMIN_PASSWORD = 'Com_2024!'
LOCALE = 'de-CH'

# Session for maintaining cookies
session = requests.Session()

def login():
    """Login to CMS and get session cookie"""
    print(f"🔐 Logging in as {ADMIN_EMAIL}...")
    response = session.post(
        f"{API_BASE}/api/admin/login",
        json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD,
            "remember_me": False
        }
    )
    
    if response.status_code == 200 and response.json().get('success'):
        print("✅ Login successful")
        return True
    else:
        print(f"❌ Login failed: {response.text}")
        return False

def extract_faqs_from_backup():
    """Extract FAQs from schulung.html.backup"""
    print("\n📄 Extracting FAQs from schulung.html.backup...")
    
    backup_file = '/app/frontend/public/schulung.html.backup'
    
    with open(backup_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    soup = BeautifulSoup(html_content, 'html.parser')
    faq_items = soup.find_all('div', class_='faq-item')
    
    faqs = []
    for idx, item in enumerate(faq_items, 1):
        trigger = item.find('button', class_='faq-trigger')
        content = item.find('div', class_='faq-content')
        
        if trigger and content:
            question = trigger.find('span').get_text(strip=True)
            # Get the inner div content
            answer_div = content.find('div', class_='p-4')
            if answer_div:
                # Convert to HTML string, preserving <br> tags
                answer = str(answer_div).replace('<div class="p-4 pt-0 text-gray-600">', '').replace('</div>', '')
                answer = answer.strip()
                # Convert <br> to <br/>
                answer = answer.replace('<br>', '<br/>')
                
                faqs.append({
                    'question': question,
                    'answer': answer,
                    'topic': 'allgemein',
                    'featured': idx <= 5,  # First 5 are featured
                    'order': idx,
                    'visible': True
                })
    
    print(f"✅ Extracted {len(faqs)} FAQs")
    return faqs

def get_modules():
    """Define the 4 main modules"""
    modules = [
        {
            'slug': 'generelle-faehigkeiten',
            'title': 'Generelle Fähigkeiten',
            'format': 'online',
            'durationDays': 4,
            'bullets': [
                'Grundlagen der Versicherungsvermittlung',
                'Rechtsvorschriften und Compliance',
                'Kommunikation und Beratung',
                'Online via Microsoft Teams'
            ],
            'order': 1,
            'visible': True
        },
        {
            'slug': 'krankenzusatzversicherung',
            'title': 'Krankenzusatzversicherung',
            'format': 'online',
            'durationDays': 2,
            'bullets': [
                'Krankenversicherungssystem Schweiz',
                'Zusatzversicherungen und Deckungen',
                'Bedarfsanalyse und Beratung',
                'Online via Microsoft Teams'
            ],
            'order': 2,
            'visible': True
        },
        {
            'slug': 'nichtleben',
            'title': 'Nichtleben (Sach- und Haftpflichtversicherung)',
            'format': 'praesenz',
            'durationDays': 3,
            'bullets': [
                'Sachversicherungen (Haushalt, Gebäude)',
                'Haftpflichtversicherungen',
                'Fallstudien und Praxisbeispiele',
                'Präsenz in Basel, Bern, Zürich, Lausanne, Lugano'
            ],
            'order': 3,
            'visible': True
        },
        {
            'slug': 'leben',
            'title': 'Leben (Lebensversicherung)',
            'format': 'praesenz',
            'durationDays': 4,
            'bullets': [
                'Lebensversicherungen und Vorsorge',
                '3-Säulen-System Schweiz',
                'Vorbereitung auf mündliche Prüfung',
                'Präsenz in Basel, Bern, Zürich, Lausanne, Lugano'
            ],
            'order': 4,
            'visible': True
        }
    ]
    
    return modules

def import_faqs(faqs):
    """Import FAQs via API"""
    print(f"\n📥 Importing {len(faqs)} FAQs...")
    
    success_count = 0
    for faq in faqs:
        response = session.post(
            f"{API_BASE}/api/admin/content/{LOCALE}/faq",
            json=faq
        )
        
        if response.status_code == 200 and response.json().get('success'):
            success_count += 1
            print(f"  ✓ FAQ {faq['order']}: {faq['question'][:50]}...")
        else:
            print(f"  ✗ Failed to import FAQ {faq['order']}: {response.text}")
    
    print(f"✅ Imported {success_count}/{len(faqs)} FAQs successfully")
    return success_count

def import_modules(modules):
    """Import modules via API"""
    print(f"\n📥 Importing {len(modules)} modules...")
    
    success_count = 0
    for module in modules:
        response = session.post(
            f"{API_BASE}/api/admin/content/{LOCALE}/modules",
            json=module
        )
        
        if response.status_code == 200 and response.json().get('success'):
            success_count += 1
            print(f"  ✓ Module: {module['title']}")
        else:
            print(f"  ✗ Failed to import module {module['title']}: {response.text}")
    
    print(f"✅ Imported {success_count}/{len(modules)} modules successfully")
    return success_count

def main():
    """Main import process"""
    print("="*60)
    print("CMS Content Import Tool")
    print("="*60)
    
    # Step 1: Login
    if not login():
        print("\n❌ Import aborted - login failed")
        return
    
    # Step 2: Extract FAQs
    faqs = extract_faqs_from_backup()
    
    # Step 3: Get Modules
    modules = get_modules()
    print(f"\n📦 Prepared {len(modules)} modules for import")
    
    # Step 4: Import FAQs
    faq_count = import_faqs(faqs)
    
    # Step 5: Import Modules
    module_count = import_modules(modules)
    
    # Summary
    print("\n" + "="*60)
    print("📊 Import Summary")
    print("="*60)
    print(f"FAQs imported:    {faq_count}/{len(faqs)}")
    print(f"Modules imported: {module_count}/{len(modules)}")
    print("\n✅ Import complete! Check the CMS Admin UI to verify.")
    print("="*60)

if __name__ == '__main__':
    main()
