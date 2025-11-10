from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Member
from .serializers import (
    UserRegistrationSerializer,
    MemberTokenObtainPairSerializer,
    UserSerializer,
    UserUpdateSerializer,
    MessageSerializer
)
from datetime import datetime


@api_view(['GET'])
@permission_classes([AllowAny])
def hello_world(request):
    serializer = MessageSerializer(data={
        'message': 'Hello, World!',
        'timestamp': datetime.now()
    })
    serializer.is_valid()
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        member = serializer.save()
        
        refresh = RefreshToken()
        refresh['member_id'] = member.id
        refresh['email'] = member.email
        
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'member': UserSerializer(member).data
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    serializer = MemberTokenObtainPairSerializer(data=request.data)
    if serializer.is_valid():
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    return Response({'detail': 'Успешный выход из системы'}, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    member = request.user
    
    if request.method == 'GET':
        serializer = UserSerializer(member)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serializer = UserUpdateSerializer(member, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(UserSerializer(member).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
