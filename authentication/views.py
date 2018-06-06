import hashlib

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from register.models import User

# Create your views here.
class login(APIView):
    def post(self, request):
        return_data = dict()
        data = request.data
        hash_pass = hashlib.sha256(data['password'].encode()).hexdigest()
        result = User.objects.filter(username = data['username'], password = hash_pass)
        if result != None:
            return_data['status'] = 'Success'
            return return_data
        else:
            return_data['status'] = 'Failure'
            return return_data

