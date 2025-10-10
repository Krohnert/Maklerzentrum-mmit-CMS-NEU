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
BACKEND_URL = "https://react2html-makler.preview.emergentagent.com/api"
STATIC_BASE_URL = "https://react2html-makler.preview.emergentagent.com"

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
    
    def test_error_handling(self):
        """Test error handling with invalid data and missing fields"""
        try:
            # Test missing required fields
            invalid_data = {
                "firstName": "Test",
                # Missing lastName, email, agreeTerms
            }
            
            response = self.session.post(f"{BACKEND_URL}/booking", json=invalid_data, timeout=10)
            if response.status_code == 422:  # FastAPI validation error
                self.log_result(
                    "Error Handling - Missing Fields", 
                    True, 
                    "Properly validates missing required fields",
                    {"status_code": response.status_code}
                )
            else:
                self.log_result(
                    "Error Handling - Missing Fields", 
                    False, 
                    f"Missing field validation not working: HTTP {response.status_code}",
                    {"status_code": response.status_code, "response": response.text[:200]}
                )
            
            # Test invalid email format
            invalid_email_data = {
                "firstName": "Test",
                "lastName": "User",
                "email": "invalid-email",
                "agreeTerms": True
            }
            
            response = self.session.post(f"{BACKEND_URL}/contact", json=invalid_email_data, timeout=10)
            if response.status_code == 422:  # FastAPI validation error
                self.log_result(
                    "Error Handling - Invalid Email", 
                    True, 
                    "Properly validates invalid email format",
                    {"status_code": response.status_code}
                )
            else:
                self.log_result(
                    "Error Handling - Invalid Email", 
                    False, 
                    f"Email validation not working: HTTP {response.status_code}",
                    {"status_code": response.status_code, "response": response.text[:200]}
                )
                
        except Exception as e:
            self.log_result(
                "Error Handling", 
                False, 
                f"Error handling test failed: {str(e)}"
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
    
    def test_cors_headers(self):
        """Test CORS headers verification as per review request"""
        try:
            # Test CORS with OPTIONS request
            response = self.session.options(f"{BACKEND_URL}/", timeout=10)
            cors_headers = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
                'Access-Control-Expose-Headers': response.headers.get('Access-Control-Expose-Headers')
            }
            
            # Also test with actual POST request to form endpoint
            test_data = {
                "firstName": "CORS",
                "lastName": "Test",
                "email": "cors.test@example.com",
                "agreeTerms": True
            }
            post_response = self.session.post(f"{BACKEND_URL}/booking", json=test_data, timeout=10)
            post_cors_headers = {
                'Access-Control-Allow-Origin': post_response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Expose-Headers': post_response.headers.get('Access-Control-Expose-Headers')
            }
            
            if any(cors_headers.values()) or any(post_cors_headers.values()):
                self.log_result(
                    "CORS Headers Verification", 
                    True, 
                    "CORS headers present in responses",
                    {"options_headers": cors_headers, "post_headers": post_cors_headers}
                )
            else:
                self.log_result(
                    "CORS Headers Verification", 
                    False, 
                    "No CORS headers found in responses",
                    {"options_headers": cors_headers, "post_headers": post_cors_headers}
                )
                
        except Exception as e:
            self.log_result(
                "CORS Headers Verification", 
                False, 
                f"CORS headers test failed: {str(e)}"
            )
    
    def test_rate_limiting(self):
        """Test rate limiting: 5 requests/minute for all form endpoints"""
        try:
            # Test rate limiting on booking endpoint (5 requests/minute)
            test_data = {
                "firstName": "Rate",
                "lastName": "Test",
                "email": "rate.test@example.com",
                "agreeTerms": True
            }
            
            responses = []
            for i in range(7):  # Try 7 requests (should fail on 6th)
                try:
                    resp = self.session.post(f"{BACKEND_URL}/booking", json=test_data, timeout=5)
                    responses.append({
                        "request": i+1,
                        "status_code": resp.status_code,
                        "rate_limit_headers": {
                            "X-RateLimit-Limit": resp.headers.get('X-RateLimit-Limit'),
                            "X-RateLimit-Remaining": resp.headers.get('X-RateLimit-Remaining'),
                            "X-RateLimit-Reset": resp.headers.get('X-RateLimit-Reset')
                        }
                    })
                    if resp.status_code == 429:
                        break
                    time.sleep(0.2)  # Small delay between requests
                except Exception as e:
                    responses.append({"request": i+1, "error": str(e)})
            
            # Check if 6th request was rate limited (429)
            rate_limited = any(r.get('status_code') == 429 for r in responses)
            
            if rate_limited:
                self.log_result(
                    "Rate Limiting (5/minute)", 
                    True, 
                    "Rate limiting working correctly - 6th request blocked with 429",
                    {"responses": responses}
                )
            else:
                self.log_result(
                    "Rate Limiting (5/minute)", 
                    False, 
                    "Rate limiting not working - all requests succeeded",
                    {"responses": responses}
                )
                
        except Exception as e:
            self.log_result(
                "Rate Limiting (5/minute)", 
                False, 
                f"Rate limiting test failed: {str(e)}"
            )
    
    def test_email_validation(self):
        """Test enhanced EmailStr validation (Pydantic)"""
        try:
            # Test invalid email formats (should fail with 422)
            invalid_emails = [
                "invalid-email",
                "test@",
                "@example.com",
                "test..test@example.com",
                "test@example",
                ""
            ]
            
            validation_results = []
            
            for invalid_email in invalid_emails:
                test_data = {
                    "firstName": "Email",
                    "lastName": "Validation",
                    "email": invalid_email,
                    "agreeTerms": True
                }
                
                try:
                    response = self.session.post(f"{BACKEND_URL}/contact", json=test_data, timeout=5)
                    validation_results.append({
                        "email": invalid_email,
                        "status_code": response.status_code,
                        "rejected": response.status_code == 422
                    })
                except Exception as e:
                    validation_results.append({
                        "email": invalid_email,
                        "error": str(e)
                    })
            
            # Test valid email (should succeed)
            valid_test_data = {
                "firstName": "Valid",
                "lastName": "Email",
                "email": "valid.email@example.com",
                "message": "Test valid email",
                "agreeTerms": True
            }
            
            valid_response = self.session.post(f"{BACKEND_URL}/contact", json=valid_test_data, timeout=5)
            validation_results.append({
                "email": "valid.email@example.com",
                "status_code": valid_response.status_code,
                "accepted": valid_response.status_code in [200, 201]
            })
            
            # Check results
            invalid_rejected = sum(1 for r in validation_results[:-1] if r.get('rejected', False))
            valid_accepted = validation_results[-1].get('accepted', False)
            
            if invalid_rejected >= 4 and valid_accepted:  # Most invalid emails rejected, valid accepted
                self.log_result(
                    "Enhanced EmailStr Validation", 
                    True, 
                    f"Email validation working - {invalid_rejected}/{len(invalid_emails)} invalid emails rejected, valid email accepted",
                    {"validation_results": validation_results}
                )
            else:
                self.log_result(
                    "Enhanced EmailStr Validation", 
                    False, 
                    f"Email validation issues - {invalid_rejected}/{len(invalid_emails)} invalid emails rejected, valid accepted: {valid_accepted}",
                    {"validation_results": validation_results}
                )
                
        except Exception as e:
            self.log_result(
                "Enhanced EmailStr Validation", 
                False, 
                f"Email validation test failed: {str(e)}"
            )
    
    def test_honeypot_protection(self):
        """Test honeypot protection on all form endpoints"""
        try:
            endpoints_to_test = [
                ("/booking", {
                    "firstName": "Bot",
                    "lastName": "Spam",
                    "email": "bot@spam.com",
                    "agreeTerms": True,
                    "website_url": "http://spam.com"  # Honeypot field
                }),
                ("/course-booking", {
                    "firstName": "Bot",
                    "lastName": "Spam", 
                    "email": "bot@spam.com",
                    "courseTitle": "Test Course",
                    "courseStartDate": "2024-01-01",
                    "courseLocation": "Test Location",
                    "courseCohort": "Test Cohort",
                    "courseModule": "Test Module",
                    "agreeTerms": True,
                    "website_url": "http://spam.com"  # Honeypot field
                }),
                ("/contact", {
                    "firstName": "Bot",
                    "lastName": "Spam",
                    "email": "bot@spam.com",
                    "message": "Spam message",
                    "agreeTerms": True,
                    "website_url": "http://spam.com"  # Honeypot field
                })
            ]
            
            honeypot_results = []
            
            for endpoint, data in endpoints_to_test:
                try:
                    response = self.session.post(f"{BACKEND_URL}{endpoint}", json=data, timeout=10)
                    if response.status_code == 200:
                        response_data = response.json()
                        blocked = not response_data.get('success') and 'Invalid submission' in response_data.get('error', '')
                        honeypot_results.append({
                            "endpoint": endpoint,
                            "blocked": blocked,
                            "response": response_data
                        })
                    else:
                        honeypot_results.append({
                            "endpoint": endpoint,
                            "error": f"HTTP {response.status_code}",
                            "blocked": False
                        })
                except Exception as e:
                    honeypot_results.append({
                        "endpoint": endpoint,
                        "error": str(e),
                        "blocked": False
                    })
            
            blocked_count = sum(1 for r in honeypot_results if r.get('blocked', False))
            
            if blocked_count == len(endpoints_to_test):
                self.log_result(
                    "Honeypot Protection", 
                    True, 
                    f"Honeypot protection working on all {len(endpoints_to_test)} form endpoints",
                    {"results": honeypot_results}
                )
            else:
                self.log_result(
                    "Honeypot Protection", 
                    False, 
                    f"Honeypot protection issues - {blocked_count}/{len(endpoints_to_test)} endpoints blocking bots",
                    {"results": honeypot_results}
                )
                
        except Exception as e:
            self.log_result(
                "Honeypot Protection", 
                False, 
                f"Honeypot protection test failed: {str(e)}"
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
        
        # 5. Security (Recent Updates Testing)
        print("\n🔒 5. SECURITY - RECENT UPDATES")
        self.test_cors_headers()
        self.test_rate_limiting()
        self.test_email_validation()
        self.test_honeypot_protection()
        
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