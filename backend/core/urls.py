# core/urls.py
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from shop.views import RegisterView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('shop.urls')), # Inclut les routes des produits
    # La route pour se connecter (Email/Username + Password)
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # La route pour rafraîchir la session
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/register/', RegisterView.as_view(), name='auth_register'),
]

# On ajoute les routes média UNIQUEMENT en mode développement
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)