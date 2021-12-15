from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from webPageCreator.models import demoCustomers
from datetime import datetime, timedelta
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', "webPageCreator.settings")

def index(request):
    return render(request, 'home.html')


def schedule_demo(request):
    customer = None
    customer_details = None
    exists = False
    if request.method == 'POST':
        customer_mail = request.POST['customer_mail']
        customer = demoCustomers.objects.filter(customer_mail=customer_mail)
        if customer.exists():
            customer_details = serializers.serialize("json", customer)
            exists = True
        else:
            customer = demoCustomers.objects.create(customer_mail = customer_mail, demo_date = datetime.now() + timedelta(days=1))
            customer = demoCustomers.objects.filter(customer_mail=customer_mail)
            customer_details = serializers.serialize("json", customer)
    response = {'customer_details': customer_details, 'exists': exists}
    return JsonResponse(response)
    
    