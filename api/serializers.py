from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Member


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=200)
    timestamp = serializers.DateTimeField(read_only=True)


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, style={'input_type': 'password'})
    
    class Meta:
        model = Member
        fields = ['email', 'first_name', 'last_name', 'password']
    
    def validate_email(self, value):
        if Member.objects.filter(email=value).exists():
            raise serializers.ValidationError('Пользователь с таким email уже существует')
        return value
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        member = Member(**validated_data)
        member.set_password(password)
        member.save()
        return member


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['id', 'email', 'first_name', 'last_name', 'created_at']
        read_only_fields = ['id', 'email', 'created_at']


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['first_name', 'last_name']


class MemberTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'] = serializers.EmailField()
        self.fields['password'] = serializers.CharField(write_only=True, style={'input_type': 'password'})
        del self.fields['username']
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        try:
            member = Member.objects.get(email=email)
            if not member.check_password(password):
                raise serializers.ValidationError({'detail': 'Неверные учетные данные'})
        except Member.DoesNotExist:
            raise serializers.ValidationError({'detail': 'Неверные учетные данные'})
        
        refresh = self.get_token(member)
        
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'member': UserSerializer(member).data
        }
    
    @classmethod
    def get_token(cls, member):
        token = super().get_token(member)
        token['member_id'] = member.id
        token['email'] = member.email
        return token
