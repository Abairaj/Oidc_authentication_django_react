from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import requests
from authlib.jose import jwt
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

AUTH0_DOMAIN = settings.AUTH0_DOMAIN
AUTH0_CLIENT_ID = settings.AUTH0_CLIENT_ID
AUTH0_CLIENT_SECRET = settings.AUTH0_CLIENT_SECRET
AUTH0_DOMAIN=settings.AUTH0_DOMAIN
REDIRECT_URI = settings.REDIRECT_URI

class Auth0CallbackApiView(APIView):
    def get(self,request):
        code = request.GET.get('code')
        code_verifier = request.GET.get('code_verifier')

        # request for token using code and credentials
        payload = {
                "grant_type": "authorization_code",
                "client_id": AUTH0_CLIENT_ID,
                "client_secret": AUTH0_CLIENT_SECRET,
                "code": code,
                "redirect_uri": REDIRECT_URI,
                "code_verifier": code_verifier
            }
        
        response = requests.post(
            f"https://{AUTH0_DOMAIN}/oauth/token",
            json=payload
        )
        
        response.raise_for_status()

        token_response = response.json()

        id_token = token_response["id_token"]

        # verify id token

        jwks = requests.get(f"https://{AUTH0_DOMAIN}/.well-known/jwks.json").json()

        claims = jwt.decode(id_token,jwks)
        claims.validate()

        email = claims.get('email')
        username = claims.get('name')

        user,_ = User.objects.get_or_create(email=email, defaults={"username":username})

        # issue jwt

        refresh = RefreshToken.for_user(user)

        return Response({
            "access":str(refresh.access_token),
            "refresh":str(refresh)
        })

class ProfileApiView(APIView):
    permission_classes = [IsAuthenticated]  # ensures user is authenticated

    def get(self, request):
        user = request.user  
        data = {
            'username': user.username,
            'email': user.email,
        }
        return Response(data)

class LogoutView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self,request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response({"detail":"refresh_token required"},status=status.HTTP_400_BAD_REQUEST)
        
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception:
            pass

        return Response({"detail":"Successfully logged out"}, status=status.HTTP_200_OK)