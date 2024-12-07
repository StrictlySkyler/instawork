from django.forms import ValidationError
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from .models import *
from .serializer import *
from django.contrib.auth import authenticate
import base64
import json


def check_login(http_auth_string):
    auth_method, auth_string = http_auth_string.split(' ', 1)
    decoded = base64.b64decode(auth_string).decode('utf-8')
    username, password = decoded.split(':', 1)
    user = authenticate(username=username, password=password)
    if auth_method.lower() == 'basic' and user.is_superuser:
       return 2
    if auth_method.lower() == 'basic' and user is not None:
       return 1
    else:
       return 0


class MemberView(APIView):
    serializer_class = MemberSerializer

    def get(self, request):
        try:
          logged_in = check_login(request.META['HTTP_AUTHORIZATION'])
          if logged_in:
            member_list = [{
                "id": member.id,
                "first_name": member.first_name,
                "last_name": member.last_name,
                "email": member.email,
                "phone": member.phone,
                "admin": member.is_superuser,
              } for member in User.objects.all()]
            response = {
              'members': member_list,
              'admin': logged_in,
            }
            return HttpResponse(json.dumps(response), 200)
          else:
            return HttpResponse('Unauthorized', 401)
        except:
           return HttpResponse('Unauthorized', 401)
    
    def post(self, request):
        try:
          logged_in = check_login(request.META['HTTP_AUTHORIZATION'])
        except AuthenticationFailed:
          return HttpResponse('Unauthorized', 401)
        
        if 'id' in request.data:
          try:
            user_found = User.objects.get(id=request.data['id'])
            if logged_in == 2 and user_found:
              user_found.is_superuser = request.data['admin']
            if logged_in and user_found:
              user_found.first_name = request.data['first_name']
              user_found.last_name = request.data['last_name']
              user_found.email = request.data['email']
              user_found.phone = request.data['phone']
              user_found.save()
            return HttpResponse(user_found, 200)
          except User.DoesNotExist as e:
            raise e
        elif logged_in:
          try:
            serializer = MemberSerializer(data=request.data)
            print(serializer)
            if serializer.is_valid(raise_exception=True):
              serializer.save()
              member_list = [{
                "id": member.id,
                "first_name": member.first_name,
                "last_name": member.last_name,
                "email": member.email,
                "phone": member.phone,
                "admin": member.is_superuser,
              } for member in User.objects.all()]
            return HttpResponse(json.dumps(member_list), 201)
          except ValidationError as e:
             print(e)
             return HttpResponse('Invalid', 400)
        else:
          return HttpResponse('Forbidden', 403)
        
    def delete(self, request):
        try:
          logged_in = check_login(request.META['HTTP_AUTHORIZATION'])
        except AuthenticationFailed:
          return HttpResponse('Unauthorized', 401)
        
        user_found = User.objects.get(id=request.data['id'])
        
        if logged_in == 2:
           user_found.delete()
           member_list = [{
              "id": member.id,
              "first_name": member.first_name,
              "last_name": member.last_name,
              "email": member.email,
              "phone": member.phone,
              "admin": member.is_superuser,
            } for member in User.objects.all()]
           return HttpResponse(json.dumps(member_list), 205)
