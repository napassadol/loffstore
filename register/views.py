import hashlib

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from register.models import User


# Create your views here.
class save_data_register(APIView):
    def post(self, request):
        data = request.data
        user_type = ''
        return_data = dict()

        return_data['status'] = 'Success'

        dup_data = User.objects.all().filter(username = data['username']).values()
        if len(dup_data) > 0:
            return_data['status'] = 'Failure'
            return_data['message'] = 'username already exists'

        dup_data = User.objects.all().filter(email = data['email']).values()
        if len(dup_data) > 0:
            return_data['status'] = 'Failure'
            return_data['message'] = 'email already exists'

        dup_data = User.objects.all().filter(phone = data['phone']).values()
        if len(dup_data) > 0:
            return_data['status'] = 'Failure'
            return_data['message'] = 'phone already exists'

        if 'factory_name' in data:
            user_type = 'factory'
        else:
            user_type = 'farmer'

        if return_data['status'] == 'Success':
            if user_type == 'farmer':
                register = User(
                    username = data['username'],
                    password = hashlib.sha256(data['password'].encode()).hexdigest(),
                    firstname = data['first_name'],
                    lastname = data['last_name'],
                    email = data['email'],
                    phone = data['phone'],
                    user_type = user_type,
                    verify = False
                )
            else:
                register = User(
                    username = data['username'],
                    password = hashlib.sha256(data['password'].encode()).hexdigest(),
                    factory_name = data['factory_name'],
                    email = data['email'],
                    phone = data['phone'],
                    user_type = user_type,
                    verify = False
                )
            register.save()
            
        return Response(return_data)