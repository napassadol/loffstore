import hashlib

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.user.models import User

# Create your views here.
def HomeView(request):
    return render(request, 'index.html')
    

class login(APIView):
    def post(self, request):
        return_data = dict()
        data = request.data
        hash_pass = hashlib.sha256(data['password'].encode()).hexdigest()
        result = User.objects.all().filter(username = data['username'], password = hash_pass).values()

        if len(result) == 0:
            result = User.objects.all().filter(email = data['username'], password = hash_pass).values()
            
        if len(result) > 0:
            # request.session['user_id'] = result[0]['id']
            return_data['status'] = 'Success'
            return_data['data'] = result[0]
            return Response(return_data)
        else:
            return_data['status'] = 'Failure'
            return Response(return_data)



