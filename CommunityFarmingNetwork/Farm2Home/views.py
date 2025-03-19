from decimal import Decimal
import json
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from .models import UserProfile, Product, Cart, TradingProfile
from django.views.decorators.http import require_http_methods, require_POST, require_GET


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
        "products": products,
        "top_products": Product.objects.order_by("-productId")[:8],
        "suggested_products": Product.objects.order_by("productId")[:12],
        "cart_count": cart_count,
    }
    print(products.values())
    return render(request, "home.html", context)


def help(request):
    return render(request, "help.html")


def order(request):
    return render(request, "order.html")


def product(request, productId):
    print("Product view")
    if request.method == "GET":
        product = Product.objects.get(productId=productId)
        print(product)
        return render(request,"product.html",{"product": product,},)
    return redirect("home")


@login_required(login_url="/login/")
def profile(request):
    try:
        user_profile = UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        return redirect("login")

    context = {
        "user": request.user,
        "mobile": user_profile.mobile,
    }
    return render(request, "profile.html", context)


@login_required(login_url="/login/")
def seller(request):
    if request.method == "POST":
        tradingName = request.POST.get("tradingName")
        address = request.POST.get("address")
        mobile = request.POST.get("mobile")
        upi_connected = (
            request.POST.get("upi_connected") == "on"
        )  # Check if the checkbox is checked
        dob = request.POST.get("dob")
        aadhar = request.POST.get("aadhar")
        pan = request.POST.get("pan")
        accountNumber = request.POST.get("accountNumber")
        ifsc = request.POST.get("ifsc")
        print(
            tradingName,
            address,
            mobile,
            upi_connected,
            dob,
            aadhar,
            pan,
            accountNumber,
            ifsc,
        )
        # Check if a trading profile already exists for this user
        if TradingProfile.objects.filter(user=request.user).exists():
            messages.info(request, "A trading profile already exists for this user!")
            return render(request, "seller.html")

        # Create the trading profile for the current user
        trading_profile = TradingProfile(
            user=request.user,
            tradingName=tradingName,
            address=address,
            mobile=mobile,
            upi_connected=upi_connected,
            dob=dob,
            aadhar=aadhar,
            pan=pan,
            accountNumber=accountNumber,
            ifsc=ifsc,
        )
        print(trading_profile)
        trading_profile.save()
        messages.success(request, "Trading profile created successfully!")
        return redirect("seller_profile")

    return render(request, "seller.html")


@login_required(login_url="/login/")
def seller_profile(request):
    try:
        trading_profile = TradingProfile.objects.get(user=request.user)
    except TradingProfile.DoesNotExist:
        return redirect("seller")

    context = {
        "tradingName": trading_profile.tradingName,
        "address": trading_profile.address,
        "mobile": trading_profile.mobile,
        "upi_connected": trading_profile.upi_connected,
        "dob": trading_profile.dob,
        "aadhar": trading_profile.aadhar,
        "pan": trading_profile.pan,
        "accountNumber": trading_profile.accountNumber,
        "ifsc": trading_profile.ifsc,
    }

    return render(request, "seller_profile.html", context)


def add_product(request):
    if request.method == "POST":
        productName = request.POST.get("productName")
        # productCategory = request.POST.get("productCategory")
        productDescription = request.POST.get("productDescription")
        productImage = request.FILES["productImage"]
        productPrice = request.POST.get("productPrice")
        pricePerUnit = request.POST.get("pricePerUnit")
        productDiscount_inPercentage = request.POST.get("productOffer")
        returnPolicy_inHours = request.POST.get("returnPolicy")
        organicCertified = request.POST.get("organicCertified") == "on"
        pesticidefree = request.POST.get("pesticidefree") == "on"
        freshHarvested = request.POST.get("freshHarvested") == "on"
        naturalFarming = request.POST.get("naturalFarming") == "on"
        print(
            productName,
            productDescription,
            productImage,
            productPrice,
            pricePerUnit,
            productDiscount_inPercentage,
            returnPolicy_inHours,
            organicCertified,
            pesticidefree,
            freshHarvested,
            naturalFarming,
        )

        product = Product.objects.create(
            user=request.user,
            productName=productName,
            productDescription=productDescription,
            productImage=productImage,
            productPrice=productPrice,
            pricePerUnit=pricePerUnit,
            productDiscount_inPercentage=productDiscount_inPercentage,
            returnPolicy_inHours=returnPolicy_inHours,
            organicCertified=organicCertified,
            pesticidefree=pesticidefree,
            freshHarvested=freshHarvested,
            naturalFarming=naturalFarming,
        )
        product.save()
        messages.success(request, "Product added successfully!")
        return redirect("seller_profile")
    return render(request, "add_product.html")


