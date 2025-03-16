from decimal import Decimal
import json
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from .models import UserProfile,Product, Cart
from django.views.decorators.http import require_http_methods

# Create your views here.
def home(request):
    # Get all products from the database
    products = Product.objects.all()
    
    # Get cart count if user is authenticated
    cart_count = 0
    if request.user.is_authenticated:
        cart_count = Cart.objects.filter(user=request.user).count()
    
    # Create context dictionary with products
    context = {
        'products': products,
        'featured_products': Product.objects.order_by('-id')[:3],
        'latest_products': Product.objects.order_by('-id')[:8],
        'cart_count': cart_count
    }
    return render(request, "home.html", context)

# def cart(request):
#     return render(request, "cart.html")


def help(request):
    return render(request, "help.html")


# def login(request):
#     return render(request, "login.html")


def order(request):
    return render(request, "order.html")


def product(request):
    product_id = request.GET.get("id", "")
    name = request.GET.get("name", "")
    price = request.GET.get("price", "")
    image = request.GET.get("image", "")
    description = request.GET.get("description", "")

    context = {
        "product_id": product_id,
        "name": name,
        "price": price,
        "image": image,
        "description": description,
    }
    return render(request, "product.html", context)

@login_required(login_url='/login/')
def profile(request):
    try:
        user_profile = UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        user_profile = UserProfile(user=request.user)
        user_profile.save()
    
    context = {
        'user': request.user,
        'mobile': user_profile.mobile,
    }
    return render(request, "profile.html", context)

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


def signup_view(request):
    if request.method == "POST":
        username = request.POST.get('username')
        email = request.POST.get('email')
        mobile = request.POST.get("mobile")
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        
        print(username, email, mobile, password, confirm_password)
        user= User.objects.filter(username=username, email=email)
        if user.exists():
            messages.info(request, 'Username or email already exists!')
        
        if password == confirm_password:
            try:
                user = User.objects.create_user(username=username, password=password, email=email)
                user.save()
                user_profile = UserProfile(user=user, mobile=mobile)
                user_profile.save()
                login(request, user)
                print("User created")
                return redirect("profile")
            except:
                messages.error(request, "Username already exists.")
        else:
            messages.error(request, "Passwords do not match.")
    return render(request, "login.html")


def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        print(email, password)  # Debugging
        
        if email and password:
            try:
                # Get the first user with this email
                user = User.objects.filter(email=email).first()
                if user:
                    # Authenticate with username and password
                    authenticated_user = authenticate(request, username=user.username, password=password)
                    if authenticated_user is not None:
                        login(request, authenticated_user)
                        print("User logged in")
                        messages.success(request, "Login successful!")
                        return redirect("profile")
                    else:
                        messages.error(request, "Invalid email or password")
                else:
                    messages.error(request, "No user found")
            except Exception as e:
                print(f"Login error: {e}")  # Debug log
                messages.error(request, "An error occurred during login")
        else:
            messages.error(request, "Please fill in all fields")

    return render(request, "login.html")



def logout_view(request):
    print("User logged out")
    logout(request)
    return redirect("home")


from django.core.mail import send_mail
from django.http import HttpResponse


def test_email(request):
    send_mail(
        "Test Email",
        "This is a test email from Django.",
        "datonayomide@gmail.com",  # From email (must match EMAIL_HOST_USER)
        ["datonayomide@example.com"],  # Replace with your actual recipient email
        fail_silently=False,  # Make Django raise errors if email fails
    )
    return HttpResponse("Test email sent!")



@require_http_methods(["POST"])
def add_to_cart(request):
    print(request.user)
    if not request.user.is_authenticated:
        print("User not authenticated")
        return JsonResponse({
            'error': 'login_required',
            'message': 'Please login to add items to cart'
        }, status=401)

    try:
        print("Adding to cart")
        data = json.loads(request.body)
        product_id = data.get('product_id')
        quantity = data.get('quantity', 1)

        # Get or create cart item
        cart_item, created = Cart.objects.get_or_create(
            user=request.user,
            product_id=product_id,
            defaults={'quantity': quantity}
        )

        # If cart item already exists, update quantity
        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        # Get total cart count
        cart_count = Cart.objects.filter(user=request.user).count()

        return JsonResponse({
            'message': 'Product added to cart successfully',
            'cart_count': cart_count
        })

    except Exception as e:
        print(f"Error adding to cart: {e}")
        return JsonResponse({
            'error': 'server_error',
            'message': str(e)
        }, status=500)


@login_required
def cart_view(request):
    # Get all cart items for the current user
    cart_items = Cart.objects.filter(user=request.user).select_related('product')
    
    # Calculate totals
    subtotal = sum(item.product.price * item.quantity for item in cart_items)
    shipping = 40.00 if subtotal > 0 else 0  # Example shipping cost
    tax = subtotal * 0.18  # 18% tax
    total = subtotal + shipping + tax
    
    context = {
        'cart_items': cart_items,
        'subtotal': subtotal,
        'shipping': shipping,
        'tax': tax,
        'total': total,
    }
    
    return render(request, 'cart.html', context)