from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from .forms import CustomUserRegistrationForm
# Create your views here.
def home(request): 
    return render(request, "home.html") 

def cart(request): 
    return render(request, "cart.html") 

def help(request): 
    return render(request, "help.html") 

def login(request): 
    return render(request, "login.html") 

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


def login_signup(request):
    if request.method == "POST":
        if "signup-form" in request.POST:  # If Signup Form is Submitted
            username = request.POST["username"]
            email = request.POST["email"]
            password = request.POST["password"]
            confirm_password = request.POST["confirm_password"]

            if password != confirm_password:
                messages.error(request, "Passwords do not match!")
            elif User.objects.filter(username=username).exists():
                messages.error(request, "Username already exists!")
            elif User.objects.filter(email=email).exists():
                messages.error(request, "Email is already registered!")
            else:
                user = User.objects.create_user(username=username, email=email, password=password)
                user.save()
                messages.success(request, "Signup successful! You can now log in.")

        elif "login-form" in request.POST:  # If Login Form is Submitted
            username = request.POST["username"]
            password = request.POST["password"]
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                messages.success(request, "Login successful!")
                return redirect("home")
            else:
                messages.error(request, "Invalid username or password")

    return render(request, "accounts/login.html")

def logout_view(request):
    logout(request)
    return redirect("login")
