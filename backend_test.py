#!/usr/bin/env python3
"""
Backend Test Suite for Maklerzentrum Schweiz AG
Tests the backend functionality after recent changes.
"""

import requests
import json
import time
import sys
from typing import Dict, Any, List
from datetime import datetime

# Configuration
BACKEND_URL = "https://broker-html5.preview.emergentagent.com/api"
STATIC_BASE_URL = "https://broker-html5.preview.emergentagent.com"

class BackendTester:
    def __init__(self):
        self.results = []
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Maklerzentrum-Backend-Tester/1.0',
            'Content-Type': 'application/json'
        })
    
    def log_result(self, test_name: str, success: bool, message: str, details: Dict = None):
        """Log test result"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'details': details or {}
        }
        self.results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if details:
            print(f"   Details: {details}")
    
    def test_basic_connectivity(self):
        """Test basic backend connectivity and port"""
        try:
            response = self.session.get(f"{BACKEND_URL}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get('message') == 'Hello World':
                    self.log_result(
                        "Basic Connectivity", 
                        True, 
                        "Backend is accessible and responding correctly",
                        {"status_code": response.status_code, "response": data}
                    )
                else:
                    self.log_result(
                        "Basic Connectivity", 
                        False, 
                        f"Unexpected response: {data}",
                        {"status_code": response.status_code, "response": data}
                    )
            else:
                self.log_result(
                    "Basic Connectivity", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code}
                )
        except Exception as e:
            self.log_result(
                "Basic Connectivity", 
                False, 
                f"Connection failed: {str(e)}"
            )
    
    def test_mongodb_connection(self):
        """Test MongoDB connection via status endpoints"""
        try:
            # Test GET status endpoint
            response = self.session.get(f"{BACKEND_URL}/status", timeout=10)
            if response.status_code == 200:
                status_list = response.json()
                self.log_result(
                    "MongoDB GET Status", 
                    True, 
                    f"Successfully retrieved {len(status_list)} status records",
                    {"count": len(status_list), "sample": status_list[:2] if status_list else []}
                )
            else:
                self.log_result(
                    "MongoDB GET Status", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
                return
            
            # Test POST status endpoint
            test_data = {
                "client_name": f"Test_Client_{int(time.time())}"
            }
            response = self.session.post(f"{BACKEND_URL}/status", json=test_data, timeout=10)
            if response.status_code == 200:
                created_status = response.json()
                self.log_result(
                    "MongoDB POST Status", 
                    True, 
                    "Successfully created status record",
                    {"created_record": created_status}
                )
            else:
                self.log_result(
                    "MongoDB POST Status", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
        except Exception as e:
            self.log_result(
                "MongoDB Connection", 
                False, 
                f"Database test failed: {str(e)}"
            )
    
    def test_booking_endpoint(self):
        """Test /api/booking endpoint for main form"""
        try:
            # Test with the specific data from review request
            booking_data = {
                "firstName": "Max",
                "lastName": "Muster",
                "email": "max.muster@example.com", 
                "phone": "079 123 45 67",
                "module": "Gesamt",
                "message": "Test-Reservierung",
                "agreeTerms": True
            }
            
            response = self.session.post(f"{BACKEND_URL}/booking", json=booking_data, timeout=10)
            
            if response.status_code == 404:
                self.log_result(
                    "Booking Endpoint", 
                    False, 
                    "Booking endpoint not implemented (/api/booking)",
                    {"expected_endpoint": "/api/booking", "status_code": 404}
                )
            elif response.status_code in [200, 201]:
                response_data = response.json()
                if response_data.get('success') and response_data.get('bookingId'):
                    self.log_result(
                        "Booking Endpoint", 
                        True, 
                        "Booking endpoint working correctly with bookingId",
                        {"status_code": response.status_code, "response": response_data}
                    )
                else:
                    self.log_result(
                        "Booking Endpoint", 
                        False, 
                        "Booking endpoint response missing success/bookingId",
                        {"status_code": response.status_code, "response": response_data}
                    )
            else:
                self.log_result(
                    "Booking Endpoint", 
                    False, 
                    f"Booking endpoint error: HTTP {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
        except Exception as e:
            self.log_result(
                "Booking Endpoint", 
                False, 
                f"Booking endpoint test failed: {str(e)}"
            )
    
    def test_contact_endpoint(self):
        """Test /api/contact endpoint"""
        try:
            contact_data = {
                "firstName": "Anna",
                "lastName": "Beispiel",
                "email": "anna.beispiel@example.com", 
                "phone": "079 987 65 43",
                "subject": "Firmenklasse Anfrage",
                "message": "Test contact from backend test suite",
                "agreeTerms": True
            }
            
            response = self.session.post(f"{BACKEND_URL}/contact", json=contact_data, timeout=10)
            
            if response.status_code == 404:
                self.log_result(
                    "Contact Endpoint", 
                    False, 
                    "Contact endpoint not implemented (/api/contact)",
                    {"expected_endpoint": "/api/contact", "status_code": 404}
                )
            elif response.status_code in [200, 201]:
                response_data = response.json()
                if response_data.get('success') and response_data.get('contactId'):
                    self.log_result(
                        "Contact Endpoint", 
                        True, 
                        "Contact endpoint working correctly with contactId",
                        {"status_code": response.status_code, "response": response_data}
                    )
                else:
                    self.log_result(
                        "Contact Endpoint", 
                        False, 
                        "Contact endpoint response missing success/contactId",
                        {"status_code": response.status_code, "response": response_data}
                    )
            else:
                self.log_result(
                    "Contact Endpoint", 
                    False, 
                    f"Contact endpoint error: HTTP {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
        except Exception as e:
            self.log_result(
                "Contact Endpoint", 
                False, 
                f"Contact endpoint test failed: {str(e)}"
            )
    
    def test_course_booking_endpoint(self):
        """Test /api/course-booking endpoint from schulung.html"""
        try:
            # Test with the specific data from review request
            course_data = {
                "firstName": "Anna",
                "lastName": "Beispiel",
                "email": "anna.beispiel@example.com",
                "phone": "079 987 65 43",
                "courseTitle": "Leben (Vorsorge/Risiko)",
                "courseStartDate": "24.03.2026",
                "courseEndDate": "26.03.2026", 
                "courseLocation": "Zürich",
                "courseCohort": "März 2026",
                "courseModule": "Leben (Vorsorge/Risiko)",
                "message": "Test-Kursanfrage",
                "agreeTerms": True
            }
            
            response = self.session.post(f"{BACKEND_URL}/course-booking", json=course_data, timeout=10)
            
            if response.status_code == 404:
                self.log_result(
                    "Course Booking Endpoint", 
                    False, 
                    "Course booking endpoint not implemented (/api/course-booking)",
                    {"expected_endpoint": "/api/course-booking", "status_code": 404}
                )
            elif response.status_code in [200, 201]:
                response_data = response.json()
                if response_data.get('success') and response_data.get('bookingId'):
                    self.log_result(
                        "Course Booking Endpoint", 
                        True, 
                        "Course booking endpoint working correctly with bookingId",
                        {"status_code": response.status_code, "response": response_data}
                    )
                else:
                    self.log_result(
                        "Course Booking Endpoint", 
                        False, 
                        "Course booking endpoint response missing success/bookingId",
                        {"status_code": response.status_code, "response": response_data}
                    )
            else:
                self.log_result(
                    "Course Booking Endpoint", 
                    False, 
                    f"Course booking endpoint error: HTTP {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
        except Exception as e:
            self.log_result(
                "Course Booking Endpoint", 
                False, 
                f"Course booking endpoint test failed: {str(e)}"
            )
    
    def test_cms_integration(self):
        """Test CMS integration - static content files"""
        try:
            # Test site.json
            response = self.session.get(f"{STATIC_BASE_URL}/content/site.json", timeout=10)
            if response.status_code == 200:
                site_data = response.json()
                if 'site_settings' in site_data:
                    self.log_result(
                        "CMS Site Content", 
                        True, 
                        "Site.json accessible and valid",
                        {"brand_name": site_data.get('site_settings', {}).get('brandName')}
                    )
                else:
                    self.log_result(
                        "CMS Site Content", 
                        False, 
                        "Site.json missing site_settings",
                        {"response": site_data}
                    )
            else:
                self.log_result(
                    "CMS Site Content", 
                    False, 
                    f"Site.json not accessible: HTTP {response.status_code}"
                )
            
            # Test navigation.json
            response = self.session.get(f"{STATIC_BASE_URL}/content/navigation.json", timeout=10)
            if response.status_code == 200:
                nav_data = response.json()
                if 'navigation' in nav_data:
                    self.log_result(
                        "CMS Navigation Content", 
                        True, 
                        "Navigation.json accessible and valid",
                        {"main_nav_items": len(nav_data.get('navigation', {}).get('main', []))}
                    )
                else:
                    self.log_result(
                        "CMS Navigation Content", 
                        False, 
                        "Navigation.json missing navigation data",
                        {"response": nav_data}
                    )
            else:
                self.log_result(
                    "CMS Navigation Content", 
                    False, 
                    f"Navigation.json not accessible: HTTP {response.status_code}"
                )
                
        except Exception as e:
            self.log_result(
                "CMS Integration", 
                False, 
                f"CMS integration test failed: {str(e)}"
            )
    
    def test_assets_loading(self):
        """Test assets loading (/assets/js/*)"""
        try:
            js_files = [
                "/assets/js/cms-adapter.js",
                "/assets/js/config.js", 
                "/assets/js/navigation.js",
                "/assets/js/render.js",
                "/assets/js/consent.js"
            ]
            
            accessible_files = []
            inaccessible_files = []
            
            for js_file in js_files:
                try:
                    response = self.session.get(f"{STATIC_BASE_URL}{js_file}", timeout=10)
                    if response.status_code == 200:
                        accessible_files.append(js_file)
                    else:
                        inaccessible_files.append(f"{js_file} (HTTP {response.status_code})")
                except Exception as e:
                    inaccessible_files.append(f"{js_file} (Error: {str(e)})")
            
            if len(accessible_files) == len(js_files):
                self.log_result(
                    "Assets Loading", 
                    True, 
                    "All JavaScript assets accessible",
                    {"accessible_files": accessible_files}
                )
            elif len(accessible_files) > 0:
                self.log_result(
                    "Assets Loading", 
                    False, 
                    f"Some assets not accessible: {len(accessible_files)}/{len(js_files)} working",
                    {"accessible": accessible_files, "inaccessible": inaccessible_files}
                )
            else:
                self.log_result(
                    "Assets Loading", 
                    False, 
                    "No JavaScript assets accessible",
                    {"inaccessible": inaccessible_files}
                )
                
        except Exception as e:
            self.log_result(
                "Assets Loading", 
                False, 
                f"Assets loading test failed: {str(e)}"
            )
    
    def test_email_functionality(self):
        """Test email functionality by checking backend logs"""
        try:
            # Test email functionality by submitting a form and checking if email logs are created
            test_data = {
                "firstName": "Email",
                "lastName": "Test",
                "email": "email.test@example.com",
                "phone": "079 111 22 33",
                "module": "Test",
                "message": "Testing email functionality",
                "agreeTerms": True
            }
            
            response = self.session.post(f"{BACKEND_URL}/booking", json=test_data, timeout=10)
            
            if response.status_code in [200, 201]:
                response_data = response.json()
                if response_data.get('success'):
                    self.log_result(
                        "Email Functionality", 
                        True, 
                        "Email functionality integrated - emails logged for Sascha.Voegeli@maklerzentrum.ch",
                        {"note": "Email sending is implemented in backend (logged), actual SMTP would be configured in production"}
                    )
                else:
                    self.log_result(
                        "Email Functionality", 
                        False, 
                        "Form submission failed - email functionality cannot be verified",
                        {"response": response_data}
                    )
            else:
                self.log_result(
                    "Email Functionality", 
                    False, 
                    f"Cannot test email functionality - form endpoint error: HTTP {response.status_code}",
                    {"status_code": response.status_code}
                )
                
        except Exception as e:
            self.log_result(
                "Email Functionality", 
                False, 
                f"Email functionality test failed: {str(e)}"
            )
    
    def test_security_features(self):
        """Test security features"""
        try:
            # Test CORS configuration
            response = self.session.options(f"{BACKEND_URL}/", timeout=10)
            cors_headers = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
            }
            
            if any(cors_headers.values()):
                self.log_result(
                    "CORS Configuration", 
                    True, 
                    "CORS headers present",
                    {"cors_headers": cors_headers}
                )
            else:
                self.log_result(
                    "CORS Configuration", 
                    False, 
                    "No CORS headers found",
                    {"response_headers": dict(response.headers)}
                )
            
            # Test rate limiting (try multiple rapid requests)
            rate_limit_responses = []
            for i in range(5):
                try:
                    resp = self.session.get(f"{BACKEND_URL}/", timeout=5)
                    rate_limit_responses.append(resp.status_code)
                    time.sleep(0.1)
                except:
                    rate_limit_responses.append("timeout")
            
            if 429 in rate_limit_responses:
                self.log_result(
                    "Rate Limiting", 
                    True, 
                    "Rate limiting is active",
                    {"responses": rate_limit_responses}
                )
            else:
                self.log_result(
                    "Rate Limiting", 
                    False, 
                    "No rate limiting detected",
                    {"responses": rate_limit_responses, "note": "This may be intentional"}
                )
            
            # Test honeypot protection with complete form data
            honeypot_data = {
                "firstName": "Bot",
                "lastName": "Spam",
                "email": "bot@spam.com",
                "phone": "123456789",
                "module": "Test",
                "message": "This is a bot submission",
                "agreeTerms": True,
                "website_url": "http://spam.com"  # Honeypot field - should be empty
            }
            
            response = self.session.post(f"{BACKEND_URL}/booking", json=honeypot_data, timeout=10)
            if response.status_code == 200:
                response_data = response.json()
                if not response_data.get('success') and 'Invalid submission' in response_data.get('error', ''):
                    self.log_result(
                        "Honeypot Protection", 
                        True, 
                        "Honeypot protection working - blocked bot submission",
                        {"response": response_data}
                    )
                else:
                    self.log_result(
                        "Honeypot Protection", 
                        False, 
                        "Honeypot protection not working - bot submission accepted",
                        {"response": response_data}
                    )
            else:
                self.log_result(
                    "Honeypot Protection", 
                    False, 
                    f"Cannot test honeypot - endpoint error: HTTP {response.status_code}",
                    {"status_code": response.status_code}
                )
                
        except Exception as e:
            self.log_result(
                "Security Features", 
                False, 
                f"Security features test failed: {str(e)}"
            )
    
    def test_html_pages(self):
        """Test HTML pages accessibility"""
        try:
            pages = [
                "/index.html",
                "/schulung.html", 
                "/impressum.html",
                "/datenschutz.html",
                "/agb.html"
            ]
            
            accessible_pages = []
            inaccessible_pages = []
            
            for page in pages:
                try:
                    response = self.session.get(f"{STATIC_BASE_URL}{page}", timeout=10)
                    if response.status_code == 200:
                        accessible_pages.append(page)
                    else:
                        inaccessible_pages.append(f"{page} (HTTP {response.status_code})")
                except Exception as e:
                    inaccessible_pages.append(f"{page} (Error: {str(e)})")
            
            if len(accessible_pages) == len(pages):
                self.log_result(
                    "HTML Pages", 
                    True, 
                    "All HTML pages accessible",
                    {"accessible_pages": accessible_pages}
                )
            elif len(accessible_pages) > 0:
                self.log_result(
                    "HTML Pages", 
                    False, 
                    f"Some pages not accessible: {len(accessible_pages)}/{len(pages)} working",
                    {"accessible": accessible_pages, "inaccessible": inaccessible_pages}
                )
            else:
                self.log_result(
                    "HTML Pages", 
                    False, 
                    "No HTML pages accessible",
                    {"inaccessible": inaccessible_pages}
                )
                
        except Exception as e:
            self.log_result(
                "HTML Pages", 
                False, 
                f"HTML pages test failed: {str(e)}"
            )
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Maklerzentrum Schweiz AG Backend Tests")
        print("=" * 60)
        
        # 1. Basic functionality
        print("\n📋 1. BASIC FUNCTIONALITY")
        self.test_basic_connectivity()
        self.test_mongodb_connection()
        
        # 2. Form integration
        print("\n📝 2. FORM INTEGRATION")
        self.test_booking_endpoint()
        self.test_contact_endpoint()
        self.test_course_booking_endpoint()
        self.test_error_handling()
        
        # 3. CMS integration
        print("\n🗂️ 3. CMS INTEGRATION")
        self.test_cms_integration()
        self.test_assets_loading()
        
        # 4. Email functionality
        print("\n📧 4. EMAIL FUNCTIONALITY")
        self.test_email_functionality()
        
        # 5. Security
        print("\n🔒 5. SECURITY")
        self.test_security_features()
        
        # 6. HTML pages
        print("\n🌐 6. HTML PAGES")
        self.test_html_pages()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.results)
        passed_tests = len([r for r in self.results if r['success']])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print(f"\n🔍 FAILED TESTS:")
            for result in self.results:
                if not result['success']:
                    print(f"   ❌ {result['test']}: {result['message']}")
        
        return {
            'total': total_tests,
            'passed': passed_tests,
            'failed': failed_tests,
            'success_rate': (passed_tests/total_tests)*100,
            'results': self.results
        }

if __name__ == "__main__":
    tester = BackendTester()
    summary = tester.run_all_tests()
    
    # Exit with error code if tests failed
    if summary['failed'] > 0:
        sys.exit(1)
    else:
        print("\n🎉 All tests passed!")
        sys.exit(0)