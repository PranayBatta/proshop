from django.urls import path
from . import views
from .views import MyTokenObtainPairView


urlpatterns=[
    path('users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('',views.index),
    path('products',views.getProducts),
    path('products/<str:pk>',views.getProduct),
    path('products/create/',views.createProduct),
    path('products/search/<str:search>',views.searchProducts),
    path('products/edit/<str:pk>',views.editProduct),
    path('products/delete/<str:pk>',views.deleteProduct),
    path('users/profile/',views.getProfile),
    path('users/',views.getUsers),
    path('users/get/<str:pk>',views.getUser),
    path('users/create/',views.createUser),
    path('users/edit/<str:pk>',views.editUser),
    path('users/delete/<str:pk>',views.deleteUser),
    path('cart/add/',views.addCart),
    path('cart/get/',views.showCart),
    path('cart/remove/',views.removeCart),
    path('shippingaddress/get',views.get_shipping_address),
    path('shippingaddress/create',views.create_shipping_address),
    path('order/create',views.create_order),
    path('order/get/<str:pk>',views.get_order),
    path('order/delivered/<str:pk>',views.delivered_order),
    path('order/paid/<str:pk>',views.paid_order),
    path('order/cancel/<str:pk>',views.cancel_order),
    path('orders/get',views.get_orders),
    path('adminorders/get',views.get_adminorders),
    path('reviews/get/<str:pk>',views.get_reviews),
    path('reviews/create/<str:pk>',views.create_review),
]