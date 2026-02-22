from rest_framework import generics, permissions
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer, ProductSerializer
from .models import Product
from rest_framework import viewsets, parsers
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework import viewsets, parsers
from rest_framework.permissions import IsAdminUser, AllowAny
from .models import Product,Order
from .serializers import ProductSerializer,OrderSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,) # Tout le monde peut s'inscrire
    serializer_class = RegisterSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    # Permet l'upload de fichiers (images)
    parser_classes = (parsers.MultiPartParser, parsers.FormParser)
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()] # Tout le monde voit les produits
        return [IsAdminUser()] # Seul l'admin peut créer/modifier
    
class OrderViewSet(viewsets.ModelViewSet):
    # Récupère toutes les commandes, les plus récentes en premier
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer
    
    # Pour l'instant, on permet l'accès pour tester, 
    # mais en production on mettra [permissions.IsAdminUser]
    permission_classes = [permissions.AllowAny]