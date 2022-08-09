from datetime import datetime
from math import prod
from venv import create
from django.shortcuts import render
from .serializers import *
import requests
import json
from .models import *
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from django.contrib.auth.hashers import make_password

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer=UserSerializerWithToken(self.user).data

        for(key,value) in serializer.items():
            data[key]=value

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def index(request):
    routes={
        'To get all products':'/products'
    }
    return Response(routes)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfile(request):
    user=request.user #this is not default request.user , it now requires a JWT token to get the user from request
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUser(request,pk):
    user=User.objects.get(id=pk)
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def editUser(request,pk):
    user=User.objects.get(id=pk)
    data=request.data
    user.username=data['username']
    user.email=data['email']
    user.score
    user.is_superuser=data['admin']
    user.save()
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)















@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateScore(request):
    user=request.user
    data=request.data
    if data['game']=='wordle':
        user.wordleScore+=data['score']
        user.save()
        serializer=UserSerializer(user,many=False)
        return Response(serializer.data)
    elif data['game']=='paper':
        user.paperScore+=data['score']
        user.save()
        serializer=UserSerializer(user,many=False)
        return Response(serializer.data)
    else:
        return Response({"response":'Please send valid game data'})









@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users=User.objects.all()
    serializer=UserSerializer(users,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createUser(request):
    data=request.data
    user=User.objects.create(
        username=data['username'],
        email=data['email'],
        password=make_password(data['password']),
        is_superuser=data['admin']
    )
    serializer=UserSerializerWithToken(user,many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def deleteUser(request,pk):
    user=User.objects.get(id=pk)
    user.delete()
    return Response("User Deleted")






@api_view(['GET'])
def getProducts(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def searchProducts(request,search):
    products=Product.objects.all()
    results=[product for product in products if (product.name).lower().find(search.lower())!=-1]
    serializer=ProductSerializer(results,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request,pk):
    products=Product.objects.get(_id=pk)
    serializer=ProductSerializer(products,many=False)
    return Response(serializer.data)
# Create your views here.

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    data=request.data
    Product.objects.create(
        name=data['name'],
        description=data['description'],
        brand=data['brand'],
        category=data['category'],
        price=data['price'],
        countInStock=data['countInStock'],
        image=request.FILES.get('image')
    )
    return Response("Product Created")

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def editProduct(request,pk):
    product=Product.objects.get(_id=pk)
    data=request.data
    product.name=data['name']
    product.description=data['description']
    product.brand=data['brand']
    product.category=data['category']
    product.price=data['price']
    product.countInStock=data['countInStock']
    if data['image']!='':
        product.image=request.FILES.get('image')
        print("=================================")
        print(request.FILES)
    product.save()
    return Response("Product Edited")

@api_view(['GET'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product=Product.objects.get(_id=pk)
    product.delete()
    return Response("Product Deleted")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCart(request):
    print("==============================================")
    print(request.data)
    print(request.user)
    user=request.user #this is not default request.user , it now requires a JWT token to get the user from request
    try:
        cart=Cart.objects.get(user=user)
    except:
        cart=Cart.objects.create(
            user=user,
        )
        cart.save()
        
    data=request.data
    product=data['product']
    quantity=data['quantity']

    product=Product.objects.get(name=product)
    try:
        cartship=CartShip.objects.get(user=user,item=product)
    except:
        cartship=CartShip.objects.create(
            user=user,
            item=product,
            quantity=quantity
        )
        cartship.save()
    else:
        cartship.quantity=quantity
        cartship.save()

    cart.items.add(cartship)
    cart.save()
    return Response("Cart Saved")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def removeCart(request):
    print("==============================================")
    print(request.data)
    print(request.user)
    user=request.user #this is not default request.user , it now requires a JWT token to get the user from request
    cart=Cart.objects.get(user=user)
    data=request.data
    product=data['product']
    print("========================Got Cart And Data==========================")

    product=Product.objects.get(name=product)
    cartship=CartShip.objects.get(user=user,item=product)
    print("========================Got CartShip==========================")
    cart.items.remove(cartship)
    cart.save()
    print("========================Cart Saved==========================")
    cartship.delete()

    return Response("Item Removed")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def showCart(request):
    user=request.user #this is not default request.user , it now requires a JWT token to get the user from request
    cart=Cart.objects.get(user=user)
    serializer=CartSerializer(cart,many=False)
    for item in serializer.data['items']:
        item['arryOfStock']=[i for i in range(0,int(item['item']["countInStock"])+1)]
        
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_shipping_address(request):
    user=request.user #this is not default request.user , it now requires a JWT token to get the user from request
    address=ShippingAddress.objects.all().filter(user=user)
    serializer=ShippingAddress_Serializer(address, many=True)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_shipping_address(request):
    user=request.user #this is not default request.user , it now requires a JWT token to get the user from request
    data=request.data
    ShippingAddress.objects.create(
        user=user,
        address=data['address'],
        city=data['city'],
        country=data['country'],
        postalCode=data['postalCode']
    )

    return Response("New Shipping Address Added")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user=request.user #this is not default request.user , it now requires a JWT token to get the user from request
    data=request.data
    address=data['address']
    cart=data['cart']
    paymentMethod=data['paymentMethod']

    order=Order.objects.create(
        user=user,
        paymentMethod=paymentMethod,
        taxPrice=data['taxPrice'],
        shippingPrice=data['shippingPrice'],
        totalPrice=data['totalPrice'],
        shippingAddress=ShippingAddress.objects.get(_id=address['_id'])
    )

    for item in cart:
        product=Product.objects.get(_id=item['item']['_id'])
        OrderItem.objects.create(
            order=order,
            item=product,
            quantity=item['quantity']
        )
        product.countInStock-=item['quantity']
        product.save()

    cart=Cart.objects.get(user=user)
    cart.delete()
    return Response("Order Saved")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order(request,pk):
    order=Order.objects.get(_id=pk)
    order_serializer=OrderSerializer(order,many=False)
    items=OrderItem.objects.all().filter(order=order)
    items_serializer=OrderItemSerializer(items,many=True)
    return Response({'order':order_serializer.data,'items':items_serializer.data})

@api_view(['GET'])
@permission_classes([IsAdminUser])
def delivered_order(request,pk):
    order=Order.objects.get(_id=pk)
    order.isDelivered=True
    order.deliveredAt=datetime.now()
    order.save()
    return Response("Order Delivered")

@api_view(['GET'])
@permission_classes([IsAdminUser])
def paid_order(request,pk):
    order=Order.objects.get(_id=pk)
    order.isPaid=True
    order.paidAt=datetime.now()
    order.save()
    return Response("Order Delivered")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cancel_order(request,pk):
    order=Order.objects.get(_id=pk)
    items=OrderItem.objects.all().filter(order=order)
    for item in items:
        product=item.item
        product.countInStock+=item.quantity
        product.save()
        item.delete()
    order.delete()
    return Response("Order Deleted")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders(request):
    user=request.user
    orders=Order.objects.all().filter(user=user)
    order_serializer=OrderSerializer(orders,many=True)
    i=1
    for order in order_serializer.data:
        order['tempId']=i
        i+=1
    return Response(order_serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_adminorders(request):
    user=request.user
    orders=Order.objects.all()
    order_serializer=OrderSerializer(orders,many=True)
    return Response(order_serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_review(request,pk):
    user=request.user
    product=Product.objects.get(_id=pk)
    data=request.data
    Review.objects.create(
        user=user,
        product=product,
        name=user.username,
        rating=data['rating'],
        comment=data['comment']
    )
    product.numReviews+=1
    product.save()
    allReviews=Review.objects.all().filter(product=product)
    
    total=0
    for review in allReviews:
        total+=review.rating
    product.rating=total/product.numReviews
    product.save()
    return Response("Review Added")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_reviews(request,pk):
    product=Product.objects.get(_id=pk)
    reviews=Review.objects.all().filter(product=product)
    serializer=ReviewSerializer(reviews,many=True)
    return Response(serializer.data)