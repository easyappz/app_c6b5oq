from django.contrib import admin
from .models import Member


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ['email', 'first_name', 'last_name', 'created_at']
    search_fields = ['email', 'first_name', 'last_name']
    list_filter = ['created_at']
    readonly_fields = ['password', 'created_at']
    
    fieldsets = [
        ('Личная информация', {
            'fields': ('email', 'first_name', 'last_name')
        }),
        ('Системная информация', {
            'fields': ('password', 'created_at')
        }),
    ]
