from django.shortcuts import render
import yagmail
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.core import serializers

# Create your views here.
def home(request):
    return render(request, 'Home.html')

def login(request):
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
