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


def signup_view(request):
    if request.method == "POST":
        form = CustomUserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)  # Don't save to DB yet
            user.set_password(form.cleaned_data["password"])  # Hash password
            user.save()  # Save user to DB
            login(request, user)  # Auto-login after registration
            messages.success(request, "Signup successful! Welcome to Farm2Home.")
            return redirect("home")  # Redirect to home page
    else:
        form = CustomUserRegistrationForm()

    return render(request, "signup.html", {"form": form})

def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect("home")
        else:
            messages.error(request, "Invalid username or password!")

    return render(request, "login.html", {"signup": False})

def logout_view(request):
    logout(request)
    return redirect("login")
