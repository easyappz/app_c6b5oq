from django.contrib import admin
from .models import Member


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ['id', 'email', 'first_name', 'last_name', 'created_at']
    search_fields = ['email', 'first_name', 'last_name']
    list_filter = ['created_at']
    readonly_fields = ['created_at', 'password']
    ordering = ['-created_at']
