from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response
from django.contrib.auth import authenticate
import base64

def check_login(http_auth_string):
    auth_method, auth_string = http_auth_string.split(' ', 1)
    decoded = base64.b64decode(auth_string).decode('utf-8')
    username, password = decoded.split(':', 1)
    user = authenticate(username=username, password=password)
    if auth_method.lower() == 'basic' and user is not None:
       return True


class MemberView(APIView):
    serializer_class = MemberSerializer

    def get(self, request):
        try:
          if check_login(request.META['HTTP_AUTHORIZATION']):
            member_list = [{
                "first_name": member.first_name,
                "last_name": member.last_name,
                "email": member.email,
                "phone": member.phone,
              } for member in User.objects.all()]
            return Response(member_list)
          else:
            return HttpResponse('Unauthorized', 401)
        except:
           return HttpResponse('Unauthorized', 401)
    
    def post(self, request):
        serializer = MemberSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
