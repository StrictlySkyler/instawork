from django.test import TestCase
from .views import check_login

admin_auth_string = 'Basic c3RyaWN0bHlza3lsZXJAZ21haWwuY29tOnBhc3N3b3Jk'
member_auth_string = 'Basic ZXhhbXBsZUBpbnN0YXdvcmsuY29tOnBhc3N3b3Jk'
invalid_auth_string = 'Basic dW5yZWdpc3RlcmVkQGV4YW1wbGUuY29tOmludmFsaWQ='
ADMIN = 2
MEMBER = 1
INVALID = 0

class CheckLoginTestCase(TestCase):
  def test_check_valid_admin_login(self):
    result = check_login(admin_auth_string)
    self.assertEqual(result, ADMIN)

  def test_check_valid_member_login(self):
    result = check_login(member_auth_string)
    self.assertEqual(result, MEMBER)

  def test_check_invalid_login(self):
    result = check_login(invalid_auth_string)
    self.assertEqual(result, INVALID)