def wishlist(request):
    return render(request, "wishlist.html")


def signup_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        mobile = request.POST.get("mobile")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        print(username, email, mobile, password, confirm_password)
        user = User.objects.filter(username=username, email=email)
        if user.exists():
            messages.info(request, "Username or email already exists!")

        if password == confirm_password:
            try:
                user = User.objects.create_user(
                    username=username, password=password, email=email
                )
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
                    authenticated_user = authenticate(
                        request, username=user.username, password=password
                    )
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
        return JsonResponse(
            {"error": "login_required", "message": "Please login to add items to cart"},
            status=401,
        )

    try:
        print("Adding to cart")
        data = json.loads(request.body)
        print(data)
        product_id = data.get("product_id")
        quantity = data.get("quantity", 1)

        # Get or create cart item
        cart_item, created = Cart.objects.get_or_create(
            user=request.user, product_id=product_id, defaults={"quantity": quantity}
        )

        # If cart item already exists, update quantity
        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        # Get total cart count
        cart_count = Cart.objects.filter(user=request.user).count()

        return JsonResponse(
            {"message": "Product added to cart successfully", "cart_count": cart_count}
        )

    except Exception as e:
        print(f"Error adding to cart: {e}")
        return JsonResponse({"error": "server_error", "message": str(e)}, status=500)


@login_required
def cart_view(request):
    cart_items = Cart.objects.filter(user=request.user).select_related("product")

    subtotal = sum(item.product.price * item.quantity for item in cart_items)
    shipping = Decimal("40.00") if subtotal > 0 else Decimal("0.00")
    tax = subtotal * Decimal("0.18")

    # Format all monetary values to 2 decimal places
    subtotal = f"{subtotal:.2f}"
    shipping = f"{shipping:.2f}"
    tax = f"{tax:.2f}"

    # Convert string to Decimal for total calculation
    total = Decimal(subtotal) + Decimal(shipping) + Decimal(tax)
    total = f"{total:.2f}"

    context = {
        "cart_items": cart_items,
        "subtotal": subtotal,
        "shipping": shipping,
        "tax": tax,
        "total": total,
    }

    return render(request, "cart.html", context)


@require_POST
@login_required
def update_cart(request):
    print("Updating cart")
    try:
        data = json.loads(request.body)
        cart_item_id = data.get("cart_item_id")
        quantity = data.get("quantity")

        cart_item = Cart.objects.get(id=cart_item_id, user=request.user)
        cart_item.quantity = quantity
        cart_item.save()

        return JsonResponse({"message": "Quantity updated successfully"})
    except Cart.DoesNotExist:
        return JsonResponse({"message": "Cart item not found"}, status=404)
    except Exception as e:
        return JsonResponse({"message": str(e)}, status=500)


@require_POST
@login_required
def remove_from_cart(request):
    print("Removing from cart")
    try:
        data = json.loads(request.body)
        cart_item_id = data.get("cart_item_id")

        cart_item = Cart.objects.get(id=cart_item_id, user=request.user)
        cart_item.delete()

        return JsonResponse({"message": "Item removed successfully"})
    except Cart.DoesNotExist:
        return JsonResponse({"message": "Cart item not found"}, status=404)
    except Exception as e:
        return JsonResponse({"message": str(e)}, status=500)


def categories(request):
    return render(request, "categories.html")


@require_GET
@login_required
def get_cart(request):
    cart_items = Cart.objects.filter(user=request.user).select_related("product")
    cart_data = []
    for item in cart_items:
        cart_data.append(
            {
                "id": item.id,
                "product": {
                    "name": item.product.name,
                    "price": float(item.product.price),
                    "photo": {"url": item.product.photo.url},
                },
                "quantity": item.quantity,
            }
        )
    return JsonResponse({"cart_items": cart_data})
