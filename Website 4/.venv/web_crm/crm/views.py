from django.shortcuts import redirect, render
import yagmail
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.core import serializers
from django.contrib import auth
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import logout
import re


def checkPassword(password):
    return re.search(r'\d', password) and re.search(r'[A-Z]', password) and re.search(r'[a-z]', password) and re.search(r"[ !#$%&'()*+,-.@/[\\\]^_`{|}~"+r'"]', password) and len(password) > 6

# Create your views here.
def home(request):
    return render(request, 'Home.html')


def log_out(request):
    user = request.user
    if user.is_authenticated:
        logout(request)
    return redirect('login')


def login(request):
    user = request.user
    if user.is_authenticated:
        return redirect('dashboard')
    else:
        if request.method == 'POST':
           email = request.POST['email']
           password = request.POST['password']
           if len(email) == 0 or len(password) == 0:
              messages.info(request, "Please enter Email-ID or password")
              return render(request, 'login.html')
           else:
              if checkPassword(password):
                  try:
                     user_obj = User.objects.get(email=email)
                  except User.DoesNotExist:
                     user_obj = None
                  if user_obj is not None:
                     user = auth.authenticate(username=user_obj.username, password=password)
                     if user is not None:
                        auth.login(request, user)
                        return redirect('dashboard')
                     else:
                         messages.info(request, "Invalid Credentials")
                         return redirect('login')
                  else:
                      messages.info(request, "User Not Found")
                      return redirect('login')
              else:
                  messages.info(request, "Please enter valid password")
                  return redirect('login')
        else:
            return render(request, 'login.html')


def demo(request):
    response_msg = ''
    response_data = {}
    if request.method == 'POST':
        email = request.POST['email']
        try:
            validate_email(email)
        except ValidationError as e:
            response_msg = 'Not success'
        else:
            receiver_mail = 'crmsoftware.python@gmail.com'
            message = "<div style='padding:3em;text-align:center'><h1> Customer Mail ID : " + email + "</h1>" \
                  "<h2>The customer has requested to see the demo of the CRM application</h2></div>"
            mail = yagmail.SMTP("crmsoftware.python@gmail.com", 'CRMSoftware12#')
            mail.send(to=receiver_mail, subject="Demo Needed For Customer", contents=message)
            response_msg = 'success'
        response_data['data'] = {'message': response_msg}
        return JsonResponse(response_data)


def dashboard(request):
    user = request.user
    if user.is_authenticated:
        return render(request, 'dashboard.html')
    else:
        return redirect('login')


def password_reset(request):
    user = request.user
    if user.is_authenticated:
        if request.method == 'POST':
           password = request.POST['password']
           confirm_p = request.POST['confirm_password']
           if password == confirm_p:
              if checkPassword(password):
                  user_obj = User.objects.get(email=user.email)
                  user_obj.set_password(password)
                  user_obj.save() 
                  user = auth.authenticate(username=user_obj.username, password=password)
                  if user is not None:
                      auth.login(request, user)
                      return redirect('dashboard')
              else:
                  messages.info(request, "Please enter valid password. Password must contain atleast one number, special character, uppercase and lowercase letters.")
                  return redirect('password_reset')
           else:
              messages.info(request, 'Password Mismatch')
              return redirect('password_reset')
        else:
            return render(request, 'password_reset.html',{'username': user.username, 'email': user.email})
    else:
        return redirect('login')


def checkDetails(first_name, last_name, mail, phone, password, confirm_password):
    return len(first_name) > 0 and len(last_name) > 0 and len(mail) > 0 and len(phone) > 0 and len(password) > 0 and len(confirm_password) > 0


def register(request):
    if request.method == 'POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        mail = request.POST['mail']
        phone = request.POST['phone']
        password = request.POST['new_password']
        confirm_password = request.POST['confirm_password']
        if checkDetails(first_name, last_name, mail, phone, password, confirm_password):
            if password == confirm_password:
                if checkPassword(password):
                    try:
                       user_obj = User.objects.get(email=mail)
                    except User.DoesNotExist:
                       user_obj = None
                    if user_obj is None:
                        user = User.objects.create_user(first_name=first_name, last_name=last_name, username=phone, password=password, email=mail)
                        user.save()
                        messages.info(request, 'User created successfully')
                        return redirect('login')
                    else:
                        messages.info(request, 'User aleardy exists')
                        return redirect('login')
                else:
                    messages.info(request, 'Please enter valid password. Password must contain atleast one number, special character, uppercase and lowercase letters.')
                    return redirect('login')
            else:
                messages.info(request, 'Password Mismatch')
                return redirect('register')
        else:
            messages.info(request, 'Please enter all details')
            return redirect('register')
    else:
        return render(request, 'login.html')
