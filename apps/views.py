from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
def HomeView(request):
    return render(request, 'index.html')

class test(APIView):
    def get(self, request):

        return Response({'data': 'test'})