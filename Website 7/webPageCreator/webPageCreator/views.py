from django.shortcuts import redirect, render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from webPageCreator.models import demoCustomers
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
import re
import os
import smtplib
from email.message import EmailMessage
os.environ.setdefault('DJANGO_SETTINGS_MODULE', "webPageCreator.settings")

def index(request):
    return render(request, 'home.html')


def register(request):
    return render(request, 'register.html')


def dashboard(request):
    # if request.user.is_authenticated:
    #     return render(request, 'dashboard.html')
    # return redirect('login')
    return render(request, 'dashboard.html')


def loginuser(request):
    if request.method == 'POST':
        email = request.POST['login_email']
        password = request.POST['login_password']
        user = authenticate(request, username=email, password=password)
        login(request, user)
        return render(request, 'dashboard.html')
    else:
        return render(request, 'login.html')           


def logout(request):
    pass


def schedule_demo(request):
    customer = None
    customer_details = None
    exists = False
    if request.method == 'POST':
        customer_mail = request.POST['customer_mail']
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if re.fullmatch(regex,customer_mail):
            customer = demoCustomers.objects.filter(customer_mail=customer_mail)
            if customer.exists():
                customer_details = serializers.serialize("json", customer)
                exists = True
            else:
                customer = demoCustomers.objects.create(customer_mail = customer_mail, demo_date = datetime.now() + timedelta(days=1))
                customer = demoCustomers.objects.get(customer_mail=customer_mail)
                sendMail(customer.customer_mail, customer.demo_date.strftime("%Y-%m-%d %H:%M:%S"))
                customer_details = serializers.serialize("json", [demoCustomers.objects.get(customer_mail=customer_mail)])
                
        else:
            customer_details = 'Please enter valid E-Mail Address.'
    response = {'customer_details': customer_details, 'exists': exists}
    return JsonResponse(response)
    
 
def sendMail(receiver_mail,receiver_demo_date):
    try:
        gmail_user = 'wePageCreatorPython@gmail.com'
        sender_mail = gmail_user
        gmail_password = 'Python12#'
        to = [receiver_mail,sender_mail]
        subject = 'Demo booked for webPageCreator Application'
        body = 'Customer Mail : ' + receiver_mail + '  Booked Date  : ' + receiver_demo_date + '.'
        message = EmailMessage()
        message.set_content(body)
        message['Subject'] = subject
        message['From'] = sender_mail
        message['To'] = ','.join(to)
        smtp = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        smtp.login(gmail_user,gmail_password)
        smtp.send_message(message)
        smtp.quit()
        print("Email Sent Successfully.")
    except Exception as ex:
        print("ERROR IN SEND MAIL M : ", ex)
    