from django.shortcuts import render

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