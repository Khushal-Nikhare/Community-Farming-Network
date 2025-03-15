from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages

# Create your views here.
def home(request): 
    return render(request, "home.html") 

def cart(request): 
    return render(request, "cart.html") 

def help(request): 
    return render(request, "help.html") 

# def login(request): 
#     return render(request, "login.html") 

def order(request): 
    return render(request, "order.html") 

def product(request): 
    product_id = request.GET.get('id', '')
    name = request.GET.get('name', '')
    price = request.GET.get('price', '')
    image = request.GET.get('image', '')
    description = request.GET.get('description', '')

    context = {
        'product_id': product_id,
        'name': name,
        'price': price,
        'image': image,
        'description': description
    }
    return render(request, "product.html", context)

def profile(request): 
    return render(request, "profile.html") 

def seller(request): 
    return render(request, "seller.html") 

def wishlist(request): 
    return render(request, "wishlist.html") 


# def login_signup(request):
#     if request.method == "POST":
#         if "signup-form" in request.POST:  # If Signup Form is Submitted
#             username = request.POST["username"]
#             email = request.POST["email"]
#             password = request.POST["password"]
#             confirm_password = request.POST["confirm_password"]

#             if password != confirm_password:
#                 messages.error(request, "Passwords do not match!")
#             elif User.objects.filter(username=username).exists():
#                 messages.error(request, " Username already exists!")
#             elif User.objects.filter(email=email).exists():
#                 messages.error(request, "Email is already registered!")
#             else:
#                 user = User.objects.create_user(username=username, email=email, password=password)
#                 user.save()
#                 messages.success(request, "Signup successful! You can now log in.")

#         elif "login-form" in request.POST:  # If Login Form is Submitted
#             username = request.POST["username"]
#             password = request.POST["password"]
#             user = authenticate(request, username=username, password=password)

#             if user is not None:
#                 login(request, user)
#                 messages.success(request, "Login successful!")
#                 return redirect("home")
#             else:
#                 messages.error(request, "Invalid username or password")

#     return render(request, "accounts/login.html")





def register_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        mobile = request.POST['mobile']
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']
        print(username, email, mobile, password, confirm_password)
        if password == confirm_password:
            try:
                user = User.objects.create_user(username=username, password=password, email=email)
                user.save()
                login(request, user)
                print('User created')
                return redirect('profile')
            except:
                messages.error(request, 'Username already exists.')
        else:
            messages.error(request, 'Passwords do not match.')
    # return render(request, 'registration/register.html')
    return render(request, 'login.html')


def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')  # Use .get() to avoid KeyError
        password = request.POST.get('password')  # Use .get() to avoid KeyError
        # print(email, password) # Debugging
        if email and password:
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
                print('User logged in')
                messages.success(request, "Login successful!")
                return redirect('home')
            else:
                messages.error(request, "Invalid email or password")
        else:
            messages.error(request, "Please fill in all fields")
    
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('/')

from django.core.mail import send_mail
from django.http import HttpResponse

def test_email(request):
    send_mail(
        'Test Email',
        'This is a test email from Django.',
        'datonayomide@gmail.com',  # From email (must match EMAIL_HOST_USER)
        ['datonayomide@example.com'],  # Replace with your actual recipient email
        fail_silently=False,  # Make Django raise errors if email fails
    )
    return HttpResponse('Test email sent!')


def logout_view(request):
    logout(request)
    return redirect("login")
