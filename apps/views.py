from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from product.models import Product

# Create your views here.
def HomeView(request):
    return render(request, 'index.html')

class post_product_sell(APIView):
    def post(self, request):
        request_file = request.FILES['file']
        request_data = request.data
        product = Product(name = 'test', product_img_0=request_file)
        product.save()
        return Response({'data' : 'Success'})


