from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.user.models import User
from apps.product.models import Product

# Create your views here.
class post_product_sell(APIView):
    def post(self, request):
        try:
            request_data = request.data
            user = User.objects.get(id=request_data['user_id'])
            
            user.product_set.create(
                name = request_data['name'],
                product_img_0 = request_data['file_0'] if request_data['file_0'] != 'null' else None,
                product_img_1 = request_data['file_1'] if request_data['file_1'] != 'null' else None,
                product_img_2 = request_data['file_2'] if request_data['file_2'] != 'null' else None,
                product_img_3 = request_data['file_3'] if request_data['file_3'] != 'null' else None,
                area = int(request_data['area']),
                unit = request_data['unit'],
                price = request_data['price'],
                location = {
                    'city': request_data['city'],
                    'district': request_data['district'],
                    'sub_district': request_data['sub_district'],
                },
                description = request_data['description'],
                post_type = 0
            )
            return Response({'status' : 'Success', 'data' : ''})
        except Exception as e:
            return Response({'status' : 'Failed', 'message' : str(e)})

class get_all_products(APIView):
    def get(self, response):
        return_data = dict()
        return_data['status'] = 'Success'
        try:
            products = Product.objects.all().values()
            return_data['data'] = products
        except Exception as e:
            return_data['status'] = "Failed"
            return_data['message'] = str(e)
        
        return Response(return_data)

class get_product_info(APIView):
    def post(self, response):
        return_data = dict()
        return_data['status'] = 'Success'
        try:
            data = response.data
            products = Product.objects.filter(id=data['id']).values()
            return_data['data'] = products[0]
        except Exception as e:
            return_data['status'] = 'Failed'
            return_data['message'] = str(e)
        
        return Response(return_data)

